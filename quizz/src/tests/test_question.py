from controllers.controller_question import controller_question
from tests.__init__ import app
import json

url = '/api/v1/question'
client = app.test_client()

controller_question(app)

# Ajouer une question
def test_add_question():

    # Liste de réponse de la question
    answers = []
    for i in range(10):
        index= str(i)
        answers.append(addAnswer(index))

    # Réponse à ajouté
    request_data = {
        'question': 'Quel est la couleur du soleil ?',
        'answers': answers
    }

    # Appele du l'endpoint de l'ajout d'une question
    response = client.post(url, data=json.dumps(request_data))
    resp_data = json.loads(response.data)

    print(resp_data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('question') == 'Quel est la couleur du soleil ?'
    #assert len(resp_data.get('answers')) == 10


# Ajouter une reponse pour effectuer les testes
def addAnswer(index):

    # Réponse à modifié, à supprimer ou à traité
    request_data = {
        'answer': index+' - Le soleil est vert',
        'isAnswer': True
    }

    # Ajouter la réponse à modifié
    return request_data


