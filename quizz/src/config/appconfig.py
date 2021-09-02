# Cofiguration de la base de données dev
def app_config(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://user.quizz:dru98eDFC90@localhost/db.quizz'



