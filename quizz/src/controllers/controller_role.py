from flask import request
import json
import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)
from models.auth.role import Answer, AnswerSchema
from services.srv_role import all_answers

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