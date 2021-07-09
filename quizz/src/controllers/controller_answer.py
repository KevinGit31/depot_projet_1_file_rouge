

from flask import request
import json
import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)
from models.quizz.answer import Answer, AnswerSchema
from services.srv_answer import add_answer

answer_schema = AnswerSchema()
answers_schema = AnswerSchema(many=True)


def controller_answer(app):

    @app.route('/answer', methods=['POST'])
    def answer_post():

        # Appel du service de traitement de l'ajout d'une réponse
        new_answer = add_answer(json.loads(request.get_data()))

        # Test sur le résultat
        if new_answer and json.loads(new_answer.data).get('id') != None:
            return new_answer, 200 #Success
        else:
            return 'Bad Request', 400 # Error