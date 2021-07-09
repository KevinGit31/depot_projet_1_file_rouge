import os
import sys
import inspect

from flask.json import jsonify

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)
from models.quizz.answer import Answer,AnswerSchema
from models.app import db

answer_schema = AnswerSchema()
answers_schema = AnswerSchema(many=True)

# Ajouter une reponse
def add_answer(request):
    
    # Récupération des données
    _answer = request.get('answer')
    _isAnswer = request.get('isAnswer')

    # Création d'un objet réponse
    new_answer = Answer(_answer,_isAnswer)

    # Insertion dans la session de connexion courant
    db.session.add(new_answer)

    # Sauvegarde de la réponse
    db.session.commit()

    # Retour de la réponse sauvegarder
    return answer_schema.jsonify(new_answer)

# Modifier Une réponse
def update_answer(id,request):

    # Récupération des données
    updateanswer = Answer.query.get(id)

    # Modification de l'objet réponse
    updateanswer.answer = request.get('answer')
    updateanswer.isAnswer = request.get('isAnswer')

    # Insertion dans la session de connexion courant
    db.session.add(updateanswer)

    # Sauvegarde de la réponse
    db.session.commit()

    # Retour de la réponse modifier
    return answer_schema.jsonify(updateanswer)

# Supprimer une réponse
def delete_answer(id):

    # Récupération des données
    deleteanswer = Answer.query.get(id)

    # Suppression l'objet réponse
    db.session.delete(deleteanswer)

    # Sauvegarde de la suppression
    db.session.commit()

    # Retour de la réponse supprimer
    return answer_schema.jsonify(deleteanswer)

# Récupérer les réponses
def all_answers():

    # Récupération des données
    allanswers = Answer.query.all()
    result = answers_schema.dump(allanswers)

    # Retour des réponses
    return jsonify(result)

# Récupérer une réponse
def get_answer(id):

    # Récupération des données
    getanswer = Answer.query.get(id)
    
    # Retour de la réponse
    return answer_schema.jsonify(getanswer)