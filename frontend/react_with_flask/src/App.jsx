import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    first_name: '',
    last_name: '',
    email: '',
    sex: '',
    class_name: ''
  });
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Erreur lors du chargement des étudiants :', error);
    }
  };

  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleAddStudent = async () => {
    try {
      await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });
      setNewStudent({
        first_name: '',
        last_name: '',
        email: '',
        sex: '',
        class_name: ''
      });
      setShowForm(false);
      fetchStudents();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'étudiant :', error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/students/${id}`, {
        method: 'DELETE'
      });
      fetchStudents();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'étudiant :', error);
    }
  };

  const handleUpdateStudent = async () => {
    try {
      await fetch(`http://localhost:5000/api/students/${editingStudent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingStudent),
      });
      setEditingStudent(null);
      fetchStudents();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'étudiant :", error);
    }
  };

  return (
    <div className="App">
      <h1>Annuaire Étudiant</h1>

      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Sexe</th>
            <th>Classe</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.first_name}</td>
              <td>{s.last_name}</td>
              <td>{s.email}</td>
              <td>{s.sex}</td>
              <td>{s.class_name}</td>
              <td>
                <button onClick={() => setEditingStudent(s)}>Éditer</button>
                <button onClick={() => handleDeleteStudent(s.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      {!showForm && (
        <button onClick={() => setShowForm(true)}>Ajouter un étudiant</button>
      )}

      {showForm && (
        <div>
          <h3>Ajouter un étudiant</h3>
          <input
            name="first_name"
            placeholder="Prénom"
            value={newStudent.first_name}
            onChange={handleInputChange}
          />
          <input
            name="last_name"
            placeholder="Nom"
            value={newStudent.last_name}
            onChange={handleInputChange}
          />
          <input
            name="email"
            placeholder="Email"
            value={newStudent.email}
            onChange={handleInputChange}
          />
          <input
            name="sex"
            placeholder="Sexe"
            value={newStudent.sex}
            onChange={handleInputChange}
          />
          <input
            name="class_name"
            placeholder="Classe"
            value={newStudent.class_name}
            onChange={handleInputChange}
          />
          <button onClick={handleAddStudent}>Enregistrer</button>
        </div>
      )}

      {editingStudent && (
        <div>
          <h3>Modifier l’étudiant</h3>
          <input
            name="first_name"
            placeholder="Prénom"
            value={editingStudent.first_name}
            onChange={(e) => setEditingStudent({ ...editingStudent, first_name: e.target.value })}
          />
          <input
            name="last_name"
            placeholder="Nom"
            value={editingStudent.last_name}
            onChange={(e) => setEditingStudent({ ...editingStudent, last_name: e.target.value })}
          />
          <input
            name="email"
            placeholder="Email"
            value={editingStudent.email}
            onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
          />
          <input
            name="sex"
            placeholder="Sexe"
            value={editingStudent.sex}
            onChange={(e) => setEditingStudent({ ...editingStudent, sex: e.target.value })}
          />
          <input
            name="class_name"
            placeholder="Classe"
            value={editingStudent.class_name}
            onChange={(e) => setEditingStudent({ ...editingStudent, class_name: e.target.value })}
          />
          <button onClick={handleUpdateStudent}>Mettre à jour</button>
          <button onClick={() => setEditingStudent(null)}>Annuler</button>
        </div>
      )}
    </div>
  );
}

export default App;
