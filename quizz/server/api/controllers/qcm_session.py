from quizz.server.api.models import Question, QuestionAnswer
from flask import Blueprint, request, jsonify
from api.models import Answer, User
from api.models import QcmSessionAnswer
from werkzeug.security import generate_password_hash
from api.controllers import token_required
from api import db
from api.models import QcmSession
from functools import wraps
import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(
    inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)


SECRET_KEY = "DevOps"

qcm_sessions = Blueprint('qcm_sessions', __name__)


@qcm_sessions.route('', methods=['GET'])
@token_required
def get_all_qcm_sessions(current_user):

    if not current_user.admin:
        qcm_sessions = QcmSession.query.filter_by(user_id=current_user.id).first()
    else:
        qcm_sessions = QcmSession.query.all()

    output = []

    for qcm_session in qcm_sessions:
        qcm_session_data = {}
        qcm_session_data['id'] = qcm_session.id
        qcm_session_data['score'] = qcm_session.score
        qcm_session_data['user'] = qcm_sessionUserToJson(qcm_session.user_id)
        qcm_session_data['qcms'] = qcm_sessionAnswerToJson(qcm_session)
        output.append(qcm_session_data)

    return jsonify(output)


@qcm_sessions.route('/<id>', methods=['GET'])
@token_required
def get_one_qcm_session(current_user, id):

    if not current_user.admin:
        qcm_session = QcmSession.query.filter_by(user_id=current_user.id,id=id).first()
    else:
        qcm_session = QcmSession.query.filter_by(id=id).first()

    if not qcm_session:
        return jsonify({'message': 'Aucun qcm_session trouvée !'})

    qcm_session_data = {}
    qcm_session_data['id'] = qcm_session.id
    qcm_session_data['score'] = qcm_session.score
    qcm_session_data['user'] = qcm_sessionUserToJson(qcm_session.user_id)
    qcm_session_data['qcms'] = qcm_sessionAnswerToJson(qcm_session)

    return jsonify(qcm_session_data)


@qcm_sessions.route('', methods=['POST'])
@token_required
def create_qcm_session(current_user):

    data = request.get_json()

    answers = []
    count = 0;
    for item1 in data['questions']:
        addCount=True
        for item2 in item1['answers']:
            
            a = QcmSessionAnswer(
                 qcm_id=data["qcm_id"],
                 question_id=item1["question_id"],
                 answer_id=item2["answer_id"],
                 isTrue=item2["isTrue"]
                 )
            R = QuestionAnswer.query.filter_by(answer_id=item2["answer_id"],question_id=item1["question_id"]).first()
            if item2["isTrue"]!=R.isTrue :
                addCount=False
       
            answers.append(a)

        if addCount :
            count = count+1;

        
    # calcule du score
    if len(data['questions']) == 0 :
        score = 0
    else:
        score = count*100/len(data['questions'])

    new_qcm_session = QcmSession(user_id=current_user.id, answers=answers,score=score)       

    db.session.add(new_qcm_session)
    db.session.commit()
    return jsonify({'message': 'Nouvel qcm_session créé!'})

@qcm_sessions.route('/<id>', methods=['DELETE'])
@token_required
def delete_qcm_session(current_user, id):

    if not current_user.admin:
        return jsonify({'message': 'Impossible d\'exécuter cette fonction !'})

    qcm_session = QcmSession.query.filter_by(id=id).first()

    if not qcm_session:
        return jsonify({'message': 'Aucun qcm_session trouvée !'})

    db.session.delete(qcm_session)
    db.session.commit()
    return jsonify({'message': 'Le qcm_session a été supprimer !'})


def qcm_sessionAnswerToJson(qcm_session):
   
    qcms = []
    for item1 in qcm_session.answers:
        addQ= True
        for item2 in qcms:
            if item2["qcm_id"]==item1.qcm_id:
                addQ= False
                break
        if addQ :
            qcm= {}
            qcm["qcm_id"] = item1.qcm_id
            qcms.append(qcm)
    
    for item1 in qcms:
        questions = []
        for item2 in qcm_session.answers:
            if item1["qcm_id"] == item2.qcm_id :
                addQ= True
                for item3 in questions:
                    if item3["question_id"]==item2.question_id:
                        addQ= False
                        break
                if addQ :
                    question= {}
                    question["question_id"] = item2.question_id
                    questions.append(question)
        item1["questions"]=questions

    for item1 in qcms:
        for item2 in item1 ["questions"]:
            answers = []
            for item3 in qcm_session.answers:
                if item2["question_id"] == item3.question_id :
                    addQ= True
                    for item4 in answers:
                        if item4["answer_id"]==item3.answer_id:
                            addQ= False
                            break
                    if addQ :
                        _answer = Answer.query.filter_by(id=item3.answer_id).first()
                        _questionAnswer = QuestionAnswer.query.filter_by(question_id=item3.question_id,answer_id=item3.answer_id).first()
                        answer= {}
                        answer["answer_id"] = item3.answer_id
                        answer['text'] = _answer.text
                        answer['response'] = item3.isTrue
                        answer['isTrue'] = _questionAnswer.isTrue
                        answers.append(answer)
            item2["answers"]=answers

    return  qcms

def qcm_sessionUserToJson(user_id):

    user = User.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({'message': 'Aucun utilisateur trouvé !'})

    user_data = {}
    user_data['name'] = user.name
    user_data['admin'] = user.admin
    user_data['email'] = user.email

    return user_data
