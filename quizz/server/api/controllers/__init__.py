import os
import sys
import inspect
currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)
from functools import wraps
from flask import request,jsonify
from flask.helpers import make_response
from api.models import User,Todo
import jwt

SECRET_KEY="DevOps"

def token_required(f):
    @wraps(f)
    def decorated(*args,**kwargs):
        token = None
        if 'x-access-token' in request.headers :
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message':'Token is missing!'}),401

        try:
            data = jwt.decode(token,SECRET_KEY,algorithms=["HS256"])
            current_user = User.query.filter_by(id=data['user']['id']).first()
        except:
            return jsonify({'message':'Token is invalid!'}),401

        return f(current_user,*args,**kwargs)

    return decorated