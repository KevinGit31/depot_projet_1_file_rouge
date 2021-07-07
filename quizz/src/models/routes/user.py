import os
import sys
import inspect
from flask import request,render_template

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)
# Init app
from models.auth import role
from app import db

def userroutes(app):

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
