FROM public.ecr.aws/lambda/python:3.13

COPY requirements.txt ${LAMBDA_TASK_ROOT}

RUN pip install -r requirements.txt

# --- NUOVE RIGHE PER SCARICARE I DATI NLTK ---
# Crea una directory per i dati NLTK (se non esiste già nel percorso di default di Lambda)
RUN mkdir -p ${LAMBDA_TASK_ROOT}/nltk_data
# Imposta la variabile d'ambiente NLTK_DATA per indicare dove cercare i dati
ENV NLTK_DATA=${LAMBDA_TASK_ROOT}/nltk_data
# Scarica i dati di WordNet e OMW-1.4 direttamente in questa directory
RUN python -m nltk.downloader -d ${LAMBDA_TASK_ROOT}/nltk_data wordnet omw-1.4
# --- FINE NUOVE RIGHE ---


COPY src/* ${LAMBDA_TASK_ROOT}

CMD ["word_dictionay.lambda_handler"]