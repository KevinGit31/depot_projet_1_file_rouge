# -*- coding: utf-8 -*-
import os
import sys
import inspect
currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)
from functools import wraps
from flask import request,jsonify
from flask.helpers import make_response
from api.models import User
import jwt,logging

logger = logging.getLogger('x-access-token')

SECRET_KEY="DevOps"

def token_required(f):
    @wraps(f)
    def decorated(*args,**kwargs):
        token = None
        if 'x-access-token' in request.headers :
            token = request.headers['x-access-token']

        if not token:
            logger.error('Le jeton est manquant !')
            return jsonify({'message':'Le jeton est manquant !'}),401

        try:
            data = jwt.decode(token,SECRET_KEY,algorithms=["HS256"])
            current_user = User.query.filter_by(id=data['user']['id']).first()
        except:
            logger.error('Le jeton n\'est pas valide !')
            return jsonify({'message':'Le jeton n\'est pas valide !'}),401

        return f(current_user,*args,**kwargs)

    return decorated