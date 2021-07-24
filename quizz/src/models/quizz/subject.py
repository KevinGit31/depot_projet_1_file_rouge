import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from models.app  import db,ma

class Subject(db.Model):

    __tablename__ = 'subject'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(200))
        
    # Collection des parties
    #subjects = db.relationship("game")

    # La collection de question
    subject_question = db.Table('subject_question', db.metadata,
    db.Column('subject_id', db.Integer, db.ForeignKey('subject.id')),
    db.Column('question_id', db.Integer, db.ForeignKey('question.id')))
    questions = db.relationship("question",secondary=subject_question)

    # Meta data
    #quizz_metadata_id = db.Column(db.Integer, db.ForeignKey('metadata.id'))
    #quizz_metadata = db.relationship("Metadata", back_populates="subject")

    def __init__(self,name,description):
        self.name = name
        self.description = description


# Subject Schema
class SubjectSchema(ma.Schema):
    class Meta:
        fields=('id','name','description')