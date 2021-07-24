import os

import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from controllers.controller_answer import controller_answer
from controllers.controller_question import controller_question 
from routes.rt_answer import configure_routes_answer
from routes.rt_subject import configure_routes_subject
from routes.rt_mode import configure_routes_mode
from routes.rt_game import configure_routes_game
from routes.rt_question import configure_routes_question
from routes.routes import configure_routes
from api.__init__ import app

# Configuration des chemins vers les pages html
controller_answer(app)
controller_question(app)
configure_routes(app)
configure_routes_answer(app)
configure_routes_game(app)
configure_routes_mode(app)
configure_routes_question(app)
configure_routes_subject(app)



# Run Server
if __name__ == '__main__':
    app.run(debug=True)
