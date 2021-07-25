

from flask import request
import json
import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)
from services.srv_subject import add_subject,get_subject,all_subjects,delete_subject,update_subject

def controller_subject(app):

    @app.route('/api/v1/subject', methods=['GET'])
    def subject_all():

        # Appel du service de traitement de la récupération de toutes les subjects
        allsubject = all_subjects()

        # Test sur le résultat
        if allsubject:
            return allsubject, 200 #Success
        else:
            return 'Bad Request', 400 # Error

    @app.route('/api/v1/subject/<id>', methods=['GET'])
    def subject_get(id):

        # Appel du service de traitement de la récupération d'une subject
        getsubject = get_subject(id)

        # Test sur le résultat
        if getsubject:
            return getsubject, 200 #Success
        else:
            return 'Bad Request', 400 # Error

    @app.route('/api/v1/subject', methods=['POST'])
    def subject_post():

        # Appel du service de traitement de l'ajout d'une subject
        new_subject = add_subject(json.loads(request.get_data()))

        # Test sur le résultat
        if new_subject and json.loads(new_subject.data).get('id') != None:
            return new_subject, 200 #Success
        else:
            return 'Bad Request', 400 # Error

    @app.route('/api/v1/subject/<id>', methods=['PUT'])
    def subject_put(id):

        # Appel du service de traitement de modification d'une subject
        updatesubject = update_subject(id,json.loads(request.get_data()))

        # Test sur le résultat
        if updatesubject:
            return updatesubject, 200 #Success
        else:
            return 'Bad Request', 400 # Error


    @app.route('/api/v1/subject/<id>', methods=['DELETE'])
    def subject_delete(id):

        # Appel du service de traitement de modification d'une subject
        deletesubject = delete_subject(id)

        # Test sur le résultat
        if deletesubject:
            return deletesubject, 200 #Success
        else:
            return 'Bad Request', 400 # Error