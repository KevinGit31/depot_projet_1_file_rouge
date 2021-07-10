import os

import sys
import inspect
from flask import json

from flask.json import jsonify

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)
from models.quizz.question import Question,QuestionSchema
from models.app import db
from models.quizz.answer import Answer


question_schema = QuestionSchema()
questions_schema = QuestionSchema(many=True)

# Ajouter une reponse
def add_question(request):
    
    # Récupération des données
    _question = request.get('question')
    _answers = request.get('answers')

    # Création d'un objet question
    new_question = Question(_question)

    for anwser in _answers:
        _anwser = Answer(anwser.get('answer'),bool(anwser.get('isAnswer')))
        new_question.answers.append(_anwser)
    
    # Insertion dans la session de connexion courant
    db.session.add(new_question)

    # Sauvegarde de la question
    db.session.commit()

    # Retour de la question sauvegarder
    return question_schema.jsonify(new_question)

# Modifier Une question
def update_question(id,request):

    # Récupération des données
    updatequestion = Question.query.get(id)

    # Modification de l'objet question
    updatequestion.question = request.get('question')
    updatequestion.isQuestion = request.get('isQuestion')

    # Insertion dans la session de connexion courant
    db.session.add(updatequestion)

    # Sauvegarde de la question
    db.session.commit()

    # Retour de la question modifier
    return question_schema.jsonify(updatequestion)

# Supprimer une question
def delete_question(id):

    # Récupération des données
    deletequestion = Question.query.get(id)

    # Suppression l'objet question
    db.session.delete(deletequestion)

    # Sauvegarde de la suppression
    db.session.commit()

    # Retour de la question supprimer
    return question_schema.jsonify(deletequestion)

# Récupérer les questions
def all_questions():

    # Récupération des données
    allquestions = Question.query.all()
    result = questions_schema.dumps(allquestions)

    # Retour des questions
    return jsonify(result)

# Récupérer une question
def get_question(id):

    # Récupération des données
    getquestion = Question.query.get(id)
    
    # Retour de la question
    return question_schema.jsonify(getquestion)