import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)


from models.app import db,ma


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(100))
    lastname = db.Column(db.String(100))
    pseudo = db.Column(db.String(100))

    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))
    password_id = db.Column(db.Integer, db.ForeignKey('password.id'))
    password = db.relationship("Password", back_populates="user")

    games = db.relationship("game")

    # Meta data
    quizz_metadata_id = db.Column(db.Integer, db.ForeignKey('metadata.id'))
    quizz_metadata = db.relationship("Metadata", back_populates="user")

    def __init__(self, firstname, lastname, pseudo):
        self.firstname = firstname
        self.lastname = lastname
        self.pseudo = pseudo


# User Schema
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'firstname', 'lastname', 'pseudo')
