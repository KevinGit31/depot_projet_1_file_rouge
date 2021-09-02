import os


import sys
import inspect
from flask import json

from flask.json import jsonify

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)
from models.quizz.mode import Mode,ModeSchema
from models.app import db
from models.quizz.answer import Answer


mode_schema = ModeSchema()
modes_schema = ModeSchema(many=True)

# Ajouter une reponse
def add_mode(request):
    
    # Récupération des données
    _name = request.get('name')
    _description = request.get('description')
    _nbrQ = request.get('nbrQ')
 
    # Création d'un objet mode
    new_mode = Mode(_name,_description,_nbrQ)
  
    # Insertion dans la session de connexion courant
    db.session.add(new_mode) 
    
    # Sauvegarde de la mode
    db.session.commit()
    
    # Retour de la mode sauvegarder
    return mode_schema.jsonify(new_mode)

# Modifier Une mode
def update_mode(id,request):

    # Récupération des données
    updatemode = Mode.query.get(id)

    # Modification de l'objet mode
    updatemode.name = request.get('name')
    updatemode.description = request.get('description')
    updatemode.nbrQ = request.get('nbrQ')
 
    # Insertion dans la session de connexion courant
    db.session.add(updatemode)

    # Sauvegarde de la mode
    db.session.commit()

    # Retour de la mode modifier
    return mode_schema.jsonify(updatemode)

# Supprimer une mode
def delete_mode(id):

    # Récupération des données
    deletemode = Mode.query.get(id)

    # Suppression l'objet mode
    db.session.delete(deletemode)

    # Sauvegarde de la suppression
    db.session.commit()

    # Retour de la mode supprimer
    return mode_schema.jsonify(deletemode)

# Récupérer les modes
def all_modes():

    # Récupération des données
    allmodes = Mode.query.all()
    result = modes_schema.dumps(allmodes)

    # Retour des modes
    return jsonify(result)

# Récupérer une mode
def get_mode(id):

    # Récupération des données
    getmode = Mode.query.get(id)
    
    # Retour de la mode
    return mode_schema.jsonify(getmode)

# Création de la relation mode réponse
def _mode_answer(new_mode,_answers):

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
        a = ModeAnswer(_isAnswer,_answer)
        new_mode.answers.append(a)
    return new_mode