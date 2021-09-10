import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)
from functools import wraps
from flask import Blueprint,request,jsonify
from api.models import User
from api import db
from api.controllers import token_required
from werkzeug.security import generate_password_hash



SECRET_KEY="DevOps"

users = Blueprint('users',__name__)

@users.route('',methods=['GET'])
@token_required
def get_all_users(current_user):

    if not current_user.admin:
        return jsonify({'message':'Impossible d\'exécuter cette fonction !'})

    users = User.query.order_by(User.name).all()

    output = []

    for user in users:
        user_data = {}
        user_data['id'] = user.id
        user_data['name'] = user.name
        user_data['admin'] = user.admin
        user_data['email'] = user.email

        output.append(user_data)

    return jsonify(output)

@users.route('/<id>',methods=['GET'])
@token_required
def get_one_user(current_user,id):

    if not current_user.admin:
        return jsonify({'message':'Impossible d\'exécuter cette fonction !'})

    user = User.query.filter_by(id=id).first()

    if not user:
        return jsonify({'message': 'Aucun utilisateur trouvé !'})
    
    user_data = {}
    user_data['id'] = user.id
    user_data['name'] = user.name
    user_data['admin'] = user.admin
    user_data['email'] = user.email

    return jsonify(user_data)

@users.route('',methods=['POST'])
def create_user():

    data = request.get_json()

    hashed_password = generate_password_hash(data['password'],method='sha256')
    new_user = User(email=data['email'], name=data['name'],password=hashed_password,admin=data['admin'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message':'Nouvel utilisateur créé !'})

@users.route('/admin/<id>',methods=['PUT'])
@token_required
def promote_user(current_user,id):
    
    if not current_user.admin :
        return jsonify({'message': 'Impossible d\'exécuter cette fonction !'})
    
    user = User.query.filter_by(id=id).first()

    if not user:
        return jsonify({'message': 'Aucun utilisateur trouvé !'})
    
    user.admin = True
    db.session.commit()

    return jsonify({'message':'L\'utilisateur a été promu !'})

@users.route('/<id>',methods=['PUT'])
@token_required
def update_user(current_user,id):
    
    if not current_user.admin :
        return jsonify({'message': 'Impossible d\'exécuter cette fonction !'})

    data = request.get_json()
    
    user = User.query.filter_by(id=id).first()

    if not user:
        return jsonify({'message': 'Aucun utilisateur trouvé !'})
    
    user.name = data['name']
    user.admin =data['admin']

    db.session.commit()
    return jsonify({'message':'L\'utilisateur a été modifier !'})

@users.route('/<id>',methods=['DELETE'])
@token_required
def delete_user(current_user,id):

    if not current_user.admin:
        return jsonify({'message':'Impossible d\'exécuter cette fonction !'})

    user = User.query.filter_by(id=id).first()

    if not user:
        return jsonify({'message': 'Aucun utilisateur trouvé !'})

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'L\'utilisateur a été supprimé !'})
