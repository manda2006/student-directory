from flask import Blueprint, jsonify, request
from flask_cors import CORS
from app.models import Student, db

api = Blueprint('api', __name__)
CORS(api)

@api.route("/api/students", methods=["GET"])
def get_students():
    students = Student.query.all()
    data = [
        {
            "id": student.id,
            "first_name": student.first_name,
            "last_name": student.last_name,
            "email": student.email,
            "sex": student.sex,
            "class_name": student.class_name
        } for student in students
    ]
    return jsonify(data)

@api.route("/api/students", methods=["POST"])
def add_student():
    data = request.json

    new_student = Student(
        first_name=data["first_name"],
        last_name=data["last_name"],
        email=data["email"],
        sex=data.get("sex", ""),
        class_name=data.get("class_name", "")
    )

    db.session.add(new_student)
    db.session.commit()

    return jsonify({
        "id": new_student.id,
        "first_name": new_student.first_name,
        "last_name": new_student.last_name,
        "email": new_student.email,
        "sex": new_student.sex,
        "class_name": new_student.class_name
    }), 201

@api.route("/api/students/<int:id>", methods=["DELETE"])
def delete_student(id):
    student = Student.query.get(id)
    if not student:
        return jsonify({"error": "Étudiant non trouvé"}), 404

    db.session.delete(student)
    db.session.commit()
    return jsonify({"message": "Étudiant supprimé"}), 200

@api.route("/api/students/<int:id>", methods=["PUT"])
def update_student(id):
    student = Student.query.get(id)
    if not student:
        return jsonify({"error": "Étudiant non trouvé"}), 404

    data = request.json
    student.first_name = data.get("first_name", student.first_name)
    student.last_name = data.get("last_name", student.last_name)
    student.email = data.get("email", student.email)
    student.sex = data.get("sex", student.sex)
    student.class_name = data.get("class_name", student.class_name)

    db.session.commit()

    return jsonify({"message": "Étudiant mis à jour"}), 200
