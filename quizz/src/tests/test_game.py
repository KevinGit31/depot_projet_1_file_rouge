from quizz.src.tests.test_subject import  addsubject
from tests.__init__ import app
import json

url = '/api/v1/game'
client = app.test_client()

# Ajouer une partie avec des réponses existantes
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

# Modifier une partie
def test_update_game():
    # Ajouter d'une partie à modifié
    insert = addgame('')

    # Récuperer des information de la partie à modifié
    game = json.loads(insert.data)
    id = game.get('id')
    subject_id = game.get('subject_id')
    user_id = game.get('user_id')

    #Partie modifier
    update_data = {
        'startDate': '2021-01-31',
        'endDate': '2021-12-01',
        'score': 100,
        'subject_id': subject_id,
        'user_id': user_id,
    }

    # Url de modification
    update_url = url+"/"+str(id)


    # Appele du l'endpoint de la modification d'une partie
    response = client.put(update_url, data=json.dumps(update_data))
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('id') != None
    assert resp_data.get('startDate') == "2021-01-31T00:00:00"
    assert resp_data.get('endDate') == "2021-12-01T00:00:00"
    assert resp_data.get('score') == 100


# Récuppérer une partie
def test_get_game():
    # Ajouter d'une partie à récupperer
    insert = addgame('')

    # Récuperer des information de la partie à modifié
    game = json.loads(insert.data)
    id = game.get('id')

    # Url de récupération
    get_url = url+"/"+str(id)

    # Appele du l'endpoint de la récupération d'une partie
    response = client.get(get_url)
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('id') != None
    assert resp_data.get('startDate') == "2021-01-01T00:00:00"
    assert resp_data.get('endDate') == "2021-12-31T00:00:00"
    assert resp_data.get('score') == 0

# Supprimer une partie
def test_delete_game():
    # Ajouter d'une partie à supprimer
    insert = addgame('')

    # Récuperer des information de la partie à supprimer
    game = json.loads(insert.data)
    id = game.get('id')

    # Url de récupération
    delete_url = url+"/"+str(id)

    # Appele du l'endpoint de la récupération d'une partie
    response = client.delete(delete_url)
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('id') != None
    assert resp_data.get('startDate') == "2021-01-01T00:00:00"
    assert resp_data.get('endDate') == "2021-12-31T00:00:00"
    assert resp_data.get('score') == 0


# Lister les parties
def test_list_game():
    # Ajouter 10 subjects
    for i in range(10):
        index = str(i)
        addgame(index)

    # Appele du l'endpoint de la suppression d'une subject
    response = client.get(url)
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert len(resp_data) >= 10

def addgame(index) :

    insert_subject = addsubject(index)
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

    return client.post(url, data=json.dumps(request_data))