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
url_question = '/api/v1/question'
url_answer = '/api/v1/answer'


def configure_routes_game(app):

   def getIdValue(id,option) :
      test = '';
      if option=='question':
         newurl = baseUrl+url_question+'/'+str(id)
         question = requests.get(newurl).json()
         test = question['question']
      if option=='answer':
         newurl = baseUrl+url_answer+'/'+str(id)
         answer = requests.get(newurl).json()
         test = answer['answer']
      return test;

   @app.route('/game/<id>', methods=['GET', 'POST'])
   def game(id):
      new_url = baseUrl+url_subject+'/'+str(id)
      print(new_url)
      subject = requests.get(new_url).json()

      return render_template('quizz/game/index.html',
      menu_list=menu_list,
      subject=subject,
      getIdValue=getIdValue)

   @app.route('/end_game')
   def end_game():
      
      return render_template('quizz/game/end_game.html',menu_list=menu_list )

  
       
       

   
