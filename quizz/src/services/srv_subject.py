import os

import sys
import inspect
from flask import json

from flask.json import jsonify

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)
from models.quizz.subject import Subject,SubjectSchema
from models.quizz.subject_question import SubjectQuestion
from services.srv_question import _question_answer
from models.app import db
from models.quizz.question import Question


subject_schema = SubjectSchema()
subjects_schema = SubjectSchema(many=True)

# Ajouter une reponse
def add_subject(request):

    # Récupération des données
    _name = request.get('name')
    _description = request.get('description')
    _mode_id = request.get('mode_id')
    _questions = request.get('questions')

    # Création d'un objet subject
    new_subject = Subject(_name,_description,_mode_id)

    new_subject = _subject_question(new_subject,_questions)
  
    # Insertion dans la session de connexion courant
    db.session.add(new_subject) 
    
    # Sauvegarde de la subject
    db.session.commit()
    
    # Retour de la subject sauvegarder
    return subject_schema.jsonify(new_subject)

# Modifier Une subject
def update_subject(id,request):

    # Récupération des données
    updatesubject = Subject.query.get(id)
    _questions = request.get('questions')
    # Modification de l'objet subject
    updatesubject.name= request.get('name')
    updatesubject.description= request.get('description')
    updatesubject.mode_id= request.get('mode_id')
    updatesubject.questions = []

    updatesubject = _subject_question(updatesubject,_questions)
    
    # Insertion dans la session de connexion courant
    db.session.add(updatesubject)

    # Sauvegarde de la subject
    db.session.commit()

    # Retour de la subject modifier
    return subject_schema.jsonify(updatesubject)

# Supprimer une subject
def delete_subject(id):

    # Récupération des données
    deletesubject = Subject.query.get(id)

    subject_schema.jsonify(deletesubject)

    # Suppression l'objet subject
    db.session.delete(deletesubject)

    # Sauvegarde de la suppression
    db.session.commit()

    # Retour de la subject supprimer
    return subject_schema.jsonify(deletesubject)

# Récupérer les subjects
def all_subjects():

    # Récupération des données
    allsubjects = Subject.query.all()
    
    result = subjects_schema.dumps(allsubjects)

    # Retour des subjects
    return jsonify(result)

# Récupérer les subjects en fonction du mode de jeu
def all_subjects_bymode(id):

    # Récupération des données
    allsubjects = Subject.query.filter_by(mode_id=id)
    
    result = subjects_schema.dumps(allsubjects)

    # Retour des subjects
    return jsonify(result)

# Récupérer une subject
def get_subject(id):

    # Récupération des données
    getsubject = Subject.query.get(id)
    
    # Retour de la subject
    return subject_schema.jsonify(getsubject)

# Création de la relation subject réponse
def _subject_question(new_subject,_questions):

    for question in _questions:
    
        if question != None:
            _question = question.get('question')
            _questionId = question.get('id')
            _answers = question.get('answers')

        # Si la réponse existe déja
        if _questionId :
            _question = Question.query.get(_questionId)
            #_question = _question_answer(_question,_answers)
        else :
            _question = Question(_question)
            _question = _question_answer(_question,_answers)

        q = SubjectQuestion(_question)
        new_subject.questions.append(q)

    return new_subject