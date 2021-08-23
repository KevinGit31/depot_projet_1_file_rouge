import json
import logging

import hashlib
import requests
from flask import render_template, request, redirect, url_for

url = '/api/v1/users'
url_role = '/api/v1/role'
baseUrl = 'http://127.0.0.1:5000'

# Liste des menus
menu_list = [
    {"name": "Accueil", "isActive": "", "url": "index"},
    {"name": "Jouer", "isActive": "", "url": "game"},
    {"name": "Mode", "isActive": "", "url": "mode"},
    {"name": "Sujet", "isActive": "", "url": "subject"},
    {"name": "Question", "isActive": "", "url": "question"},
    {"name": "Réponse", "isActive": "", "url": "answer"},
    {"name": "Utilisateur", "isActive": "active", "url": "user"}
]


def configure_routes_user(app):
    @app.route('/user')
    def listuser():

        user_list = requests.get(baseUrl + url).json()
        # user_list = json.loads(user_list)
        app.logger.info('requests.get(baseUrl + url).json()' + user_list)
        return render_template('auth/page_listuser.html', menu_list=menu_list, users_list=user_list)

    @app.route('/user/create', methods=['GET', 'POST'])
    def create_user():

        app.logger.info('/user/create')
        # Rendu de la page de création
        if request.method == "GET":
            all_rols = requests.get(baseUrl + url_role).json()
            app.logger.info('requests.get(baseUrl + url_role).json()' + all_rols)
            return render_template('auth/page_adduser.html', menu_list=menu_list, all_rols=all_rols)

            # Soumission du formulaire
        if request.method == "POST":

            hashed_password = hashlib.md5(request.form.get('password'))
            newuser = {
                'firstname': request.form.get('firstname'),
                'lastname': request.form.get('lastname'),
                'pseudo': request.form.get('pseudo'),
                'role_id': request.form.get('role_user')
            }
            app.logger.info('requests.get(baseUrl + url_role).json()' + newuser)
            requests.post(baseUrl + url, json.dumps(newuser))
            return redirect(url_for("listuser"))

    @app.route('/user/update/<id>', methods=['GET', 'POST'])
    def update_user(id):
        app.logger.info('/user/update/<id>')
        # Mise à jour de l'url
        newurl = baseUrl + url + '/' + str(id)
        all_rols = requests.get(baseUrl + url_role).json()
        # Rendu de la page de modification
        if request.method == "GET":
            user = requests.get(newurl).json()
            return render_template('auth/page_updateuser.html', menu_list=menu_list, user=user, all_rols=all_rols)

        # Soumission du formulaire
        if request.method == "POST":
            newuser = {
                'firstname': request.form.get('firstname'),
                'lastname': request.form.get('lastname'),
                'pseudo': request.form.get('pseudo'),
                'role_id': request.form.get('role_user')
            }
            app.logger.info("kevin")
            app.logger.info(request.form.get('role_user'))
            app.logger.info(json.dumps(newuser))
            requests.put(newurl, json.dumps(newuser))
            return redirect(url_for("listuser"))

    @app.route('/user/delete/<id>', methods=['GET', 'POST'])
    def delete_user(id):

        # Mise à jour de l'url
        newurl = baseUrl + url + '/' + str(id)

        # Rendu de la page de suppression
        if request.method == "GET":
            lstuser = requests.get(newurl).json()
            return render_template('auth/page_deleteuser.html', menu_list=menu_list, lstuser=lstuser)

        # Soumission du formulaire
        if request.method == "POST":
            requests.delete(newurl)
            return redirect(url_for("listuser"))


