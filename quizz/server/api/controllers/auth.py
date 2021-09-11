import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)
from functools import wraps
from flask import Blueprint, json,render_template,flash,request,jsonify
from flask.helpers import make_response
from api.models import User
from api import db
from flask_sqlalchemy import SQLAlchemy
from api.controllers import token_required
import uuid
import jwt
import datetime
from werkzeug.security import generate_password_hash,check_password_hash



SECRET_KEY="DevOps"

auths = Blueprint('auths',__name__)

@auths.route('/login')
def login():

    auth = request.authorization

    print(request.authorization)

    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify',401,{'www-Authenticate': 'Basic realm="Login required!"'})

    user = User.query.filter_by(email=auth.username).first()

    if not user:
        return make_response('Could not verify',401,{'www-Authenticate': 'Basic realm="Login required!"'})

    if check_password_hash(user.password,auth.password):
        token = jwt.encode({'user':{
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'admin': user.admin,
        }, 'exp': datetime.datetime.utcnow()+datetime.timedelta(minutes=60)}, SECRET_KEY)
        return jsonify({'token': token})

    return make_response('Could not verify',401,{'www-Authenticate': 'Basic realm="Login required!"'})
