from quizz.src.tests.test_subject import  addsubject
from tests.__init__ import app
import json

url = '/api/v1/game'
client = app.test_client()

# Ajouer une game avec des réponses existantes
def test_add_game():

    # Inser un sujet
    insert_subject = addsubject('')

    # Récuperer l'id de le subject de jeu à supprimé
    subject_id = json.loads(insert_subject.data).get('id')

    # Créer un utilisateur

    #Jeu à ajouté
    request_data = {
        'startDate': '2021-01-01',
        'endDate': '2021-12-31',
        'score': 0,
        'subject_id': subject_id,
        'user_id': 1,
    }

    # Appele du l'endpoint de l'ajout d'une réponse
    response = client.post(url, data=json.dumps(request_data))
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('id') != None
    assert resp_data.get('startDate') == "2021-01-01T00:00:00"
    assert resp_data.get('endDate') == "2021-12-31T00:00:00"
    assert resp_data.get('score') == 0
    assert resp_data.get('subject_id') == subject_id
    assert resp_data.get('user_id') == 1