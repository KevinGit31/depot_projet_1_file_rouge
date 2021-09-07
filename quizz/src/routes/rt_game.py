from flask import render_template,request,redirect, url_for
from config.env import baseUrl
from datetime import date
import requests
import json

url = '/api/v1/game'
url_subject = '/api/v1/subject'

# Liste des menus
menu_list=[
         {"name":"Accueil","isActive":"","url":"home"},
         {"name":"Mode","isActive":"","url":"mode"},
         {"name":"Sujet","isActive":"","url":"subject"},
         {"name":"Question","isActive":"","url":"question"},
         {"name":"Réponse","isActive":"","url":"answer"},
         {"name": "Utilisateur", "isActive": "", "url": "listuser"}
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

      subject = requests.get(new_url).json()
      lastindex=len(subject['questions'])
      index=0;

      # Précédent ou suivant
      if request.method == "POST":
         index = request.form.get('index')
         if request.form.get('btn-nav') == "PREV":
            index = int(index) - 1
         else :
           index = int(index) + 1 

      return render_template('quizz/game/index.html',
      menu_list=menu_list,
      subject=subject,
      lastindex=lastindex,
      index=index,
      getIdValue=getIdValue)

   @app.route('/end_game/<subject_id>/<user_id>')
   def end_game(subject_id,user_id):
      new_url = baseUrl+url_subject+'/'+str(subject_id)
      subject = requests.get(new_url).json()
      lastindex=len(subject['questions'])

      # Calcul des dates
      startDate = date.today()
      endDate = date.today()

      # Calcul du score
      # n le nombre de questions
      # r le nombre de bonne réponse
      r=3
      n=len(subject['questions'])
      if r==0 :
         score = 0
      else :
         score = r*100/n

      #Création du jeu
      game = {
         'startDate': str(startDate),
         'endDate': str(endDate),
         'score': score,
         'subject_id': subject_id,
         'user_id': user_id,
      }
      requests.post(baseUrl+url,json.dumps(game))
      
      return render_template('quizz/game/end_game.html',menu_list=menu_list,score=score )

  
       
       

   
