import os


import sys
import inspect
from flask import json

from flask.json import jsonify

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)
from models.quizz.question import Question,QuestionSchema
from models.quizz.question_answer import QuestionAnswer
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

    new_question = _question_answer(new_question,_answers)

    print (question_schema.jsonify(new_question))
  
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
    updatequestion.answers = []

    updatequestion = _question_answer(updatequestion,request.get('answers'))
    
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

# Création de la relation question réponse
def _question_answer(new_question,_answers):

    for answer in _answers:
        if answer != None:
            print(answer)
            _queryAnswer = answer.get('answer').get('answer')
            _queryId = answer.get('answer').get('id')
            _queryIsAnswer = answer.get('isAnswer')
    
        # Si la réponse existe déja
        if _queryId :
            _answer = Answer.query.get(_queryId)
            _answer.answer = _queryAnswer
        else :
            _answer = Answer(_queryAnswer)
        _isAnswer = bool(_queryIsAnswer)
        a = QuestionAnswer(_isAnswer,_answer)
        new_question.answers.append(a)
    return new_question