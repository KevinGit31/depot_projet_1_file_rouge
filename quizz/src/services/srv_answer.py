import os
import sys
import inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)
from models.quizz.answer import Answer,AnswerSchema
from app.app import db

answer_schema = AnswerSchema()
answers_schema = AnswerSchema(many=True)

# Ajouter une reponse
def add_answer(request):
    
    # Récupération des données
    _answer = request.get('answer')
    _isAnswer = request.get('isAnswer')

    # Création d'un objet réponse
    new_answer = Answer(_answer,_isAnswer)

    # Insertion dans la session de connexion courant
    db.session.add(new_answer)

    # Sauvegarde de la réponse
    db.session.commit()

    # Retour de la réponse sauvegarder
    return answer_schema.jsonify(new_answer)

# Mo

