import json
import nltk
import os


# Def temporane directory
nltk_data_dir = os.path.join(os.path.dirname(__file__), 'nltk_data')

# os.makedirs(nltk_data_dir, exist_ok=True) # Crea la directory se non esiste
# nltk.data.path.append(nltk_data_dir) # Aggiungi la directory al percorso di ricerca di NLTK

# nltk.download('wordnet', download_dir=nltk_data_dir)
# nltk.download('omw-1.4', download_dir=nltk_data_dir) # 'own-1.4' è in realtà 'omw-1.4'


from nltk.corpus import wordnet


maxNumberOfDef = 3

def get_word_definition(word: str) -> list[str]:
    definitions = []
    synsetVals = []
    exampleVals = []
    synsets = wordnet.synsets(word.lower()) # Converti in minuscolo per una ricerca più robusta


    if not synsets:
        return definitions # Nessun synset trovato, la parola non è nel dizionario

    # print(f"\n--- Definizioni per '{word}' ---")
    
    count = 0
    # Itera su ogni synset trovato per la parola
    for i, synset in enumerate(synsets):
        definition_text = synset.definition()
         
        # Puoi anche ottenere i "lemmas" (le forme della parola in questo synset)
        lemmas = [lemma.name().replace('_', ' ') for lemma in synset.lemmas()]
        
        print(f"{i + 1}. ({synset.pos()}) {', '.join(lemmas)}:")
        print(f"   {definition_text}")
        
        synsetVals.append(lemmas)
        definitions.append(definition_text)

        if synset.examples():
            exampleVals.append(synset.examples())
            print(f"   Esempi: {'; '.join(synset.examples())}")
        
        count += 1
        if maxNumberOfDef <= count:
            break
    print(f"--- Fine definizioni per '{word}' ---\n")
    
    data = {
        "Word": word.lower(),
        "Synset": synsetVals, 
        "Definition": definitions, 
        "Example": exampleVals
    }
    return data




if __name__ == "__main__":
    get_word_definition("Home")