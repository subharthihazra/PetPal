import os
from dotenv import load_dotenv
from PIL import Image
import google.generativeai as genai
from flask import Flask, request, Response, g, render_template, jsonify
import marko
load_dotenv()  # for loading all environment variables
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


app = Flask(__name__)

model = genai.GenerativeModel('gemini-pro-vision')

@app.route('/', methods=['GET'])
def hello_world():
    return render_template("index.html")

@app.route('/chat_with_image', methods=['POST'])
def chat():
    
    if request.method == 'POST':
        if 'user_image' not in request.files:
            return jsonify({"error": "No file part"})

        file = request.files['user_image']

        if file.filename == '':
            return jsonify({"error": "No selected file"})

        if file:
            image_data = file.read()
            image_parts = [
                {
                    "mime_type": file.content_type,
                    "data": image_data
                },
            ]

            prompt_parts = [
                """You are an expert at identification of animals from images. You are also an expert vet. You are given an image of an animal. Your task is to identify the animal and its breed. Now, mention some notable features of the animal.
                    Use this format:

                    Animal: <animal_name>\n
                    Breed: <breed_name>\n
                    Found in: <COUNTRY>\n
                    Description: <description>\n\n

                    You are also an expert at identifying any health-related problems the animal is facing.
                    You are required to write a brief description of the problem. Now, provide some remedies so that the animal can be cured. Use this format:

                    Probable Problem identified: <problem>\n
                    Remedies: <remedies>\n
                    Recommended Diet: <diet>\n
                    Additional facts: <notes>\n """,
                image_parts[0]
            ]    

            response = model.generate_content(prompt_parts)
            print(response.text)
            return jsonify({
                "response": marko.convert(response.text)
            })

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
