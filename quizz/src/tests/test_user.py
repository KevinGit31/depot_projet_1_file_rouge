from controllers.controller_user import controller_user
from tests.__init__ import app
import json

url = '/api/v1/users'
client = app.test_client()

controller_user(app)


# Ajouer une réponse
def test_add_answer():
    # Réponse à ajouté
    request_data = {
        "firstname": "firstname_test",
        "lastname": "lastname_test",
        "pseudo": "pseudo_test",
        "role_id": 2
    }

    # Appele du l'endpoint de l'ajout d'une réponse
    response = client.post(url, data=json.dumps(request_data))
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('id') is not None
    assert resp_data.get('firstname') == "firstname_test"
    assert resp_data.get('lastname') == "lastname_test"
    assert resp_data.get('pseudo') == "pseudo_test"
    assert resp_data.get('role_id') == 2


# Modifier une réponse
def test_update_answer():
    # Ajouter la réponse à modifier
    insert_response = addAnswer('')

    # Récuperer l'id de la réponse à modifier
    id = json.loads(insert_response.data).get('id')

    # Url de modification
    update_url = url + "/" + str(id);

    # Réponse à modifié
    update_data = {
        "firstname": "test1",
        "lastname": "test1",
        "pseudo": "test1",
        "role_id": 2
    }

    # Appele du l'endpoint de la modification d'une réponse
    response = client.put(update_url, data=json.dumps(update_data))
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('firstname') == "test1"
    assert resp_data.get('lastname') == "test1"
    assert resp_data.get('pseudo') == "test1"
    assert resp_data.get('role_id') == 2


# Récupperer une réponse
def test_get_answer():
    # Ajouter la réponse à récupéré
    insert_response = addAnswer('')

    # Récuperer l'id de la réponse
    id = json.loads(insert_response.data).get('id')

    # Url de récupération
    get_url = url + "/" + str(id);

    # Appele du l'endpoint de la récupération d'une réponse
    response = client.get(get_url)
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('firstname') == "test"
    assert resp_data.get('lastname') == "test"
    assert resp_data.get('pseudo') == "test"
    assert resp_data.get('role_id') == 1


# Supprimer une réponse
def test_delete_answer():
    # Ajouter la réponse à supprimé
    insert_response = addAnswer('')

    # Récuperer l'id de la réponse à supprimé
    id = json.loads(insert_response.data).get('id')

    # Url de suppression
    delete_url = url + "/" + str(id);

    # Appele du l'endpoint de la suppression d'une réponse
    response = client.delete(delete_url)
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('answer') == " - Le souleil est vert"
    assert resp_data.get('isAnswer') == True


# Ajouter une reponse pour effectuer les testes
def addAnswer(index):
    # Réponse à modifié, à supprimer ou à traité
    request_data_toUpdate = {
        "firstname": "test",
        "lastname": "test",
        "pseudo": "test",
        "role_id": 1
    }

    # Ajouter la réponse à modifié
    return client.post(url, data=json.dumps(request_data_toUpdate))
