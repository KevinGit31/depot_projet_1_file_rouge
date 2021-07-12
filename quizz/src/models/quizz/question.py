import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from models.app  import db,ma
from models.quizz.question_answer  import QuestionAnswer

class Question(db.Model):

    __tablename__ = 'question'
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(1024))

    # La collection de reponse
    answers = db.relationship("QuestionAnswer")

    def __init__(self,question):
        self.question = question

# Question Schema
class QuestionSchema(ma.Schema):
    class Meta:
        fields=('id','question')