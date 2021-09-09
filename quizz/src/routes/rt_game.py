from flask import render_template,request,redirect, url_for,session
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
   
   def saveAnswer():
      print("saveAnswer")

   @app.route('/game/<id>', methods=['GET', 'POST'])
   def game(id):

      new_url = baseUrl+url_subject+'/'+str(id)

      subject = requests.get(new_url).json()
      lastindex=len(subject['questions'])
      index=0;
      if request.method == "GET":
         session['resulat'] = []

      # Précédent ou suivant
      if request.method == "POST":
         answers= request.form.getlist('answers')
         question_id= request.form.get('question_id')

         resulat = session.get("resulat")
         item = { 'question_id': question_id,'answers':answers}
         resulat.append(item)
         session['resulat'] = resulat 

         # Redirection vers le score
         if request.form.get('btn-end') == "END": 
            return redirect(url_for('end_game',subject_id=subject['id'],user_id=1))

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
      saveAnswer=saveAnswer,
      getIdValue=getIdValue)

   def calculscore(subject):
      print("calculscore")
      print("")
      result = session['resulat']
      c = 0
      t  = False;
      # Recherche par questions répondu
      for r in result:

         # Boucle sur les questions et leurs réponses définit
         for q in subject['questions']:
            print("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
            print(q)
            # Si la question répondu coorespond à la question définit
            if  q['question_id'] == r['question_id'] :
               t  = False;
               # Recherche des bonnes réponses définit
               for isa in q['answers']:
                  print("isaisaisaisaisaisaisaisaisaisaisaisa")
                  print(isa)
                  # Lorsqu'une bonne réponse définit est trouvé
                  if isa['isAnswer'] :

                     # Vérification dans le résulats de réponse
                     for a in r['answers']:
                        print("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                        print(a)
                        if isa['answer_id'] == a :
                           t = True;
         if t :
            c=c+1;
      return c
               
               



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
      r=calculscore(subject)
      print(r)
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

  
       
       

   
