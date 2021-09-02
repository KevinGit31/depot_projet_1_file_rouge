import inspect
import os
import sys

from flask import json

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from models.app import db, ma
from models.quizz.question_answer  import QuestionAnswer

class Answer(db.Model):

    __tablename__ = 'answer'
    id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.String(1024))

    #questions = db.relationship("QuestionAnswer", back_populates="answer")

    def __init__(self,answer):
        self.answer = answer
    
    def __str__(self) -> str:
        return json.dumps({ 'answer' : self.answer})
    
# Answer Schema
class AnswerSchema(ma.Schema):
    class Meta:
        fields=('id','answer')
