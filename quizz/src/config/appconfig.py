# Cofiguration de la base de données dev
def app_config(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://user.quizz:dru98eDFC90@localhost/db.quizz'
    app.config['SQLALCHEMY_POOL_SIZE'] = 30
    app.config['SQLALCHEMY_POOL_TIMEOUT'] = 300

