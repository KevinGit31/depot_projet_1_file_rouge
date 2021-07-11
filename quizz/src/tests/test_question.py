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
    for i in range(5):
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

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('question') == 'Quel est la couleur du soleil ?'
    assert len(resp_data.get('answers')) == 5

# Modifier une question
def test_update_question():

    # Ajouter la question à modifié
    insert_response = addQuestion('')

    # Récuperer l'id de la question à modifié
    id = json.loads(insert_response.data).get('id')

    # Url de modification 
    update_url=url+"/"+str(id);
    
    # Réponse à modifié
    answers = []
    for i in range(6):
        index= str(i)
        answers.append(addAnswer(index))

    update_data = {
        'question': 'Quel est la couleur du soleil ?. Après modification',
        'answers': answers
    }

    # Appele du l'endpoint de la modification d'une question
    response = client.put(update_url, data=json.dumps(update_data))
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('question') == 'Quel est la couleur du soleil ?. Après modification'
    assert len(resp_data.get('answers')) == 6

# Récupperer une question
def test_get_question():

    # Ajouter la question à récupéré
    insert_response = addQuestion('')

    # Récuperer l'id de la question
    id = json.loads(insert_response.data).get('id')

    # Url de récupération
    get_url=url+"/"+str(id);
    
    # Appele du l'endpoint de la récupération d'une question
    response = client.get(get_url)
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('question') == " - Quel est la couleur du soleil ?"
    assert len(resp_data.get('answers')) == 7

# Supprimer une question
def test_delete_question():
    
    # Ajouter la question à supprimé
    insert_response = addQuestion('')

    # Récuperer l'id de la question à supprimé
    id = json.loads(insert_response.data).get('id')

    # Url de suppression
    delete_url=url+"/"+str(id);
    
    # Appele du l'endpoint de la suppression d'une question
    response = client.delete(delete_url)
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('question') == " - Quel est la couleur du soleil ?"
    assert len(resp_data.get('answers')) == 7

# Lister les questions
def test_list_question():
    
    # Ajouter 10 questions
    for i in range(10):
        index= str(i)
        addQuestion(index)
    
    # Appele du l'endpoint de la suppression d'une question
    response = client.get(url)
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert len(resp_data) >= 10

# Ajouter une reponse pour effectuer les testes
def addQuestion(indexQ):

    # List des réponses fausse de la questions
    answers = []
    for i in range(7):
        indexA= str(i)
        answers.append(addAnswer(indexA))

    # Réponse à modifié, à supprimer ou à traité
    request_data_toUpdate = {
        'question': indexQ+' - Quel est la couleur du soleil ?',
        'answers': answers
    }

    # Ajouter la question à modifié
    return client.post(url, data=json.dumps(request_data_toUpdate))

# Ajouter une reponse pour effectuer les testes
def addAnswer(index):

    # Réponse à modifié, à supprimer ou à traité
    request_data = {
        'answer': index+' - Le soleil est vert',
        'isAnswer': False
    }

    # Ajouter la réponse à modifié
    return request_data