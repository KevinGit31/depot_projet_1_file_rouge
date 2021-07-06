import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from app.app  import db,ma

class Answer(db.Model):

    __tablename__ = 'answer'
    id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.String(1024))
    isAnswer = db.Column(db.Boolean)

    # Meta data
    quizz_metadata_id = db.Column(db.Integer, db.ForeignKey('metadata.id'))
    quizz_metadata = db.relationship("Metadata", back_populates="answer")

    def __init__(self,answer,isAnswer):
        self.answer = answer
        self.isAnswer = isAnswer

# Answer Schema
class AnswerSchema(ma.Schema):
    class Meta:
        fields=('id','answer','isAnswer')