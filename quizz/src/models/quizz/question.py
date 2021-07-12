import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from models.app  import db,ma

class Question(db.Model):

    __tablename__ = 'question'
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(1024))

    # La collection de reponse
    question_answer = db.Table('question_answer', db.metadata,
    db.Column('question_id', db.Integer, db.ForeignKey('question.id')),
    db.Column('answer_id', db.Integer, db.ForeignKey('answer.id')))
    answers = db.relationship("answer",secondary=question_answer)

    # Meta data
    quizz_metadata_id = db.Column(db.Integer, db.ForeignKey('metadata.id'))
    quizz_metadata = db.relationship("Metadata", back_populates="question")

    def __init__(self,question):
        self.question = question

# Question Schema
class QuestionSchema(ma.Schema):
    class Meta:
        fields=('id','question')