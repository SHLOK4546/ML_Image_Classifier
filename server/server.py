from flask import Flask, request, jsonify
from flask_cors import CORS
import util

app = Flask(__name__)
CORS(app)  # Enables CORS for frontend requests

@app.route('/classify_image', methods=['POST'])
def classify_image():
    data = request.get_json()  # Get JSON request
    if not data or 'image_data' not in data:
        return jsonify({"error": "No image_data provided"}), 400  # Handle missing data

    image_data = data['image_data']  # Extract base64 image
    response = jsonify(util.classify_image(image_data))  # Call classifier function
    print(response)
    return response

if __name__ == "__main__":
    print("Starting Flask server...")
    util.load_saved_artifacts()
    app.run(port=5000, debug=True)
