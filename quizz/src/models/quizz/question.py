import json
import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from models.quizz.answer import Answer,AnswerSchema

from models.app  import db,ma

class Question(db.Model):

    __tablename__ = 'question'
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(1024))

    # La collection de reponse
    question_answer = db.Table('question_answer', db.metadata,
    db.Column('question_id', db.Integer, db.ForeignKey('question.id')),
    db.Column('answer_id', db.Integer, db.ForeignKey('answer.id')))
    answers = db.relationship("Answer",secondary=question_answer)

    # Meta data
    #quizz_metadata_id = db.Column(db.Integer, db.ForeignKey('metadata.id'))
    #quizz_metadata = db.relationship("Metadata", back_populates="question")

    def __init__(self,question):
        self.question = question

    def __str__(self) -> str:
        return json.dumps({ 'question' : self.question,"answers":self.answers})

# Question Schema
class QuestionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Question

    answers = ma.auto_field()
