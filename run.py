import os
from flask import send_from_directory
from app import create_app

app = create_app()

# Point vers le dossier de build React
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DIST_DIR = os.path.join(BASE_DIR, "frontend", "dist")

app.static_folder = DIST_DIR
app.static_url_path = ""

@app.route("/")
def serve_index():
    return send_from_directory(DIST_DIR, "index.html")

@app.route("/assets/<path:path>")
def serve_assets(path):
    return send_from_directory(os.path.join(DIST_DIR, "assets"), path)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
