from flask import render_template
from config.env import baseUrl
import requests
import json

url_subject = '/api/v1/subject'

# Liste des menus
menu_list=[
         {"name":"Accueil","isActive":"","url":"home"},
         {"name":"Mode","isActive":"","url":"mode"},
         {"name":"Sujet","isActive":"","url":"subject"},
         {"name":"Question","isActive":"","url":"question"},
         {"name":"Réponse","isActive":"","url":"answer"}
      ]

url_subject = '/api/v1/subject'

def configure_routes_game(app):

   @app.route('/game/<id>')
   def game(id):
      new_url = baseUrl+url_subject+'/'+str(id)
      print(new_url)
      subject = requests.get(new_url).json()

      return render_template('quizz/game/index.html',menu_list=menu_list,subject=subject )

   @app.route('/end_game')
   def end_game():
      
      return render_template('quizz/game/end_game.html',menu_list=menu_list )

  
       
       

   
