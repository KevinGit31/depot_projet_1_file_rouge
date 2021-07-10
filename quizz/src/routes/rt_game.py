from flask import render_template

def configure_routes_game(app):

   @app.route('/game')
   def game():
      
      # Liste des menus
      menu_list=[
         {"name":"Accueil","isActive":"","url":"index"},
         {"name":"Jouer","isActive":"active","url":"game"},
         {"name":"Mode","isActive":"","url":"mode"},
         {"name":"Sujet","isActive":"","url":"subject"},
         {"name":"Question","isActive":"","url":"question"},
         {"name":"Réponse","isActive":"","url":"answer"}
      ]

      return render_template('index.html',menu_list=menu_list )

  
       
       

   
