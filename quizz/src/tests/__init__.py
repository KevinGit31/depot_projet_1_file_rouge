from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from app.init_helper import helper
from config.testconfig import tsconfig
# Init helper
app = Flask(__name__)

# Database
tsconfig(app)

# Init helper
helper(app)

db = SQLAlchemy(app)
# Init ma
ma=Marshmallow(app)


