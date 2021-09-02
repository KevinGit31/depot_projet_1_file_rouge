import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from models.app  import db


from models.metadata import Metadata
from models.auth.user import User
from models.auth.role import Role
from models.auth.password import Password
from models.quizz.mode import Mode
from models.quizz.subject import Subject
from models.quizz.game import Game
from models.quizz.question import Question
from models.quizz.answer import Answer


def add_role_in_bd():
    print("Insert data in table role...")
    super_user = Role(id='', name='super-user')
    admin = Role(id='', name='admin')
    user = Role(id='', name='user')
    db.session.add(super_user)
    db.session.add(admin)
    db.session.add(user)
    db.session.commit()
    print("db.session.commit()")
