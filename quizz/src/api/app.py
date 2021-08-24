import os

import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from controllers.controller_answer import controller_answer

from controllers.controller_user import controller_user
from controllers.controller_role import controller_role

from controllers.controller_question import controller_question 
from controllers.controller_subject import controller_subject 
from controllers.controller_mode import controller_mode
from controllers.controller_game import controller_game

from routes.rt_answer import configure_routes_answer
from routes.rt_subject import configure_routes_subject
from routes.rt_mode import configure_routes_mode
from routes.rt_home import configure_routes_home
from routes.rt_game import configure_routes_game
from routes.rt_question import configure_routes_question
from routes.rt_subject import configure_routes_subject

from routes.routes import configure_routes
from routes.rt_user import configure_routes_user
from routes.rt_login import configure_routes_login
from api.__init__ import app


controller_user(app)
controller_role(app)
configure_routes_user(app)
configure_routes_login(app)
configure_routes(app)

# Configuration des chemins vers les pages html
controller_answer(app)
controller_question(app)
controller_mode(app)
controller_subject(app)
controller_game(app)

configure_routes_answer(app)
configure_routes_home(app)
configure_routes_game(app)
configure_routes_mode(app)
configure_routes_question(app)
configure_routes_subject(app)

# Run Server
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
