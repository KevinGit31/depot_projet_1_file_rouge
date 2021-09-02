

from flask import request
import json
import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)
from models.quizz.answer import Answer, AnswerSchema
from services.srv_answer import add_answer,get_answer,all_answers,delete_answer,update_answer

answer_schema = AnswerSchema()
answers_schema = AnswerSchema(many=True)


def controller_answer(app):

    @app.route('/api/v1/answer', methods=['GET'])
    def answer_all():

        # Appel du service de traitement de la récupération de toutes les réponses
        allanswer = all_answers()

        # Test sur le résultat
        if allanswer:
            return allanswer, 200 #Success
        else:
            return 'Bad Request', 400 # Error

    @app.route('/api/v1/answer/<id>', methods=['GET'])
    def answer_get(id):

        # Appel du service de traitement de la récupération d'une réponse
        getanswer = get_answer(id)

        # Test sur le résultat
        if getanswer:
            return getanswer, 200 #Success
        else:
            return 'Bad Request', 400 # Error

    @app.route('/api/v1/answer', methods=['POST'])
    def answer_post():

        # Appel du service de traitement de l'ajout d'une réponse
        new_answer = add_answer(json.loads(request.get_data()))

        # Test sur le résultat
        if new_answer and json.loads(new_answer.data).get('id') != None:
            return new_answer, 200 #Success
        else:
            return 'Bad Request', 400 # Error

    @app.route('/api/v1/answer/<id>', methods=['PUT'])
    def answer_put(id):

        # Appel du service de traitement de modification d'une réponse
        updateanswer = update_answer(id,json.loads(request.get_data()))

        # Test sur le résultat
        if updateanswer:
            return updateanswer, 200 #Success
        else:
            return 'Bad Request', 400 # Error


    @app.route('/api/v1/answer/<id>', methods=['DELETE'])
    def answer_delete(id):

        # Appel du service de traitement de modification d'une réponse
        deleteanswer = delete_answer(id)

        # Test sur le résultat
        if deleteanswer:
            return deleteanswer, 200 #Success
        else:
            return 'Bad Request', 400 # Error