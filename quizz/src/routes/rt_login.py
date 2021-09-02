import json
from flask import render_template, request, jsonify, make_response, session, redirect, url_for
import requests
import jwt
from datetime import datetime, timedelta
from functools import wraps
from models.auth.user import User


menu_list = [
    {"name": "Accueil", "isActive": "", "url": "home"},
    {"name": "Mode", "isActive": "", "url": "mode"},
    {"name": "Sujet", "isActive": "", "url": "subject"},
    {"name": "Question", "isActive": "", "url": "question"},
    {"name": "Réponse", "isActive": "", "url": "answer"},
    {"name": "Utilisateur", "isActive": "", "url": "listuser"},
    {"name": "Se connecter", "isActive": "active", "url": "login"},
    {"name": "Se déconnecter", "isActive": "", "url": "logout"}
]

tableInfo={
   "headers":[
      {"name":"id","display":"Partie","class":""},
      {"name":"score","display":"Score","class":""},
   ],
   "actions":[
      {"icon":"fa-pen-square","class":"","url":"update_answer"},
      {"icon":"fa-trash-alt","class":"btn-icon-danger","url":"delete_answer"}
   ]
}

url = '/api/v1/users'
baseUrl = 'http://127.0.0.1:5000'


def configure_routes_login(app):

    @app.route('/login', methods=['GET', 'POST'])
    def login():
        user_id = None
        pseudo_found = False
        if request.method == 'GET':
            return render_template('login/login.html', menu_list=menu_list)

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
                    app.config['SECRET_KEY'], "HS256")
                session["token"] = token
            else:
                return make_response('Unable to verify', 403,
                                     {'WWW-Authenticate': 'Basic realm: "Authentication Failed "'})

    @app.route("/logout")
    def logout():
        session["token"] = None
        return redirect(url_for('login'))

    def token_required(f):
        # decorator factory which invoks update_wrapper() method and passes decorated function as an argument
        @wraps(f)
        def decorated(*args, **kwargs):
            token = session.get("token")
            if not token:
                return render_template('login/login.html', menu_list=menu_list)
            try:
                data = jwt.decode(token, app.config['SECRET_KEY'])

                # You can use the JWT errors in exception
            # except jwt.InvalidTokenError:
            #     return 'Invalid token. Please log in again.'
            except:
                return jsonify({'Message': 'Invalid token'}), 403
            return f(*args, **kwargs)

        return decorated

    @app.route('/auth')
    @token_required
    def auth():
        return 'JWT is verified'
