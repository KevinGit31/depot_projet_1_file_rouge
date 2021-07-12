import json
from flask import render_template,request, redirect, url_for

url = '/api/v1/question' 
baseUrl='http://127.0.0.1:5000' 
import requests

tableInfo={
   "headers":[
      {"name":"question","display":"Question","class":""},
      {"name":"answers","display":"Nombre de réponses","class":"br"}
   ],
   "actions":[
      {"icon":"fa-pen-square","class":"","url":"update_answer"},
      {"icon":"fa-trash-alt","class":"btn-icon-danger","url":"delete_answer"}
   ]
}

# Liste des menus
menu_list=[
         {"name":"Accueil","isActive":"","url":"index"},
         {"name":"Jouer","isActive":"","url":"game"},
         {"name":"Mode","isActive":"","url":"mode"},
         {"name":"Sujet","isActive":"","url":"subject"},
         {"name":"Question","isActive":"active","url":"question"},
         {"name":"Réponse","isActive":"","url":"answer"}
      ]

def configure_routes_question(app):

   @app.route('/question')
   def question():

      rep_list = requests.get(baseUrl+url).json()

      rep_list = json.loads(rep_list)

      return render_template('quizz/question/index.html',
      tableInfo=tableInfo,
      menu_list=menu_list, 
      rep_list=rep_list)

   @app.route('/question/create',methods=['GET', 'POST'])
   def create_question():

      # Rendu de la page de création
      if request.method == "GET":
         return render_template('quizz/question/create.html',menu_list=menu_list,question=None)  
      
      # Soumission du formulaire
      if request.method == "POST":

         answers = request.form.get('answers')
         print(answers)
         if(answers==""):
            answers = []

         answers = json.dumps(answers)
         print(answers)
         answer = {
        'answer': request.form.get('answer'),
        'isAnswer': False
         }

         answers.append(answer)
         question = {
            'question':request.form.get('question'),
            'answers':answers
         }

         if  request.form.get('btn-answer') =="ADD" :
            return render_template('quizz/question/create.html',menu_list=menu_list,question=question)  

         requests.post(baseUrl+url,json.dumps(question))
         return redirect(url_for("question"))


  
       
       

   
