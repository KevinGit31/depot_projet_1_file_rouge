from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from models.init_helper import helper
from config.testconfig import tsconfig
from controllers.controller_answer import controller_answer
from controllers.controller_mode import controller_mode
from controllers.controller_game import controller_game
from controllers.controller_question import controller_question
from controllers.controller_subject import controller_subject

# Init helper
app = Flask(__name__)

# Database
tsconfig(app)

# Init helper
helper(app)

db = SQLAlchemy(app)
# Init ma
ma=Marshmallow(app)

controller_answer(app)
controller_question(app)
controller_subject(app)
controller_mode(app)
controller_game(app)



