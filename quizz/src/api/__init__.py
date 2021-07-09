from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from models.init_helper import helper
from config.appconfig import app_config
# Init helper
app = Flask(__name__,
template_folder="../templates",
    static_folder="../static")

# Database
app_config(app)

# Init helper
helper(app)

db = SQLAlchemy(app)
# Init ma
ma=Marshmallow(app)


