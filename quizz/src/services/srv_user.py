import os
import sys
import inspect

from flask.json import jsonify

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)
from models.auth.user import User, UserSchema
from models.app import db

user_schema = UserSchema()
users_schema = UserSchema(many=True)

# Ajouter une reponse
def add_user(request):
    
    # Récupération des données
    _firstname = request.get('firstname')
    _lastname = request.get('lastname')
    _pseudo = request.get('pseudo')

    # Création d'un objet réponse
    new_user = User(_firstname,_lastname, _pseudo)

    # Insertion dans la session de connexion courant
    db.session.add(new_user)

    # Sauvegarde de la réponse
    db.session.commit()

    # Retour de la réponse sauvegarder
    return user_schema.jsonify(new_user)

# Modifier Une réponse
def update_user(id,request):

    # Récupération des données
    updateuser = User.query.get(id)

    # Modification de l'objet réponse
    updateuser.firstname = request.get('firstname')
    updateuser.lastname = request.get('lastname')
    updateuser.pseudo = request.get('pseudo')

    # Insertion dans la session de connexion courant
    db.session.add(updateuser)

    # Sauvegarde de la réponse
    db.session.commit()

    # Retour de la réponse modifier
    return user_schema.jsonify(updateuser)

# Supprimer une réponse
def delete_user(id):

    # Récupération des données
    deleteanswer = User.query.get(id)

    # Suppression l'objet réponse
    db.session.delete(deleteanswer)

    # Sauvegarde de la suppression
    db.session.commit()

    # Retour de la réponse supprimer
    return user_schema.jsonify(deleteanswer)

# Récupérer les réponses
def all_users():

    # Récupération des données
    allusers = User.query.all()
    result = users_schema.dump(allusers)

    # Retour des réponses
    return jsonify(result)

# Récupérer une réponse
def get_user(id):

    # Récupération des données
    getuser = User.query.get(id)
    
    # Retour de la réponse
    return user_schema.jsonify(getuser)
