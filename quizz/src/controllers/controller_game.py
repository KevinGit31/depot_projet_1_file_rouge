

from flask import request
import json
import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)
from models.quizz.game import Game, GameSchema
from services.srv_game import add_game,get_game,all_games,delete_game,update_game

game_schema = GameSchema()
games_schema = GameSchema(many=True)


def controller_game(app):

    @app.route('/api/v1/game', methods=['GET'])
    def game_all():

        # Appel du service de traitement de la récupération de toutes les réponses
        allgame = all_games()

        # Test sur le résultat
        if allgame:
            return allgame, 200 #Success
        else:
            return 'Bad Request', 400 # Error

    @app.route('/api/v1/game/<id>', methods=['GET'])
    def game_get(id):

        # Appel du service de traitement de la récupération d'une réponse
        getgame = get_game(id)

        # Test sur le résultat
        if getgame:
            return getgame, 200 #Success
        else:
            return 'Bad Request', 400 # Error

    @app.route('/api/v1/game', methods=['POST'])
    def game_post():

        # Appel du service de traitement de l'ajout d'une réponse
        new_game = add_game(json.loads(request.get_data()))

        # Test sur le résultat
        if new_game and json.loads(new_game.data).get('id') != None:
            return new_game, 200 #Success
        else:
            return 'Bad Request', 400 # Error

    @app.route('/api/v1/game/<id>', methods=['PUT'])
    def game_put(id):

        # Appel du service de traitement de modification d'une réponse
        updategame = update_game(id,json.loads(request.get_data()))

        # Test sur le résultat
        if updategame:
            return updategame, 200 #Success
        else:
            return 'Bad Request', 400 # Error


    @app.route('/api/v1/game/<id>', methods=['DELETE'])
    def game_delete(id):

        # Appel du service de traitement de modification d'une réponse
        deletegame = delete_game(id)

        # Test sur le résultat
        if deletegame:
            return deletegame, 200 #Success
        else:
            return 'Bad Request', 400 # Error