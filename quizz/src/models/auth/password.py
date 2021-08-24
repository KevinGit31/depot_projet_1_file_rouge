import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from models.app import db,ma


class Password(db.Model):
    __tablename__ = 'password'
    id = db.Column(db.Integer, primary_key=True)
    pwd = db.Column(db.String(100))
    #user = db.relationship("User", back_populates="password", uselist=False)

    # Meta data
    #quizz_metadata_id = db.Column(db.Integer, db.ForeignKey('metadata.id'))
    #quizz_metadata = db.relationship("Metadata", back_populates="password")

    def __init__(self, pwd):
        self.pwd = pwd


# Password Schema
class PasswordSchema(ma.Schema):
    class Meta:
        fields = ('id', 'pwd')
