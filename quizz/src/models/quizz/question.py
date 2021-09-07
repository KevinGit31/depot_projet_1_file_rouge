import json
import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from models.app  import db,ma
from models.quizz.question_answer import QuestionAnswer, QuestionAnswerSchema

class Question(db.Model):

    __tablename__ = 'question'
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(1024))

    # La collection de reponse
    answers =  db.relationship("QuestionAnswer", cascade="all, delete-orphan")

    def __init__(self,question):
        self.question = question

    def __str__(self) -> str:
        return json.dumps({ 'question' : self.question,"answers":self.answers})

# Question Schema
class QuestionSchema(ma.Schema):
    answers = ma.Nested(QuestionAnswerSchema(many=True))
    class Meta:
        fields=('id','question','answers')

