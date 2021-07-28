import json
from flask import render_template, request, redirect, url_for, session, jsonify, make_response
import requests, jwt
from datetime import datetime, timedelta
from functools import wraps


def configure_routes_login(app):
    @app.route('/login', methods=['POST'])
    def login():
        # methode à améliorer
        if request.form.get('pseudo') and request.form.get('password') == '':
            session['logged_in'] = True
            token = jwt.encode({
                'user': request.form.get('pseudo'),
                'expiration': str(datetime.utcnow() + timedelta(seconds=180))
            },
                app.config['SECRET_KEY'])
            return jsonify({
                'token': token.decode('utf-8')
            })
        else:
            return make_response('Unable to verify', 403, {'WWW-Authenticate': 'Basic realm: "Authentification failed'})

    def token_required(func):
        @wraps(func)
        def decorated(*args, **kwargs):
            token = request / args.get('token')
            if not token:
                return jsonify({'Alert': 'token not found'})
            try:
                payload = jwt.decode(token, app.config['SECRET_KEY'])
            except:
                return jsonify({'Alert': 'Invalid token!'})

        return decorated

    @app.route('/auth')
    @token_required
    def auth():
        return 'JWT is verified'

