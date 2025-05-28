from flask import Flask, request, jsonify
from flask_cors import cross_origin

from WordDef import get_word_definition 


app = Flask(__name__)

@app.route('/api', methods=['GET'])
def get_data():
    return jsonify({'message': 'Benvenuto nella mia REST API!'})


@app.route('/WordDict', methods=['POST'])
@cross_origin(origins=['http://localhost:3000'])
def receive_string():
    data = request.json  # Ottieni i dati JSON dalla richiesta
    if not data or 'SearchWord' not in data:
        return jsonify({'error': 'No one word specified'}), 400
    
    SearchWord = get_word_definition(data['SearchWord'])
    return jsonify({'responde': SearchWord})



if __name__ == '__main__':
    app.run(debug=True, port=8080)