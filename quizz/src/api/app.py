import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)
from controllers.controller_answer import controller_answer
from controllers.controller_user import controller_user
from controllers.controller_role import controller_role
from routes.routes import configure_routes
from routes.rt_user import configure_routes_user
from api.__init__ import app

controller_answer(app)
controller_user(app)
controller_role(app)
configure_routes_user(app)
configure_routes(app)

# Run Server
if __name__ == '__main__':
    app.run(debug=True)
