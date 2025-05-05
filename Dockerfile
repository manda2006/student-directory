# Utilise une image Python plus complète que alpine pour éviter certains bugs liés à pip
FROM python:3.11-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier et installer les dépendances Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier tout le reste de ton projet dans le conteneur
COPY . .

# Copier les fichiers statiques générés par React (build) dans le bon dossier Flask
#COPY frontend/dist /app/frontend/dist

# Démarrer l'application Flask
CMD ["python", "run.py"]
