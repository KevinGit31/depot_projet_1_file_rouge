import os

import sys
import inspect
from flask import json

from flask.json import jsonify

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)
from models.quizz.game import Game,GameSchema
from models.app import db
from models.quizz.question import Question


game_schema = GameSchema()
games_schema = GameSchema(many=True)

# Ajouter une reponse
def add_game(request):
    
    print(request)

    # Récupération des données
    _startDate = request.get('startDate')
    _endDate = request.get('endDate')
    _score = request.get('score')
    _user_id = request.get('user_id')
    _subject_id = request.get('subject_id')

    # Création d'un objet game
    new_game = Game(_startDate,_endDate,_score)
    new_game.user_id = _user_id
    new_game.subject_id = _subject_id

    print(game_schema.jsonify(new_game))

    # Insertion dans la session de connexion courant
    db.session.add(new_game) 
    
    # Sauvegarde de la game
    db.session.commit()
    
    # Retour de la game sauvegarder
    return game_schema.jsonify(new_game)

# Modifier Une game
def update_game(id,request):

    # Récupération des données
    updategame = Game.query.get(id)
    _questions = request.get('questions')
    # Modification de l'objet game
    updategame.name= request.get('name')
    updategame.description= request.get('description')
    updategame.mode_id= request.get('mode_id')
    updategame.questions = []

    updategame = _game_question(updategame,_questions)
    
    # Insertion dans la session de connexion courant
    db.session.add(updategame)

    # Sauvegarde de la game
    db.session.commit()

    # Retour de la game modifier
    return game_schema.jsonify(updategame)

# Supprimer une game
def delete_game(id):

    # Récupération des données
    deletegame = Game.query.get(id)

    game_schema.jsonify(deletegame)

    # Suppression l'objet game
    db.session.delete(deletegame)

    # Sauvegarde de la suppression
    db.session.commit()

    # Retour de la game supprimer
    return game_schema.jsonify(deletegame)

# Récupérer les games
def all_games():

    # Récupération des données
    allgames = Game.query.all()
    
    result = games_schema.dumps(allgames)

    # Retour des games
    return jsonify(result)

# Récupérer une game
def get_game(id):

    # Récupération des données
    getgame = Game.query.get(id)
    
    # Retour de la game
    return game_schema.jsonify(getgame)

# Création de la relation game réponse
def _game_question(new_game,_questions):

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
            #_question = _question_answer(_question,_answers)

            q=None
        new_game.questions.append(q)

    return new_game