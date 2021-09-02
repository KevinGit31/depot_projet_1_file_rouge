from models.quizz.answer import Answer
from tests.__init__ import app
import json

url = '/api/v1/mode'
urlAnswer = '/api/v1/answer'
client = app.test_client()

# Ajouer une mode avec des réponses existantes
def test_add_mode():

       
    # mode de jeux
    request_data = {
        'name': 'Mode 1',
        'description': 'Mode avec 3 questions',
        'nbrQ': 3
    }

    # Appele du l'endpoint de l'ajout d'une mode
    response = client.post(url, data=json.dumps(request_data))
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('name') == 'Mode 1'
    assert resp_data.get('description') == 'Mode avec 3 questions'
    assert resp_data.get('nbrQ') == 3


# Modifier une mode
def test_update_mode():

    # Ajouter le mode de jeu à modifié
    insert = addmode('')

    print(json.loads(insert.data))

    # Récuperer l'id de le mode de jeu à modifié
    id = json.loads(insert.data).get('id')

    # Url de modification
    update_url = url+"/"+str(id)
    
    update_data = {
        'name': 'Mode 1 Update',
        'description': 'Mode avec 5 questions',
        'nbrQ': 5
    }

    # Appele du l'endpoint de la modification d'une mode
    response = client.put(update_url, data=json.dumps(update_data))
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert resp_data.get('name') == 'Mode 1 Update'
    assert resp_data.get('description') == 'Mode avec 5 questions'
    assert resp_data.get('nbrQ') == 5

# Récupperer une mode
def test_get_mode():

    # Ajouter le mode de jeu à récupéré
    insert = addmode('')

    # Récuperer l'id de le mode de jeu
    id = json.loads(insert.data).get('id')

    # Url de récupération
    get_url = url+"/"+str(id)

    # Appele du l'endpoint de la récupération d'une mode
    response = client.get(get_url)
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('name') == 'Mode 1'
    assert resp_data.get('description') == 'Mode avec 3 questions'
    assert resp_data.get('nbrQ') == 3

# Supprimer une mode
def test_delete_mode():

    # Ajouter le mode de jeu à supprimé
    insert_response = addmode('')

    # Récuperer l'id de le mode de jeu à supprimé
    id = json.loads(insert_response.data).get('id')

    # Url de suppression
    delete_url = url+"/"+str(id)

    # Appele du l'endpoint de la suppression d'une mode
    response = client.delete(delete_url)
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('name') == 'Mode 1'
    assert resp_data.get('description') == 'Mode avec 3 questions'
    assert resp_data.get('nbrQ') == 3

# Lister les modes
def test_list_mode():

    # Ajouter 10 modes
    for i in range(10):
        index = str(i)
        addmode(index)

    # Appele du l'endpoint de la suppression d'une mode
    response = client.get(url)
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert len(resp_data) >= 10

def addmode(index) :
    
    request_data = {
        'name': 'Mode 1'+index,
        'description': 'Mode avec 3 questions',
        'nbrQ': 3
    }

    return client.post(url, data=json.dumps(request_data))
