# app/admin.py
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import Student
from . import db

class StudentAdmin(ModelView):
    # On n’inclut que les vrais champs (pas les propriétés comme full_name)
    form_columns = ['first_name', 'last_name', 'email']

def init_admin(app):
    admin = Admin(app, name='Panneau d’administration', template_mode='bootstrap4')
    admin.add_view(StudentAdmin(Student, db.session))
