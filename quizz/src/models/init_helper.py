from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

def helper(app):
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Init db
def db(app):
    return SQLAlchemy(app)

# Init ma
def ma(app):
    return Marshmallow(app)

