from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

def helper(app):
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Init db
    db = SQLAlchemy(app)

    # Init ma   
    ma = Marshmallow(app)

