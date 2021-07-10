
import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from __init__  import db

from models.metedata import Metadata
from models.auth.user import User
from models.auth.role import Role
from models.auth.password import Password
from models.quizz.mode import Mode
from models.quizz.subject import Subject
from models.quizz.game import Game
from models.quizz.question import Question
from models.quizz.answer import Answer

if __name__ == "__main__":

    # Run this file directly to create the database tables.
    print ("Creating test database tables...") 
    db.create_all()
    print ("Done!")
