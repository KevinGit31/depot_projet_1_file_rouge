from flask import render_template
import requests
import json
from flask import render_template, request, redirect, url_for
from config.env import baseUrl

url = '/api/v1/mode'


# Liste des menus
menu_list=[
      {"name":"Accueil","isActive":"","url":"home"},
         {"name":"Mode","isActive":"active","url":"mode"},
         {"name":"Sujet","isActive":"","url":"subject"},
         {"name":"Question","isActive":"","url":"question"},
         {"name":"Réponse","isActive":"","url":"answer"},
         {"name": "Utilisateur", "isActive": "", "url": "listuser"},
         {"name": "Se connecter", "isActive": "", "url": "login"},
         {"name": "Se déconnecter", "isActive": "", "url": "logout"}
      ]


def configure_routes_mode(app):

   @app.route('/mode')
   def mode():
      
      rep_list = requests.get(baseUrl+url).json()
      rep_list = json.loads(rep_list)

      return render_template('quizz/mode/index.html',
                               menu_list=menu_list,
                               rep_list=rep_list,)

   
   @app.route('/mode/create', methods=['GET', 'POST'])
   def create_mode():

      # Rendu de la page de création
      if request.method == "GET":

         mode = {
               'name' : '',
               'description' : '',
               'nbrQ': ''
            }
         return render_template('quizz/mode/create.html',
                                   menu_list=menu_list,
                                   mode=mode)
      
      # Soumission du formulaire
      if request.method == "POST":

         _name = request.form.get('name')
         _description = request.form.get('description')
         _nbrQ = request.form.get('nbrQ')

         mode = {
            'name' : _name,
            'description' : _description,
            'nbrQ': _nbrQ ,
         }

         if _name == "" or _description == "" or _nbrQ == "" :
            return render_template('quizz/mode/create.html',
                                   menu_list=menu_list,
                                   mode=mode)
      
         requests.post(baseUrl+url, json.dumps(mode))
         return redirect(url_for("mode"))

   @app.route('/mode/update/<id>', methods=['GET', 'POST'])
   def update_mode(id):

        # Mise à jour de l'url
      newurl = baseUrl+url+'/'+str(id)
        
        # Rendu de la page de création
      if request.method == "GET":
         mode = requests.get(newurl).json()

         return render_template('quizz/mode/update.html',
                                   menu_list=menu_list,
                                   mode=mode)


      _name = request.form.get('name')
      _description = request.form.get('description')
      _nbrQ = request.form.get('nbrQ')
         
      mode = {
            'name' : _name,
            'description' : _description,
            'nbrQ': _nbrQ ,
      }

      if _name == "" or _description == "" or _nbrQ == "" :
         return render_template('quizz/mode/update.html',
                                   menu_list=menu_list,
                                   mode=mode)

      requests.put(newurl, json.dumps(mode))
      return redirect(url_for("mode"))

   
   @app.route('/mode/delete/<id>', methods=['GET', 'POST'])
   def delete_mode(id):
      # Mise à jour de l'url
      newurl = baseUrl+url+'/'+str(id)

      # Rendu de la page de suppression
      if request.method == "GET":
         mode = requests.get(newurl).json()
         return render_template('quizz/mode/delete.html',menu_list=menu_list,mode=mode)

      # Soumission du formulaire
      if request.method == "POST":
         requests.delete(newurl)
         return redirect(url_for("mode")) 



  
       
       

   
