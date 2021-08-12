from tests.__init__ import app
import json

url = '/api/v1/game'
client = app.test_client()

# Ajouer une game avec des réponses existantes
def test_add_game():

    print('1 - Ajouter un jeu')

    #Jeu à ajouté
    request_data = {
        'startDate': '11-08-2021',
        'endDate': '11-08-2021',
        'score': 0,
        'subject_id': '',
        'user_id': 1,
    }

    # Appele du l'endpoint de l'ajout d'une réponse
    #response = client.post(url, data=json.dumps(request_data))
    print('2 - Ajouter un jeu')
    #resp_data = json.loads(response.data)

    # Test des résultat attendu
    #assert response.status_code == 200
    #assert resp_data.get('id') != None
    #assert resp_data.get('startDate') == "11/08/2021"
