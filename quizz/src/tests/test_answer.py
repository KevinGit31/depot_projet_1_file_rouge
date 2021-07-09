from flask.scaffold import F
from controllers.controller_answer import controller_answer
from tests.__init__ import app
import json

url = '/answer'
client = app.test_client()

controller_answer(app)

# Ajouer une réponse
def test_add_answer():

    # Réponse à ajouté
    request_data = {
        'answer': 'Le soleil est vert',
        'isAnswer': False
    }

    # Appele du l'endpoint de l'ajout d'une réponse
    response = client.post(url, data=json.dumps(request_data))
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('id') != None
    assert resp_data.get('answer') == "Le soleil est vert"
    assert resp_data.get('isAnswer') == False

# Modifier une réponse
def test_update_answer():
    response = client.put(url)
    assert response.status_code == 200

# Récupperer une réponse
def test_update_answer():
    response = client.get(url)
    assert response.status_code == 200

# Supprimer une réponse
def test_delete_answer():
    response = client.delete(url)
    assert response.status_code == 200

# Lister les réponses
def test_list_answer():
    response = client.delete(url)
    assert response.status_code == 200