import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from models.quizz.answer import Answer
from models.auth.user import User
from models.auth.password import Password
from models.app  import db,ma

class Game(db.Model):

    __tablename__ = 'game'
    id = db.Column(db.Integer, primary_key=True)
    startDate = db.Column(db.DateTime)
    endDate = db.Column(db.DateTime)
    score = db.Column(db.Integer)

    subject_id = db.Column(db.Integer, db.ForeignKey('subject.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    # Meta data
    #quizz_metadata_id = db.Column(db.Integer, db.ForeignKey('metadata.id'))
    #quizz_metadata = db.relationship("Metadata", back_populates="game")
    def __init__(self,startDate,endDate,score):
        self.startDate = startDate
        self.endDate = endDate
        self.score=score

# Game Schema
class GameSchema(ma.Schema):
    class Meta:
        fields=('id','startDate','endDate','score','subject_id','user_id')