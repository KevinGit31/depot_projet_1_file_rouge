from flask import render_template
import requests
import json
from flask import render_template, request, redirect, url_for

url = '/api/v1/subject'
url_mode = '/api/v1/mode'
url_question = '/api/v1/question'
url_answer = '/api/v1/answer'
baseUrl = 'http://127.0.0.1:5000'

tableInfo = {
    "headers": [
        {"name": "name", "display": "Nom", "class": ""},
        {"name": "description", "display": "Description", "class": "br"},
        {"name": "mode", "display": "Mode", "class": "br"},
    ],
    "actions": [
        {"icon": "fa-pen-square", "class": "", "url": "update_subject"},
        {"icon": "fa-trash-alt", "class": "btn-icon-danger", "url": "delete_subject"}
    ]
}

# Liste des menus
menu_list=[
         {"name":"Accueil","isActive":"","url":"index"},
         {"name":"Jouer","isActive":"","url":"game"},
         {"name":"Mode","isActive":"","url":"mode"},
         {"name":"Sujet","isActive":"active","url":"subject"},
         {"name":"Question","isActive":"","url":"question"},
         {"name":"Réponse","isActive":"","url":"answer"}
      ]

def configure_routes_subject(app):

    @app.route('/subject')
    def subject():

        rep_list = requests.get(baseUrl+url).json()

        rep_list = json.loads(rep_list)

        answers_list = requests.get(baseUrl+url_answer).json()
        answers_list = json.loads(answers_list)

        return render_template('quizz/subject/index.html',
                               tableInfo=tableInfo,
                               menu_list=menu_list,
                               rep_list=rep_list,) 

    @app.route('/subject/create', methods=['GET', 'POST'])
    def create_subject():
        # Recupération de modes de jeu
        modes = requests.get(baseUrl+url_mode).json()
        modes = json.loads(modes)

        # Recupération des questions
        all_questions = requests.get(baseUrl+url_question).json()
        all_questions = json.loads(all_questions)

        # Rendu de la page de création
        if request.method == "GET":

         # Création de subject temporaire
            questions = []

            subject = {
            'name': '',
            'description': '',
            'mode_id': 0,
            'questions': questions
            }

            return render_template('quizz/subject/create.html',
                                   menu_list=menu_list,
                                   subject=subject,
                                   questions=all_questions,
                                   modes=modes)

        # Soumission du formulaire
        if request.method == "POST":

            # Récupperation des données
            _name = request.form.get('name')
            _description = request.form.get('description')
            _mode_id = request.form.get('mode_id')

            questions = request.form.get('questions')
            # Mise à jour de l'url
            newurl = baseUrl+url_mode+'/'+ _mode_id
            mode = requests.get(newurl).json()

            # Modificatoin de la chaine de string pour obtenir un format json

            _questions = questions.replace("\'", "\"")
            #_questions = _questions.replace("False", "\"False\"")
            #_questions = _questions.replace("True", "\"True\"")
            _questions = json.loads(_questions)


            #_questions = []

            #answers = request.form.get('answers')
            # Modificatoin de la chaine de string pour obtenir un format json

            #answers = answers.replace("\'", "\"")
            #answers = json.loads(answers)
            #print(answers)

            # Action pour supprimer une question
            if request.form.get('btn-close'):

                # answers = del answers[2]

                index_questions = request.form.get('btn-close')
                index_questions = int(index_questions) - 1

                # Supprimer une réponse
                _questions.pop(index_questions)

                print(len(_questions))

                subject = {
                    'name': _name,
                    'description': _description,
                    'mode_id':_mode_id,
                    'questions': _questions
                }
                return render_template('quizz/subject/create.html',
                                   menu_list=menu_list,
                                   subject=subject,
                                   questions=all_questions,
                                   modes=modes)

            if len(_questions) >= mode['nbrQ'] :
                subject = {
                    'name': _name,
                    'description': _description,
                    'mode_id':_mode_id,
                    'questions': _questions
                }
                return render_template('quizz/subject/create.html',
                                   menu_list=menu_list,
                                  subject=subject,
                                  questions=all_questions,
                                   modes=modes)


            # Action pour ajouter une mauvaise réponse
            if request.form.get('btn-question') == "ADD":

                #str_answer = request.form.get('answer').strip()
                _question = request.form.get('question')
                _question  = checkQuestion(_question)
                #str_answer =_answer

                #if str_answer['answer'] != "":

                    #answer = {
                    #    'answer':str_answer,
                    #    'isAnswer': ''
                    #}

                    # Ajout de la nouvelle réponse
                    #answers.append(answer)

                _questions.append(_question)
                subject = {
                    'name': _name,
                    'description': _description,
                    'mode_id':_mode_id,
                    'questions': _questions
                }
                return render_template('quizz/subject/create.html',
                                   menu_list=menu_list,
                                   subject=subject,
                                   questions=all_questions,
                                   modes=modes)

            subject = {
                'name': _name,
                'description': _description,
                'mode_id':_mode_id,
                'questions': _questions
            }

            requests.post(baseUrl+url, json.dumps(subject))
            return redirect(url_for("subject"))

    @app.route('/subject/update/<id>', methods=['GET', 'POST'])
    def update_subject(id):
        pass

    @app.route('/subject/delete/<id>', methods=['GET', 'POST'])
    def delete_subject(id):
        pass

    def checkQuestion(_question):

        _question = _question.replace("\'", "\"")
        _question = _question.replace("False", "\"False\"")
        _question = _question.replace("True", "\"True\"")
        _question = json.loads(_question)

        return _question

       
       

   
