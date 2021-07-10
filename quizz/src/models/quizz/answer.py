import inspect
import os
import sys

from flask import json

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from models.app import db, ma


class Answer(db.Model):

    __tablename__ = 'answer'
    id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.String(1024))
    isAnswer = db.Column(db.Boolean)

    # Meta data
    #quizz_metadata_id = db.Column(db.Integer, db.ForeignKey('metadata.id'))
    #quizz_metadata = db.relationship("Metadata", back_populates="answer")

    def __init__(self,answer,isAnswer):
        self.answer = answer
        self.isAnswer = isAnswer
    
    def __str__(self) -> str:
        return json.dumps({ 'answer' : self.answer,"isAnswer":self.isAnswer})
    
    


# Answer Schema
class AnswerSchema(ma.Schema):
    class Meta:
        fields=('id','answer','isAnswer')
