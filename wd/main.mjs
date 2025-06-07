// index.mjs (o index.js se il tuo package.json ha "type": "module")

import https from 'https'; // Usa 'import' invece di 'require'

// Funzione helper per ottenere la definizione della parola
async function getWordDefinition(word) {
  return new Promise((resolve, reject) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const definitions = JSON.parse(data);
          if (Array.isArray(definitions) && definitions.length > 0) {
            const firstEntry = definitions[0];
            const meanings = firstEntry.meanings;

            if (meanings && meanings.length > 0) {
              const definitionsOutput = meanings.map(meaning => {
                const partOfSpeech = meaning.partOfSpeech;
                const defs = meaning.definitions.map(def => `- ${def.definition}`).join('\n');
                return `**${partOfSpeech}**:\n${defs}`;
              }).join('\n\n');
              resolve(definitionsOutput);
            } else {
              resolve(`Nessuna definizione dettagliata trovata per "${word}".`);
            }
          } else {
            resolve(`Nessuna definizione trovata per "${word}".`);
          }
        } catch (error) {
          reject(`Errore durante il parsing della risposta dall'API: ${error.message}`);
        }
      });
    }).on('error', (error) => {
      reject(`Errore nella richiesta HTTP all'API: ${error.message}`);
    });
  });
}

// Handler principale della Lambda Function
// Usa 'export' invece di 'exports.handler'
export const handler = async (event) => {
  let word = event["word"];
  // let word = "home"

  if (event.queryStringParameters && event.queryStringParameters.word) {
    word = event.queryStringParameters.word;
  } 
  else if (event.body) {
    try {
      const body = JSON.parse(event.body);
      if (body.word) {
        word = body.word;
      }
    } catch (e) {
      console.error("Errore nel parsing del body dell'evento:", e);
    }
  }

  if (!word) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Parametro "word" mancante. Fornisci una parola da definire.' }),
    };
  }

  try {
    const definition = await getWordDefinition(word);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word: word, definition: definition }),
    };
  } catch (error) {
    console.error(`Errore durante il recupero della definizione per "${word}":`, error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: `Errore durante il recupero della definizione: ${error}` }),
    };
  }
};