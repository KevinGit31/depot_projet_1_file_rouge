from tests.__init__ import app
import json

url = '/api/v1/subject'
urlAnswer = '/api/v1/answer'
urlMode = '/api/v1/mode'
client = app.test_client()


# Ajouer une subject avec des réponses existantes
def test_add_subject():

    # Insertion du mode de jeu
    mode = addMode('',3)
    _mode = json.loads(mode.data)

    # Liste des questions du suject
    questions = []
    for i in range(_mode.get('nbrQ')):
        index = str(i)
        questions.append(addQuestionRelation(index,"Question"+index))

    # subject de jeux
    request_data = {
        'name': 'Sujet 1',
        'description': 'Sujet 1 description',
        'mode_id': json.loads(mode.data).get('id'),
        'questions': questions
    }

    # Appele du l'endpoint de l'ajout d'une subject
    response = client.post(url, data=json.dumps(request_data))
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('name') == 'Sujet 1'
    assert resp_data.get('description') == 'Sujet 1 description'
    assert resp_data.get('mode').get('name') == 'Mode 1'
    assert len(resp_data.get('questions')) == 3
    assert resp_data.get('questions')[0].get('question').get('question') == 'Question0'
    assert len(resp_data.get('questions')[0].get('question').get('answers')) == 4

# Modifier une subject
def test_update_subject():

    # Ajouter le subject de jeu à modifié
    insert = addsubject('')

    # Récuperer l'id de le subject de jeu à modifié
    id = json.loads(insert.data).get('id')

    # Url de modification
    update_url = url+"/"+str(id)

    # Insertion du mode de jeu
    mode = addMode('update',4)
    _mode = json.loads(mode.data)

    # Liste des questions du suject
    questions = []
    for i in range(_mode.get('nbrQ')):
        index = str(i)
        questions.append(addQuestionRelation(index,"Question update"+index))
    
    # subject de jeux
    update_data = {
        'name': 'Sujet 1 update',
        'description': 'Sujet 1 description update',
        'mode_id': json.loads(mode.data).get('id'),
        'questions': questions
    }

    # Appele du l'endpoint de la modification d'une subject
    response = client.put(update_url, data=json.dumps(update_data))
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('name') == 'Sujet 1 update'
    assert resp_data.get('description') == 'Sujet 1 description update'
    assert resp_data.get('mode').get('name') == 'Mode 1update'
    assert len(resp_data.get('questions')) == 4
    assert resp_data.get('questions')[0].get('question').get('question') == 'Question update0'
    assert len(resp_data.get('questions')[0].get('question').get('answers')) == 4

# Récupperer une subject
def test_get_subject():

    # Ajouter le subject de jeu à récupéré
    insert = addsubject('')

    # Récuperer l'id de le subject de jeu
    id = json.loads(insert.data).get('id')

    # Url de récupération
    get_url = url+"/"+str(id)

    # Appele du l'endpoint de la récupération d'une subject
    response = client.get(get_url)
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('name') == 'Sujet 1'
    assert resp_data.get('description') == 'Sujet 1 description'
    assert resp_data.get('mode').get('name') == 'Mode 1'
    assert len(resp_data.get('questions')) == 3
    assert resp_data.get('questions')[0].get('question').get('question') == 'Question0'
    assert len(resp_data.get('questions')[0].get('question').get('answers')) == 4

# Supprimer une subject
def test_delete_subject():

    # Ajouter le subject de jeu à supprimé
    insert_response = addsubject('')

    # Récuperer l'id de le subject de jeu à supprimé
    id = json.loads(insert_response.data).get('id')

    # Url de suppression
    delete_url = url+"/"+str(id)

    # Appele du l'endpoint de la suppression d'une subject
    response = client.delete(delete_url)
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert resp_data.get('name') == 'Sujet 1'
    assert resp_data.get('description') == 'Sujet 1 description'
    assert resp_data.get('mode').get('name') == 'Mode 1'
    assert len(resp_data.get('questions')) == 3
    assert resp_data.get('questions')[0].get('question').get('question') == 'Question0'
    assert len(resp_data.get('questions')[0].get('question').get('answers')) == 4

# Lister les subjects
def test_list_subject():

    # Ajouter 10 subjects
    for i in range(10):
        index = str(i)
        addsubject(index)

    # Appele du l'endpoint de la suppression d'une subject
    response = client.get(url)
    resp_data = json.loads(response.data)

    # Test des résultat attendu
    assert response.status_code == 200
    assert len(resp_data) >= 10

def addsubject(index) :
    
    # Insertion du mode de jeu
    mode = addMode('',3)
    _mode = json.loads(mode.data)

    # Liste des questions du suject
    questions = []
    for i in range(_mode.get('nbrQ')):
        index = str(i)
        questions.append(addQuestionRelation(index,"Question"+index))

    # subject de jeux
    request_data = {
        'name': 'Sujet 1',
        'description': 'Sujet 1 description',
        'mode_id': json.loads(mode.data).get('id'),
        'questions': questions
    }

    return client.post(url, data=json.dumps(request_data))


# Ajouter une reponse pour effectuer les testes
def addAnswerRelation(index,answer):

    # Réponse à modifié, à supprimer ou à traité
    request_data = {
        'answer': answer,
        'isAnswer': False
    }

    # Ajouter la réponse à modifié
    return request_data

def addAnswer(index):

    # Réponse à modifié, à supprimer ou à traité
    request_data = {
        'answer': index+' - Le souleil est vert',
    }

    return request_data

# Ajouter une question pour effectuer les testes
def addQuestionRelation(index,question):

    answers = []
    for i in range(4):
        index = str(i)
        answers.append(addAnswerRelation(index,addAnswer(index)))

    # Question à modifié, à supprimer ou à traité
    request_data = {
        'id':None,
        'question': question,
        'answers': answers
    }

    # Ajouter la question à modifié
    return request_data

# Ajouter un mode pour effectuer les testes
def addMode(index,nbrQ):
    # Réponse à modifié, à supprimer ou à traité
    request_data_toUpdate = {
        'name': 'Mode 1'+index,
        'description': 'Mode avec '+str(nbrQ)+' questions',
        'nbrQ': nbrQ
    }

    # Ajouter la réponse à modifié
    return client.post(urlMode, data=json.dumps(request_data_toUpdate))
