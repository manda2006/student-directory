# init_db.py

from app import create_app, db
from app.models import Student

app = create_app()

with app.app_context():
    # Crée toutes les tables définies par les modèles SQLAlchemy
    db.create_all()
    print("✅ Tables créées avec succès dans la base de données.")
