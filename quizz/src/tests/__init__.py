from flask import Flask

from app.init_helper import helper
from config.testconfig import tsconfig
# Init helper
app = Flask(__name__)

# Database
tsconfig(app)

# Init helper
helper(app)

