import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)
from functools import wraps
from flask import Blueprint,request,jsonify,render_template,redirect,url_for
from api.models import User
from api import db
from api.controllers import token_required
from werkzeug.security import generate_password_hash



SECRET_KEY="DevOps"

client = Blueprint('client',__name__)

@client.route('',methods=['GET'])
def get_qcm_client():
    return render_template('index.html')