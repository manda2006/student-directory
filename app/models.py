# app/models.py
from . import db

class Student(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    sex = db.Column(db.String(10), nullable=True)         # ➕ champ ajouté
    class_name = db.Column(db.String(50), nullable=True)  # ➕ champ ajouté

    def __repr__(self):
        return f"<Student {self.first_name} {self.last_name}>"

    @property
    def full_name(self):
        # Assure-toi qu'il n'y a pas de parenthèses en trop ici
        return f"{self.first_name} {self.last_name}"
