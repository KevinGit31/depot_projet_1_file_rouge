import json
import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from models.app  import db,ma
from models.quizz.question import QuestionSchema

# La collection de reponse
class SubjectQuestion(db.Model):

    __tablename__ = 'subject_question'
    subject_id = db.Column(db.Integer, db.ForeignKey('subject.id'), primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), primary_key=True)
    
    question = db.relationship("Question")

    def __init__(self,question):
        self.question = question


# QuestionAnswer Schema
class SubjectQuestionSchema(ma.Schema):
    question = ma.Nested(QuestionSchema())
    class Meta:
        fields=('subject_id','question_id','question')