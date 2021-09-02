
from tests.__init__ import app
import json

url = '/api/v1/answer'
client = app.test_client()

# Ajouer une réponse
def test_add_answer():

    # Réponse à ajouté
    request_data = {
        'answer': 'Le soleil est vert'
    }

    # Appele du l'endpoint de l'ajout d'une réponse
    response = client.post(url, data=json.dumps(request_data))
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('id') != None
    assert resp_data.get('answer') == "Le soleil est vert"

# Modifier une réponse
def test_update_answer():

    # Ajouter la réponse à modifié
    insert_response = addAnswer('')

    # Récuperer l'id de la réponse à modifié
    id = json.loads(insert_response.data).get('id')

    # Url de modification 
    update_url=url+"/"+str(id);
    
    # Réponse à modifié
    update_data = {
        'answer': 'Le soleil est vert. Après modification'
    }

    # Appele du l'endpoint de la modification d'une réponse
    response = client.put(update_url, data=json.dumps(update_data))
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('answer') == "Le soleil est vert. Après modification"

# Récupperer une réponse
def test_get_answer():

    # Ajouter la réponse à récupéré
    insert_response = addAnswer('')

    # Récuperer l'id de la réponse
    id = json.loads(insert_response.data).get('id')

    # Url de récupération
    get_url=url+"/"+str(id);
    
    # Appele du l'endpoint de la récupération d'une réponse
    response = client.get(get_url)
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('answer') == " - Le souleil est vert"

# Supprimer une réponse
def test_delete_answer():
    
    # Ajouter la réponse à supprimé
    insert_response = addAnswer('')

    # Récuperer l'id de la réponse à supprimé
    id = json.loads(insert_response.data).get('id')

    # Url de suppression
    delete_url=url+"/"+str(id);
    
    # Appele du l'endpoint de la suppression d'une réponse
    response = client.delete(delete_url)
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('answer') == " - Le souleil est vert"

# Lister les réponses
def test_list_answer():
    
    # Ajouter 10 réponses
    for i in range(10):
        index= str(i)
        addAnswer(index)
    
    # Appele du l'endpoint de la suppression d'une réponse
    response = client.get(url)
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert len(resp_data) >= 10

# Ajouter une reponse pour effectuer les testes
def addAnswer(index):

    # Réponse à modifié, à supprimer ou à traité
    request_data_toUpdate = {
        'answer': index+' - Le souleil est vert',
    }

    # Ajouter la réponse à modifié
    return client.post(url, data=json.dumps(request_data_toUpdate))
