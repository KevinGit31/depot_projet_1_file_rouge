from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from models.init_helper import helper
from config.appconfig import app_config
import logging

# Init helper
app = Flask(__name__,
template_folder="../templates",
    static_folder="../static")

logging.basicConfig(filename='app.log', level=logging.DEBUG, format='%(asctime)s %(levelname)s %(name)s %('
                                                                    'threadName)s : %(message)s')

app.config['SECRET_KEY'] = 'thisissecret'

# Database
app_config(app)

# Init helper
helper(app)

db = SQLAlchemy(app)
# Init ma
ma=Marshmallow(app)


