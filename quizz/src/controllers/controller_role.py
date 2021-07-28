from flask import request
import json
import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)
from models.auth.role import RoleSchema
from services.srv_role import all_roles


role_schema = RoleSchema(many=True)


def controller_role(app):

    @app.route('/api/v1/role', methods=['GET'])
    def role_all():

        # Appel du service de traitement de la récupération de toutes les réponses
        allroles = all_roles()

        # Test sur le résultat
        if allroles:
            return allroles, 200 #Success
        else:
            return 'Bad Request', 400 # Error