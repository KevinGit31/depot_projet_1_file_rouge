from enum import unique
from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150),unique=True)
    name = db.Column(db.String(150))
    password = db.Column(db.String(1024))
    admin = db.Column(db.Boolean)
    qcm_sessions = db.relationship('QcmSession')

class QcmSession(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer)
    answers = db.relationship('QcmSessionAnswer', cascade="all, delete-orphan")
    user_id=db.Column(db.Integer,db.ForeignKey('user.id'))

class QcmSessionAnswer(db.Model):
    qcm_session_id = db.Column(db.Integer, db.ForeignKey('qcm_session.id'), primary_key=True)
    qcm_id = db.Column(db.Integer, db.ForeignKey('qcm.id'), primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), primary_key=True)
    answer_id = db.Column(db.Integer, db.ForeignKey('answer.id'), primary_key=True)
    isTrue = db.Column(db.Boolean)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(150), unique=True)
    complete = db.Column(db.Boolean)
    user_id = db.Column(db.Integer)

class Qcm(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sujet = db.Column(db.String(150), unique=True)
    description = db.Column(db.String(255))
    questions = db.relationship('QcmQuestion', cascade="all, delete-orphan")

class QcmQuestion(db.Model):
    qcm_id = db.Column(db.Integer, db.ForeignKey('qcm.id'), primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), primary_key=True)

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(150), unique=True)
    answers = db.relationship('QuestionAnswer', cascade="all, delete-orphan")

class QuestionAnswer(db.Model):
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), primary_key=True)
    answer_id = db.Column(db.Integer, db.ForeignKey('answer.id'), primary_key=True)
    isTrue = db.Column(db.Boolean,default=False)

class Answer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(150), unique=True)

