import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)
from models.quizz.subject_question import SubjectQuestion, SubjectQuestionSchema
from models.quizz.mode import Mode, ModeSchema

from models.app  import db,ma

class Subject(db.Model):

    __tablename__ = 'subject'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(200))
        
    # Collection des parties
    #subjects = db.relationship("game")

    mode_id = db.Column(db.Integer, db.ForeignKey('mode.id'))
    mode = db.relationship("Mode")

    # La collection de question
    questions =  db.relationship("SubjectQuestion", cascade="all, delete-orphan")

    # Meta data
    #quizz_metadata_id = db.Column(db.Integer, db.ForeignKey('metadata.id'))
    #quizz_metadata = db.relationship("Metadata", back_populates="subject")

    def __init__(self,name,description,mode_id):
        self.name = name
        self.description = description
        self.mode_id=mode_id


# Subject Schema
class SubjectSchema(ma.Schema):
    questions = ma.Nested(SubjectQuestionSchema(many=True))
    mode = ma.Nested(ModeSchema())
    class Meta:
        fields=('id','name','description','mode_id','mode','questions')