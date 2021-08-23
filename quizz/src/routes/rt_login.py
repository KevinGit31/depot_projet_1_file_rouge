import json
from flask import render_template, request, redirect, url_for, session, jsonify, make_response
import requests
import jwt
from datetime import datetime, timedelta
from functools import wraps


menu_list = [
    {"name": "Accueil", "isActive": "", "url": "index"},
    {"name": "Jouer", "isActive": "", "url": "game"},
    {"name": "Mode", "isActive": "", "url": "mode"},
    {"name": "Sujet", "isActive": "", "url": "subject"},
    {"name": "Question", "isActive": "", "url": "question"},
    {"name": "Réponse", "isActive": "", "url": "answer"},
    {"name": "Utilisateur", "isActive": "active", "url": "user"}
]

url = '/api/v1/users'
baseUrl = 'http://127.0.0.1:5000'


def configure_routes_login(app):
    app.config['SECRET_KEY'] = 'thisissecret'

    @app.route('/login', methods=['GET', 'POST'])
    def login():
        user_id = None
        pseudo_found = False
        if request.method == 'GET':
            return render_template('login/login.html')

        if request.method == 'POST':
            # methode à améliorer
            user_list = requests.get(baseUrl + url).json()
            for user in user_list:
                if user['pseudo'] == request.form.get('pseudo'):
                    user_id = user['id']
                    pseudo_found = True

            if pseudo_found:
                token = jwt.encode({
                    'pseudo': request.form.get('pseudo'),
                    # don't foget to wrap it in str function, otherwise it won't work [ i struggled with this one! ]
                    'expiration': str(datetime.utcnow() + timedelta(seconds=60)),
                    'user_id': user_id
                },
                    app.config['SECRET_KEY'])
                return jsonify({'token': token})
            else:
                return make_response('Unable to verify', 403,
                                     {'WWW-Authenticate': 'Basic realm: "Authentication Failed "'})

    def token_required(func):
        # decorator factory which invoks update_wrapper() method and passes decorated function as an argument
        @wraps(func)
        def decorated(*args, **kwargs):
            token = request.args.get('token')
            if not token:
                return jsonify({'Alert!': 'Token is missing!'}), 401

            try:

                data = jwt.decode(token, app.config['SECRET_KEY'])
            # You can use the JWT errors in exception
            # except jwt.InvalidTokenError:
            #     return 'Invalid token. Please log in again.'
            except:
                return jsonify({'Message': 'Invalid token'}), 403
            return func(*args, **kwargs)

        return decorated

    @app.route('/auth')
    @token_required
    def auth():
        return 'JWT is verified'
