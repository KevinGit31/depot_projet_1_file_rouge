# -*- coding: utf-8 -*-
import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)
from functools import wraps
from flask import Blueprint,request,jsonify
from api.models import Question
from api import db
from api.controllers import token_required
from werkzeug.security import generate_password_hash
from api.models import Answer
from api.models import QuestionAnswer
import logging
logger = logging.getLogger('question')

SECRET_KEY="DevOps"

questions = Blueprint('questions',__name__)

@questions.route('',methods=['GET'])
@token_required
def get_all_questions(current_user):
    logger.info('Obtenir des questions!')
    if not current_user.admin:
        logger.error('Impossible d\'exécuter cette fonction !')
        return jsonify({'message':'Impossible d\'exécuter cette fonction !'})

    questions = Question.query.order_by(Question.text).all()

    output = []

    for question in questions:
        question_data = {}
        question_data['id'] = question.id
        question_data['text'] = question.text
        question_data['answers'] = questionAnswerToJson(question)
        output.append(question_data)

    return jsonify(output)

@questions.route('/<id>',methods=['GET'])
@token_required
def get_one_question(current_user,id):

    if not current_user.admin:
        logger.error('Impossible d\'exécuter cette fonction !')
        return jsonify({'message':'Impossible d\'exécuter cette fonction !'})

    question = Question.query.filter_by(id=id).first()

    if not question:
        logger.error('Aucune question trouvée !')
        return jsonify({'message': 'Aucune question trouvée !'})
    
    question_data = {}
    question_data['id'] = question.id
    question_data['text'] = question.text
    question_data['answers'] = questionAnswerToJson(question)

    return jsonify(question_data)

@questions.route('',methods=['POST'])
@token_required
def create_question(current_user):

    if not current_user.admin:
        logger.error('Impossible d\'exécuter cette fonction !')
        return jsonify({'message':'Impossible d\'exécuter cette fonction !'})

    data = request.get_json()

    answers = []

    for item in data['answers']:
    
        answer = Answer.query.filter_by(text=item['text']).first()

        if not answer :
            answer = Answer(text=item['text'])
            db.session.add(answer)
            db.session.commit()

        a = QuestionAnswer(answer_id=answer.id)
        answers.append(a)

    new_question = Question(text=data['text'],answers=answers)
    db.session.add(new_question)
    db.session.commit()
    logger.info('Nouvelle question créé!')
    return jsonify({'message':'Nouvelle question créé!'})

@questions.route('/<id>',methods=['PUT'])
@token_required
def update_question(current_user,id):
    
    if not current_user.admin :
        logger.error('Impossible d\'exécuter cette fonction !')
        return jsonify({'message': 'Impossible d\'exécuter cette fonction !'})

    data = request.get_json()
    
    question = Question.query.filter_by(id=id).first()

    if not question:
        logger.error('Aucune question trouvée !')
        return jsonify({'message': 'Aucune question trouvée !'})
    
    question.text = data['text']
    question.answers = [] 

    answers = []
    for item in data['answers']:
    
        answer = Answer.query.filter_by(text=item['text']).first()

        if not answer :
            answer = Answer(text=item['text'])
            db.session.add(answer)
            db.session.commit()

        a = QuestionAnswer(answer_id=answer.id,isTrue=item['isTrue'])
        answers.append(a)
    question.answers =  answers

    db.session.commit()
    logger.info('La question a été modifiée !')
    return jsonify({'message':'La question a été modifiée !'})

@questions.route('/<id>',methods=['DELETE'])
@token_required
def delete_question(current_user,id):

    if not current_user.admin:
        logger.error('Impossible d\'exécuter cette fonction !')
        return jsonify({'message':'Impossible d\'exécuter cette fonction !'})

    question = Question.query.filter_by(id=id).first()

    if not question:
        logger.error('Aucune question trouvée !')
        return jsonify({'message': 'Aucune question trouvée !'})

    db.session.delete(question)
    db.session.commit()
    logger.info('La question a été supprimée !')
    return jsonify({'message': 'La question a été supprimée !'})


def questionAnswerToJson(question) :
    answers = []
    for item in question.answers:
        answer = Answer.query.filter_by(id=item.answer_id).first()
        answer_data = {}
        answer_data['id'] = answer.id
        answer_data['text'] = answer.text
        answer_data['isTrue'] = item.isTrue
        answers.append(answer_data)
    return  answers
