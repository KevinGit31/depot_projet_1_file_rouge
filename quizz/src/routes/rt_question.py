from models.quizz.answer import AnswerSchema
import requests
import json
from flask import render_template, request, redirect, url_for
from config.env import baseUrl
answer_schema = AnswerSchema()

url = '/api/v1/question'
url_answer = '/api/v1/answer'

tableInfo = {
    "headers": [
        {"name": "question", "display": "Question", "class": ""},
        {"name": "answers", "display": "Nombre de réponses", "class": "br"}
    ],
    "actions": [
        {"icon": "fa-pen-square", "class": "", "url": "update_question"},
        {"icon": "fa-trash-alt", "class": "btn-icon-danger", "url": "delete_question"}
    ]
}

# Liste des menus
menu_list = [
    {"name": "Accueil", "isActive": "", "url": "home"},
    {"name": "Mode", "isActive": "", "url": "mode"},
    {"name": "Sujet", "isActive": "", "url": "subject"},
    {"name": "Question", "isActive": "active", "url": "question"},
    {"name": "Réponse", "isActive": "", "url": "answer"},
    {"name": "Utilisateur", "isActive": "", "url": "listuser"},
    {"name": "Se connecter", "isActive": "", "url": "login"},
    {"name": "Se déconnecter", "isActive": "", "url": "logout"}
]


def configure_routes_question(app):

    @app.route('/question')
    def question():

        rep_list = requests.get(baseUrl+url).json()

        rep_list = json.loads(rep_list)

        answers_list = requests.get(baseUrl+url_answer).json()
        answers_list = json.loads(answers_list)

        return render_template('quizz/question/index.html',
                               tableInfo=tableInfo,
                               menu_list=menu_list,
                               rep_list=rep_list,
                            answers_list=answers_list)

    @app.route('/question/create', methods=['GET', 'POST'])
    def create_question():

        # Rendu de la page de création
        if request.method == "GET":

            # Création de question temporaire
            answers = []

            question = {
                'question': '',  # request.form.get('question'),
                'answers': answers
            }
            return render_template('quizz/question/create.html',
                                   menu_list=menu_list,
                                   question=question,
                                   select_answer='True')

        # Soumission du formulaire
        if request.method == "POST":

            answers = request.form.get('answers')
            # Modificatoin de la chaine de string pour obtenir un format json

            answers = answers.replace("\'", "\"")
            answers = json.loads(answers)
            print(answers)

            # Action pour ajouter une mauvaise réponse
            if request.form.get('btn-answer') == "ADD_FALSE":

                #str_answer = request.form.get('answer').strip()
                _answer = request.form.get('answer') 
                _answer = checkIfAnswerExist(_answer)
                str_answer =_answer

                if str_answer['answer'] != "":

                    answer = {
                        'answer':str_answer,
                        'isAnswer': ''
                    }

                    # Ajout de la nouvelle réponse
                    answers.append(answer)

                # answers.append(answer)
                question = {
                    'question': request.form.get('question'),
                    'answers': answers
                }
                return render_template('quizz/question/create.html', menu_list=menu_list, question=question,
                                       select_answer='True')

            # Action pour ajouter une bonne réponse
            if request.form.get('btn-answer') == "ADD_TRUE":

                # str_answer = request.form.get('answer').strip()
                _answer = request.form.get('answer') 
                _answer = checkIfAnswerExist(_answer)
                str_answer =_answer

                
                if str_answer['answer'] != "":

                    answer = {
                        'answer': str_answer,
                        'isAnswer': 'True'
                    }

                    # Ajout de la nouvelle réponse
                    answers.append(answer)

                # answers.append(answer)
                question = {
                    'question': request.form.get('question'),
                    'answers': answers
                }
                return render_template('quizz/question/create.html', menu_list=menu_list, question=question,
                                       select_answer='True')

            # Action pour supprimer une réponse
            if request.form.get('btn-close'):

                # answers = del answers[2]

                index_answer = request.form.get('btn-close')
                index_answer = int(index_answer) - 1

                # Supprimer une réponse
                answers.pop(index_answer)

                # answers.append(answer)
                question = {
                    'question': request.form.get('question'),
                    'answers': answers
                }
                return render_template('quizz/question/create.html', menu_list=menu_list, question=question,select_answer='True')

           
            # Sélectionner une réponse
            str_question = request.form.get('question').strip()
            if request.form.get('btn-select') == "SELECT_ANSWER":

                answers_list = requests.get(baseUrl+url_answer).json()
                answers_list = json.loads(answers_list)

                question = {
                    'question': str_question,
                    'answers': answers
                }
                return render_template('quizz/question/create.html', 
                menu_list=menu_list, 
                question=question,
                select_answer='False',
                answers_list=answers_list)
            
            # Sélectionner une réponse 
            if request.form.get('btn-select') == "INPUT_ANSWER":

                question = {
                    'question': str_question,
                    'answers': answers
                }
                return render_template('quizz/question/create.html', 
                menu_list=menu_list, 
                question=question,
                select_answer='True')
           
            # Action si la question est un champ vide
            if str_question == "":
                # answers.append(answer)
                question = {
                    'question': str_question,
                    'answers': answers
                }
                return render_template('quizz/question/create.html', menu_list=menu_list, question=question,
                                       select_answer='True')

            question = {
                'question': str_question,
                'answers': answers
            }

            requests.post(baseUrl+url, json.dumps(question))
            return redirect(url_for("question"))

    @app.route('/question/update/<id>', methods=['GET', 'POST'])
    def update_question(id):

        # Mise à jour de l'url
        newurl = baseUrl+url+'/'+str(id)
        
        # Rendu de la page de création
        if request.method == "GET":

            question = requests.get(newurl).json()

            _answers = []
            for answer in question['answers']:
                newurl = baseUrl+url_answer+'/'+str(answer['answer_id'])
                _answer = requests.get(newurl).json()
                print (answer)
                print (_answer)
                if(str(answer['isAnswer'])=='False') :
                    str_isanswer = ''
                else  :  
                    str_isanswer = str(answer['isAnswer'])
                newanswer = {
                        'answer': _answer,
                        'isAnswer': str_isanswer
                }
                _answers.append(newanswer)

            question['answers'] = _answers

            return render_template('quizz/question/update.html',
                                   menu_list=menu_list,
                                   question=question,
                                   select_answer='True')

        answers = request.form.get('answers')
        answers = answers.replace("\'", "\"")
        answers = json.loads(answers)

        # Action pour ajouter une mauvaise réponse
        if request.form.get('btn-answer') == "ADD_FALSE":

            str_answer = request.form.get('answer').strip()
            if str_answer != "":

                answer = {
                        'answer': {
                            'answer': str_answer
                        },
                        'isAnswer': ''
                    }

                    # Ajout de la nouvelle réponse
                answers.append(answer)

                # answers.append(answer)
            question = {
                'question': request.form.get('question'),
                'answers': answers
            }
            return render_template('quizz/question/update.html', menu_list=menu_list, question=question,
                                       select_answer='True')

        # Action pour ajouter une bonne réponse
        if request.form.get('btn-answer') == "ADD_TRUE":

            str_answer = request.form.get('answer').strip()
            if str_answer != "":

                answer = {
                        'answer': {
                            'answer': str_answer
                        },
                        'isAnswer': 'True'
                    }

                    # Ajout de la nouvelle réponse
                answers.append(answer)

                # answers.append(answer)
            question = {
                'question': request.form.get('question'),
                'answers': answers
            }
            return render_template('quizz/question/update.html', menu_list=menu_list, question=question,
                                       select_answer='True')

        # Action pour supprimer une réponse
        if request.form.get('btn-close'):

            # answers = del answers[2]

            index_answer = request.form.get('btn-close')
            index_answer = int(index_answer) - 1

            # Supprimer une réponse
            answers.pop(index_answer)

            # answers.append(answer)
            question = {
                'question': request.form.get('question'),
                'answers': answers
            }
            return render_template('quizz/question/update.html', menu_list=menu_list, question=question,select_answer='True')

        
        # Sélectionner une réponse
        str_question = request.form.get('question').strip()
        if request.form.get('btn-select') == "SELECT_ANSWER":

            answers_list = requests.get(baseUrl+url_answer).json()
            answers_list = json.loads(answers_list)

            question = {
                    'question': str_question,
                    'answers': answers
                }
            return render_template('quizz/question/update.html', 
            menu_list=menu_list, 
            question=question,
            select_answer='False',
            answers_list=answers_list)

        # Sélectionner une réponse 
        if request.form.get('btn-select') == "INPUT_ANSWER":

            question = {
                    'question': str_question,
                    'answers': answers
                }
            return render_template('quizz/question/update.html', 
                menu_list=menu_list, 
                question=question,
                select_answer='True')

        # Action si la question est un champ vide
        if str_question == "":
            # answers.append(answer)
            question = {
                'question': str_question,
                'answers': answers
            }
            return render_template('quizz/question/update.html', menu_list=menu_list, question=question,
                                       select_answer='True')

        question = {
            'question': str_question,
            'answers': answers
        }

        requests.put(newurl, json.dumps(question))
        return redirect(url_for("question"))

    @app.route('/question/delete/<id>', methods=['GET', 'POST'])
    def delete_question(id):
        # Mise à jour de l'url
        newurl = baseUrl+url+'/'+str(id)

        # Rendu de la page de suppression
        if request.method == "GET":
            question = requests.get(newurl).json()
            return render_template('quizz/question/delete.html',menu_list=menu_list,question=question)

        # Soumission du formulaire
        if request.method == "POST":
            requests.delete(newurl)
            return redirect(url_for("question")) 


    def checkIfAnswerExist(_answer):

        if "answer" in json.dumps(_answer): 
            _answer = _answer.replace("\'", "\"")
            _answer =json.loads(_answer)

            if _answer["id"] > 0 :
                return _answer
        _answer = {
            'answer': _answer
        }
        return _answer

