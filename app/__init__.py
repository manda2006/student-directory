from dotenv import load_dotenv
load_dotenv()

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate  # ✅ Ajout de Flask-Migrate
from flask_cors import CORS
from app.config import Configuration

db = SQLAlchemy()
migrate = Migrate()  # ✅ Instance de Flask-Migrate

def create_app():
    app = Flask(__name__)
    app.config.from_object(Configuration)

    db.init_app(app)
    migrate.init_app(app, db)  # ✅ Initialisation de Flask-Migrate

    # ✅ Supprimer db.create_all() (inutilisé avec Migrate)
    # with app.app_context():
    #     db.create_all()

    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    from .routes import api
    app.register_blueprint(api)

    return app
