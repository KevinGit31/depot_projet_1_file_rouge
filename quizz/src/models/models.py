
import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from app.app  import dbg

from metedata import Metadata
from auth.user import User
from auth.role import Role
from auth.password import Password
from quizz.mode import Mode
from quizz.subject import Subject
from quizz.game import Game
from quizz.question import Question
from quizz.answer import Answer

if __name__ == "__main__":

    # Run this file directly to create the database tables.
    print ("Creating database tables...") 
    db.create_all()
    print ("Done!")
