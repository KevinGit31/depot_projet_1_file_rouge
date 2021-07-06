import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from app.app  import db,ma

class Metadata(db.Model):

    # We always need an id
    id = db.Column(db.Integer, primary_key=True)
    createBy = db.Column(db.String(100))
    createDate = db.Column(db.DateTime)
    updateBy = db.Column(db.String(100))
    updateDate = db.Column(db.DateTime)

    role = db.relationship("Role", back_populates="metadata", uselist=False)
    user = db.relationship("User", back_populates="metadata", uselist=False)
    password = db.relationship("Password", back_populates="metadata", uselist=False)
    mode = db.relationship("Mode", back_populates="metadata", uselist=False)
    subject = db.relationship("Subject", back_populates="metadata", uselist=False)

    def __init__(self,createBy,createDate,updateBy,updateDate):
        self.createBy = createBy
        self.createDate = createDate
        self.updateBy = updateBy
        self.updateDate = updateDate

# Metadata Schema
class MetadataSchema(ma.Schema):
    class Meta:
        fields=('id','createBy','createDate','updateBy','updateDate')
