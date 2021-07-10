import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from app.app import db,ma


class Mode(db.Model):
    __tablename__ = 'mode'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(200))
    nbrQ = db.Column(db.Integer)
    img = db.Column(db.LargeBinary)

    # La collection de sujet
    mode_subject = db.Table('mode_subject', db.metadata,
                            db.Column('mode_id', db.Integer, db.ForeignKey('mode.id')),
                            db.Column('subject_id', db.Integer, db.ForeignKey('subject.id')))
    subjects = db.relationship("subject", secondary=mode_subject)

    # Meta data
    quizz_metadata_id = db.Column(db.Integer, db.ForeignKey('metadata.id'))
    quizz_metadata = db.relationship("Metadata", back_populates="mode")

    def __init__(self, name, description, nbrQ):
        self.name = name
        self.description = description
        self.nbrQ = nbrQ


# Mode Schema
class ModeSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'description', 'nbrQ')
