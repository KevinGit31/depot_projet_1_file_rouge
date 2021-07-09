import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)
from controllers.controller_answer import controller_answer
from routes.routes import configure_routes
from api.__init__ import app

controller_answer(app)
configure_routes(app)

# Run Server
if __name__ == '__main__':
    app.run(debug=True)
