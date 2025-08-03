import axios from 'axios';


export const findRelatedWords = async (inputWord) => {
  console.log("respresprespresp");
  console.log(inputWord);
  console.log("Input Word Type:", typeof inputWord);
  console.log("Input Word Value:", inputWord);
  console.log("---------");
  
  
  const API_GATEWAY_URL = process.env.LAMBDA_API_GATEWAY_URL;
  console.log("API_GATEWAY_URL");
  console.log(API_GATEWAY_URL);
  if (!API_GATEWAY_URL) { return "No word" }




  try {
    // Esegui una richiesta GET all'API Gateway
    const response = await axios.post(API_GATEWAY_URL, {"word": inputWord});

    console.log("response")
    // console.log(response)
    const { data } = response;

    // console.log(data.word)
    // console.log(data.definition)
    return data.definition

  } catch (error) {
    console.error('Error connecting to API Gateway:', error);
    // Gestione degli errori, ad esempio errori di rete, errori 4xx/5xx dall'API Gateway
    return "No word"
  }





  // // Itera attraverso tutte le definizioni (synsets) trovate per la parola
  //   for (const def of definitions) {
  //     // Aggiungi i sinonimi diretti del synset
  //     if (def.synonyms && def.synonyms.length > 0) {
  //       def.synonyms.forEach(syn => {
  //         if (syn.toLowerCase() !== inputWord.toLowerCase()) { // Evita la parola stessa
  //           relatedWords.add(syn);
  //         }
  //       });
  //     }

  //     // Se non abbiamo ancora abbastanza parole, cerchiamo relazioni aggiuntive
  //     if (relatedWords.size < 3) {
  //       // WordNet ha "pointers" a parole correlate (es. iperonimi, iponimi, antonimi)
  //       // def.pointers è un array di oggetti che descrivono le relazioni
  //       if (def.pointers && def.pointers.length > 0) {
  //         for (const pointer of def.pointers) {
  //           // Cerca il synset a cui punta la relazione
  //           const targetSynset = await wordnet.get(pointer.synsetOffset, pointer.pos);
  //           if (targetSynset && targetSynset.words && targetSynset.words.length > 0) {
  //             targetSynset.words.forEach(wordObj => {
  //               if (wordObj.word.toLowerCase() !== inputWord.toLowerCase()) {
  //                 relatedWords.add(wordObj.word);
  //               }
  //             });
  //           }
  //           if (relatedWords.size >= 3) break; // Ferma se abbiamo abbastanza parole
  //         }
  //       }
  //     }
  //     if (relatedWords.size >= 3) break; // Ferma se abbiamo abbastanza parole
  //   }

  //   // Converte il Set in un Array e prende le prime 3 parole
  //   const result = Array.from(relatedWords).slice(0, 3);

  //   console.log(`\nParole affini a "${inputWord}":`);
  //   if (result.length > 0) {
  //     result.forEach(word => console.log(`- ${word}`));
  //   } else {
  //     console.log("Nessuna parola affine trovata (o solo la parola stessa).");
  //   }

  //   return result;

  // } catch (error) {
  //   console.error(`\nSi è verificato un errore durante la ricerca di parole affini per "${inputWord}":`, error.message);
  //   return [];
  // }
}