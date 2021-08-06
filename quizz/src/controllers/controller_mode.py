

from flask import request
import json
import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)
from services.srv_mode import add_mode,get_mode,all_modes,delete_mode,update_mode

def controller_mode(app):

    @app.route('/api/v1/mode', methods=['GET'])
    def mode_all():

        # Appel du service de traitement de la récupération de toutes les modes
        allmode = all_modes()

        # Test sur le résultat
        if allmode:
            return allmode, 200 #Success
        else:
            return 'Bad Request', 400 # Error

    @app.route('/api/v1/mode/<id>', methods=['GET'])
    def mode_get(id):

        # Appel du service de traitement de la récupération d'une mode
        getmode = get_mode(id)

        # Test sur le résultat
        if getmode:
            return getmode, 200 #Success
        else:
            return 'Bad Request', 400 # Error

    @app.route('/api/v1/mode', methods=['POST'])
    def mode_post():

        # Appel du service de traitement de l'ajout d'une mode
        new_mode = add_mode(json.loads(request.get_data()))

        # Test sur le résultat
        if new_mode and json.loads(new_mode.data).get('id') != None:
            return new_mode, 200 #Success
        else:
            return 'Bad Request', 400 # Error

    @app.route('/api/v1/mode/<id>', methods=['PUT'])
    def mode_put(id):

        # Appel du service de traitement de modification d'une mode
        updatemode = update_mode(id,json.loads(request.get_data()))

        # Test sur le résultat
        if updatemode:
            return updatemode, 200 #Success
        else:
            return 'Bad Request', 400 # Error


    @app.route('/api/v1/mode/<id>', methods=['DELETE'])
    def mode_delete(id):

        # Appel du service de traitement de modification d'une mode
        deletemode = delete_mode(id)

        # Test sur le résultat
        if deletemode:
            return deletemode, 200 #Success
        else:
            return 'Bad Request', 400 # Error