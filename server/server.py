from flask import Flask, request, jsonify
from flask_cors import CORS
import util

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})   # Enables CORS for frontend requests

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
    app.run(host='0.0.0.0', port=10000, debug=True)
