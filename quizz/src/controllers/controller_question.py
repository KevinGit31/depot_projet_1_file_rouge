

from flask import request
import json
import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)
from services.srv_question import add_question,get_question,all_questions,delete_question,update_question

def controller_question(app):

    @app.route('/api/v1/question', methods=['GET'])
    def question_all():

        # Appel du service de traitement de la récupération de toutes les questions
        allquestion = all_questions()

        # Test sur le résultat
        if allquestion:
            return allquestion, 200 #Success
        else:
            return 'Bad Request', 400 # Error

    @app.route('/api/v1/question/<id>', methods=['GET'])
    def question_get(id):

        # Appel du service de traitement de la récupération d'une question
        getquestion = get_question(id)

        # Test sur le résultat
        if getquestion:
            return getquestion, 200 #Success
        else:
            return 'Bad Request', 400 # Error

    @app.route('/api/v1/question', methods=['POST'])
    def question_post():

        # Appel du service de traitement de l'ajout d'une question
        new_question = add_question(json.loads(request.get_data()))

        # Test sur le résultat
        if new_question and json.loads(new_question.data).get('id') != None:
            return new_question, 200 #Success
        else:
            return 'Bad Request', 400 # Error

    @app.route('/api/v1/question/<id>', methods=['PUT'])
    def question_put(id):

        # Appel du service de traitement de modification d'une question
        updatequestion = update_question(id,json.loads(request.get_data()))

        # Test sur le résultat
        if updatequestion:
            return updatequestion, 200 #Success
        else:
            return 'Bad Request', 400 # Error


    @app.route('/api/v1/question/<id>', methods=['DELETE'])
    def question_delete(id):

        # Appel du service de traitement de modification d'une question
        deletequestion = delete_question(id)

        # Test sur le résultat
        if deletequestion:
            return deletequestion, 200 #Success
        else:
            return 'Bad Request', 400 # Error