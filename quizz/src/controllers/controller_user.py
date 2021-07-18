

from flask import request
import json
import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)
from quizz.src.models.auth.user import User, UserSchema
from quizz.src.services.srv_user import add_user,get_user,all_users,delete_user,update_user

user_schema = UserSchema()
users_schema = UserSchema(many=True)


def controller_user(app):

    @app.route('/api/v1/users', methods=['GET'])
    def users_all():

        # Appel du service de traitement de la récupération de toutes les réponses
        allusers = all_users()

        # Test sur le résultat
        if allusers:
            return allusers, 200 #Success
        else:
            return 'Bad Request', 400 # Error

    @app.route('/api/v1/user/<id>', methods=['GET'])
    def user_get(id):

        # Appel du service de traitement de la récupération d'une réponse
        getuser = get_user(id)

        # Test sur le résultat
        if getuser:
            return getuser, 200 #Success
        else:
            return 'Bad Request', 400 # Error

    @app.route('/api/v1/user', methods=['POST'])
    def user_post():

        # Appel du service de traitement de l'ajout d'une réponse
        new_user = add_user(json.loads(request.get_data()))

        # Test sur le résultat
        if new_user and json.loads(new_user.data).get('id') != None:
            return new_user, 200 #Success
        else:
            return 'Bad Request', 400 # Error

    @app.route('/api/v1/user/<id>', methods=['PUT'])
    def user_put(id):

        # Appel du service de traitement de modification d'une réponse
        updateanswer = update_user(id,json.loads(request.get_data()))

        # Test sur le résultat
        if updateanswer:
            return updateanswer, 200 #Success
        else:
            return 'Bad Request', 400 # Error


    @app.route('/api/v1/user/<id>', methods=['DELETE'])
    def user_delete(id):

        # Appel du service de traitement de modification d'une réponse
        deleteuser = delete_user(id)

        # Test sur le résultat
        if deleteuser:
            return deleteuser, 200 #Success
        else:
            return 'Bad Request', 400 # Error