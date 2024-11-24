from flask import Flask, request, jsonify, url_for, send_file
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
from werkzeug.security import check_password_hash
import jwt
from flask_bcrypt import Bcrypt
import os
from rembg import remove
import uuid 
from PIL import Image
from gtts import gTTS
import pyttsx3
from dotenv import load_dotenv
from flask_socketio import SocketIO, emit

load_dotenv()

# app = Flask(__name__, static_folder='uploads')
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, async_mode='eventlet')

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['CORS_HEADERS'] = 'application/json'

app.config['UPLOAD_FOLDER'] = "./static/uploads"
app.config['BASE_URL'] = "http://127.0.0.1:5000/static/uploads/"



bcrypt = Bcrypt(app)

jwt_secret = os.getenv("JWT_SECRET")
mongo_uri = os.getenv("MONGO_URI")

client = MongoClient(mongo_uri)

db = client.get_database("AiGen-SaaS")

collection = db['users']

# app.config['BASE_URL'] = 'https://aigen-saas-server.onrender.com/uploads/'

@app.route("/api/register", methods=["POST"])
def Register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    existing_user = collection.find_one({"email": email})
    if existing_user:
        return jsonify({"message": "Email already exists"}), 409

    new_user = {
        "username": username,
        "email": email,
        "password": hashed_password  
    }
    result = collection.insert_one(new_user) 
    if result.inserted_id:
        return jsonify({"message": "User registered successfully"}), 201
    else:
        return jsonify({"message": "Failed to register user"}), 500

@app.route("/api/login", methods=["POST"])
def Login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400
    
    user = collection.find_one({"email": email})
    if not user:
        return jsonify({"message": "User not found"}), 404
     
    stored_password = user.get('password')
    if not bcrypt.check_password_hash(stored_password, password):
        return jsonify({"message": "Incorrect email or password"}), 401

    username = user.get('username')

    token = jwt.encode({'email': email, 'username': username}, jwt_secret, algorithm='HS256')

    return jsonify({"message": "User logged in successfully", "token": token}), 200

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/api/bgremover", methods=["POST"])
@cross_origin(origin='*')
def remove_bg():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image_file = request.files['image']
    if image_file.filename == '':
        return jsonify({'error': 'No image selected'}), 400

    if not allowed_file(image_file.filename):
        return jsonify({'error': 'Unsupported file type'}), 415

    try:
        filename = str(uuid.uuid4()) + os.path.splitext(image_file.filename)[1]
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image_file.save(filepath)
        print("Image saved to:", filepath)

        output_filename = 'output_' + filename
        output_filepath = os.path.join(app.config['UPLOAD_FOLDER'], output_filename)
        print("Processing image to remove background...")
        
        img = Image.open(filepath)
        output = remove(img)
        output.save(output_filepath, format='PNG')

        output_url = url_for('static', filename=output_filename)
        os.remove(filepath)

        return jsonify({"message": "removed successfully", "image_url": output_url}), 200
    except Exception as e:
        print("Error occurred:", e)
        return jsonify({'error': 'Failed to remove background', 'message': str(e)}), 500

# @app.route("/api/voiceGenerator", methods=["POST"])
# @cross_origin(origin='*')
# def VoiceGen():
#     try:
#         data = request.json
#         text = data.get('text')
#         gender = data.get('gender')

#         if not text or not gender:
#             return jsonify({"message": "Invalid input: 'text' and 'gender' are required"}), 400

#         print("Text:", text)
#         print("Gender:", gender)

#         if gender == "male":
#             audio_file_path = "temp_audio.wav"
#         else:
#             audio_file_path = "temp_audio.mp3"

#         full_path = os.path.join(app.config['UPLOAD_FOLDER'], audio_file_path)

#         # Remove existing file if present
#         if os.path.exists(full_path):
#             os.remove(full_path)

#         # Generate audio file
#         if gender == "male":
#             engine = pyttsx3.init()
#             engine.setProperty('rate', 150)
#             engine.setProperty('volume', 0.8)
#             engine.save_to_file(text, full_path)
#             engine.runAndWait()
#         else:
#             language = 'en'
#             speech = gTTS(text=text, lang=language, slow=False, tld="com.au")
#             speech.save(full_path)

#         # Return the audio file URL
#         audio_file_url = f"http://127.0.0.1:5000/static/uploads/{audio_file_path}"

#         return jsonify({"audio_url": app.config['BASE_URL'] + audio_file_path})
    
#     except Exception as e:
#         # Log the error for debugging
#         print("Error:", str(e))
#         return jsonify({"message": "Internal Server Error", "error": str(e)}), 500


# if __name__ == '__main__':
#     port = int(os.environ.get('PORT', 10000))
#     socketio.run(app, host='0.0.0.0', port=port, debug=True)
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # Default to port 5000
    socketio.run(app, host='0.0.0.0', port=port, debug=True)  # Bind to localhost

