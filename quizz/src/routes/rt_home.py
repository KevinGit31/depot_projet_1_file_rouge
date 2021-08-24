from flask import render_template,request,redirect, url_for
from config.env import baseUrl
import requests
import json

url = '/api/v1/game' 
url_mode = '/api/v1/mode'
url_subject = '/api/v1/subject'

# Liste des menus
menu_list=[
         {"name":"Accueil","isActive":"active","url":"home"},
         {"name":"Mode","isActive":"","url":"mode"},
         {"name":"Sujet","isActive":"","url":"subject"},
         {"name":"Question","isActive":"","url":"question"},
         {"name":"Réponse","isActive":"","url":"answer"}
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

def configure_routes_home(app):

   @app.route('/')
   def home():

      rep_list = requests.get(baseUrl+url).json()
      rep_list = json.loads(rep_list)
      
      return render_template('quizz/home/index.html',
      tableInfo=tableInfo,
      menu_list=menu_list, 
      rep_list=rep_list )

   @app.route('/choose_mode', methods=['GET', 'POST'])
   def choose_mode():

      # Rendu de la page de création
      if request.method == "GET":
         modes = requests.get(baseUrl+url_mode).json()
         modes = json.loads(modes)

         return render_template('quizz/home/choose_mode.html',
         modes=modes,
         menu_list=menu_list, 
         )
      
      # Rendu de la page de création
      if request.method == "POST":
         mode_id= request.form.get('select_mode')
         if mode_id==None:
            return redirect(url_for("choose_mode")) 
         else :
            return redirect(url_for("choose_subject",id=mode_id)) 

   @app.route('/choose_subject/<id>', methods=['GET', 'POST'])
   def choose_subject(id):
      mode_id = id
      if request.method == "GET":

         subjects = requests.get(baseUrl+url_subject+'/mode/'+str(id)).json()
         subjects = json.loads(subjects)

         return render_template('quizz/home/choose_subject.html',
         subjects=subjects,
         menu_list=menu_list, 
         )

      # Rendu de la page de création
      if request.method == "POST":
         subject_id= request.form.get('select_subject')
         if subject_id==None:
            return redirect(url_for("choose_subject",id=mode_id))  
         else :
            return redirect(url_for("game",id=subject_id)) 

  
       
       

   
