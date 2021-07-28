import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)
from models.app import db,ma


class Role(db.Model):
    __tablename__ = 'role'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    user = db.relationship("User")

    # Meta data
    #quizz_metadata_id = db.Column(db.Integer, db.ForeignKey('metadata.id'))
    #quizz_metadata = db.relationship("Metadata", back_populates="role")

    def __init__(self, name):
        self.name = name


# Role Schema
class RoleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name')
