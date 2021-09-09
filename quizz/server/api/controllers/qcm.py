import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)
from functools import wraps
from flask import Blueprint,request,jsonify
from api.models import Qcm
from api import db
from api.controllers.question import questionAnswerToJson
from api.controllers import question
from api.controllers import token_required
from werkzeug.security import generate_password_hash
from api.models import Question
from api.models import QcmQuestion


SECRET_KEY="DevOps"

qcms = Blueprint('qcms',__name__)

@qcms.route('',methods=['GET'])
@token_required
def get_all_qcms(current_user):

    qcms = Qcm.query.all()

    output = []

    for qcm in qcms:
        qcm_data = {}
        qcm_data['id'] = qcm.id
        qcm_data['sujet'] = qcm.sujet
        qcm_data['description'] = qcm.description
        qcm_data['questions'] = qcmQuestionToJson(qcm)
        output.append(qcm_data)

    return jsonify({'qcms':output})

@qcms.route('/<id>',methods=['GET'])
@token_required
def get_one_qcm(current_user,id):

    if not current_user.admin:
        return jsonify({'message':'Impossible d\'exécuter cette fonction !'})

    qcm = Qcm.query.filter_by(id=id).first()

    if not qcm:
        return jsonify({'message': 'Aucun qcm trouvée !'})
    
    qcm_data = {}
    qcm_data['id'] = qcm.id
    qcm_data['sujet'] = qcm.sujet
    qcm_data['description'] = qcm.description
    qcm_data['questions'] = qcmQuestionToJson(qcm)

    return jsonify(qcm_data)

@qcms.route('',methods=['POST'])
@token_required
def create_qcm(current_user):

    if not current_user.admin:
        return jsonify({'message':'Impossible d\'exécuter cette fonction !'})

    data = request.get_json()

    questions = []

    for item in data['questions']:
        question = Question.query.filter_by(id=item['id']).first()
        q = QcmQuestion(question_id=question.id)
        questions.append(q)

    new_qcm = Qcm(sujet=data['sujet'],description=data['description'],questions=questions)
    db.session.add(new_qcm)
    db.session.commit()
    return jsonify({'message':'Nouvel qcm créé!'})

@qcms.route('/<id>',methods=['PUT'])
@token_required
def update_qcm(current_user,id):
    
    if not current_user.admin :
        return jsonify({'message': 'Impossible d\'exécuter cette fonction !'})

    data = request.get_json()
    
    qcm = Qcm.query.filter_by(id=id).first()

    if not qcm:
        return jsonify({'message': 'Aucun qcm trouvée !'})
    
    qcm.sujet=data['sujet']
    qcm.description=data['description']
    qcm.questions = [] 

    questions = []

    for item in data['questions']:
        question = Question.query.filter_by(id=item['id']).first()
        q = QcmQuestion(question_id=question.id)
        questions.append(q)
    qcm.questions=  questions
    db.session.commit()
    return jsonify({'message':'Le qcm a été modifier !'})

@qcms.route('/<id>',methods=['DELETE'])
@token_required
def delete_qcm(current_user,id):

    if not current_user.admin:
        return jsonify({'message':'Impossible d\'exécuter cette fonction !'})

    qcm = Qcm.query.filter_by(id=id).first()

    if not qcm:
        return jsonify({'message': 'Aucune qcm trouvée !'})

    db.session.delete(qcm)
    db.session.commit()
    return jsonify({'message': 'Le qcm a été supprimer !'})

def qcmQuestionToJson(qcm) :
    questions = []
    for item in qcm.questions:
        question = Question.query.filter_by(id=item.question_id).first()
        question_data = {}
        question_data['id'] = question.id
        question_data['text'] = question.text
        question_data['answers'] = questionAnswerToJson(question)
        questions.append(question_data)
    return  questions
