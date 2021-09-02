from flask import render_template
import requests
import json
from flask import render_template, request, redirect, url_for
from config.env import baseUrl

url = '/api/v1/subject'
url_mode = '/api/v1/mode'
url_question = '/api/v1/question'
url_answer = '/api/v1/answer'

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
         {"name":"Accueil","isActive":"","url":"home"},
         {"name":"Mode","isActive":"","url":"mode"},
         {"name":"Sujet","isActive":"active","url":"subject"},
         {"name":"Question","isActive":"","url":"question"},
         {"name":"Réponse","isActive":"","url":"answer"},
         {"name": "Utilisateur", "isActive": "", "url": "listuser"},
         {"name": "Se connecter", "isActive": "", "url": "login"},
         {"name": "Se déconnecter", "isActive": "", "url": "logout"}
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

            # Récuppération des données du formulaire
            _name = request.form.get('name')
            _description = request.form.get('description')
            _mode_id = request.form.get('mode_id')
            questions = request.form.get('questions')

            # Mise à jour de l'url
            newurl_m = baseUrl+url_mode+'/'+ _mode_id
            mode = requests.get(newurl_m).json()

            # Modificatoin de la chaine de string pour obtenir un format json
            _questions = questions.replace("\'", "\"")
            _questions = json.loads(_questions)

            # Ajouter des sujets
            if request.form.get('btn-question') == "ADD":

                _question = request.form.get('question')
                _question  = checkQuestion(_question)

                # Limitation du nombre de question
                if len(_questions) < mode['nbrQ'] and request.form.get('btn-question') == "ADD":
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

            # Supprimer les sujets
            if request.form.get('btn-close'):
                print('delete')
                index_questions = request.form.get('btn-close')
                index_questions = int(index_questions) - 1

                # Supprimer une réponse
                _questions.pop(index_questions)

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
        # Mise à jour de l'url
        newurl = baseUrl+url+'/'+str(id)

        # Recupération des questions
        all_questions = requests.get(baseUrl+url_question).json()
        all_questions = json.loads(all_questions)

        # Recupération de modes de jeu
        modes = requests.get(baseUrl+url_mode).json()
        modes = json.loads(modes)
        
        # Rendu de la page de création
        if request.method == "GET":

            _subject = requests.get(newurl).json()
            questions = []
            for _question in _subject['questions']:
                _question = _question['question']
                _question_str = json.dumps(_question)
                _question_str = _question_str.replace("false", "\"false\"")
                _question_str = _question_str.replace("true", "\"true\"")
                _question = json.loads(_question_str)

                questions.append(_question)

            subject = {
                'name': _subject['name'],
                'description':_subject['description'],
                'mode_id':_subject['mode_id'],
                'questions': questions
            }
    
            return render_template('quizz/subject/update.html',
                                   menu_list=menu_list,
                                   subject=subject,
                                   questions=all_questions,
                                   modes=modes)

        # Soumission du formulaire
        if request.method == "POST":

            # Récuppération des données du formulaire
            _name = request.form.get('name')
            _description = request.form.get('description')
            _mode_id = request.form.get('mode_id')
            questions = request.form.get('questions')

            # Mise à jour de l'url
            newurl_m = baseUrl+url_mode+'/'+ _mode_id
            mode = requests.get(newurl_m).json()

            # Modificatoin de la chaine de string pour obtenir un format json
            _questions = questions.replace("\'", "\"")
            _questions = json.loads(_questions)

            # Ajouter des sujets
            if request.form.get('btn-question') == "ADD":

                _question = request.form.get('question')
                _question  = checkQuestion(_question)

                # Limitation du nombre de question
                if len(_questions) < mode['nbrQ'] and request.form.get('btn-question') == "ADD":
                    _questions.append(_question)

                subject = {
                    'name': _name,
                    'description': _description,
                    'mode_id':_mode_id,
                    'questions': _questions
                }

                return render_template('quizz/subject/update.html',
                                   menu_list=menu_list,
                                   subject=subject,
                                   questions=all_questions,
                                   modes=modes)

            # Supprimer les sujets
            if request.form.get('btn-close'):
                print('delete')
                index_questions = request.form.get('btn-close')
                index_questions = int(index_questions) - 1

                # Supprimer une réponse
                _questions.pop(index_questions)

                subject = {
                    'name': _name,
                    'description': _description,
                    'mode_id':_mode_id,
                    'questions': _questions
                }

                return render_template('quizz/subject/update.html',
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
            requests.put(newurl, json.dumps(subject))
            return redirect(url_for("subject"))

    @app.route('/subject/delete/<id>', methods=['GET', 'POST'])
    def delete_subject(id):

        newurl = baseUrl+url+'/'+str(id)

        # Rendu de la page de suppression
        if request.method == "GET":
            subject = requests.get(newurl).json()
            return render_template('quizz/subject/delete.html',menu_list=menu_list,subject=subject)

        # Soumission du formulaire
        if request.method == "POST":
            requests.delete(newurl)
            return redirect(url_for("subject")) 

    def checkQuestion(_question):

        _question = _question.replace("\'", "\"")
        _question = _question.replace("False", "\"False\"")
        _question = _question.replace("True", "\"True\"")
        _question = json.loads(_question)

        return _question

       
       

   
