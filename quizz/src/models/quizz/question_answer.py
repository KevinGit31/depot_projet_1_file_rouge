import json
import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from models.app  import db,ma

# La collection de reponse
class QuestionAnswer(db.Model):

    __tablename__ = 'question_answer'
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), primary_key=True)
    answer_id = db.Column(db.Integer, db.ForeignKey('answer.id'), primary_key=True)
    isAnswer = db.Column(db.Boolean)
    
    answer = db.relationship("Answer")

    def __init__(self,isAnswer,answer):
        self.isAnswer =isAnswer
        self.answer=answer


# QuestionAnswer Schema
class QuestionAnswerSchema(ma.Schema):

    class Meta:
        fields=('question_id','answer_id','isAnswer')