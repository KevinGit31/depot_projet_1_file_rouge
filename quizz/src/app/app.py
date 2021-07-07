from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)
# Init app
from models.auth import role


app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

# Database
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+os.path.join(basedir,'db.sqlite')
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://user.quizz:dru98eDFC90@localhost/db.quizz'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Init db
db = SQLAlchemy(app)

# Init ma
ma = Marshmallow(app)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/page_adduser", methods=["POST", "GET"])
def add_user():
    if request.method == "GET":
        # res = db.session.query(user).all()
        res1 = db.session.query(role).all()
        for res in res1:
            print(res.id + " " + res.name)
        return render_template("page_adduser.html")

    if request.method == "POST":
        firstname = request.form["nom"]
        lastname = request.form["prenom"]
        pseudo = request.form["prenom"]
        role_form = request.form["prenom"]
        return {
                "firstname": firstname,
                "lastname": lastname,
                "pseudo": pseudo,
                "role": role_form
            }


@app.route("/page_listuser", methods=["POST", "GET"])
def list_user():
    if request.method == "GET":
        return render_template("page_listuser.html")


# Run Server
if __name__ == '__main__':
    app.run(debug=True)
