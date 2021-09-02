import os
import sys
import inspect

from flask.json import jsonify

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)
from models.auth.role import Role, RoleSchema
from models.app import db

users_schema = RoleSchema(many=True)


# Récupérer les roles
def all_roles():

    # Récupération des données
    allroles = Role.query.all()
    result = users_schema.dump(allroles)

    # Retour des réponses
    return jsonify(result)
