

from flask import Flask

import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)

from routes.routes import configure_routes
from config.appconfig import app_config
from config.testconfig import tsconfig
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from models.init_helper import helper,db,ma

# Init app
app = Flask(__name__)

# Database
app_config(app)
#tsconfig(app)

# Init helper
helper(app)

db = SQLAlchemy(app)
# Init ma
ma=Marshmallow(app)

configure_routes(app)

# Run Server
if __name__ == '__main__':
    app.run(debug=True)
