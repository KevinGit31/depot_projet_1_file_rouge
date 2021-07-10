from flask import render_template

def configure_routes_answer(app):

   @app.route('/answer')
   def answer():
      
      # Liste des menus
      menu_list=[
         {"name":"Accueil","isActive":"","url":"index"},
         {"name":"Jouer","isActive":"","url":"game"},
         {"name":"Mode","isActive":"","url":"mode"},
         {"name":"Sujet","isActive":"","url":"subject"},
         {"name":"Question","isActive":"","url":"question"},
         {"name":"Réponse","isActive":"active","url":"answer"}
      ]

      return render_template('index.html',menu_list=menu_list )

  
       
       

   
