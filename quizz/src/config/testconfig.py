# Configuration de la base de données de test
def tsconfig(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://test.user.quizz:dtu896DCYUdf@localhost/test.db.quizz'