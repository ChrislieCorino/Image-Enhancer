# Image Enhancement SaaS Clone

A full-stack AI-powered image upscaling web app that enhances low-resolution images using OpenCV's super-resolution models. Built with FastAPI (Python) on the backend and vanilla HTML/CSS/JS on the frontend.

# Features

· AI Image Upscaling — 4x resolution enhancement using FSRCNN
· Drag & Drop Upload — Clean, modern UI
· Fast API — Async request handling with FastAPI
· Responsive Design — Works on desktop and mobile
· CORS Enabled — Frontend and backend communicate seamlessly
· Lightweight — No heavy ML frameworks required

# How It Works


┌─────────────┐         HTTP POST          ┌──────────────┐
│   Browser   │  ───────────────────────>  │   FastAPI    │
│ HTML/CSS/JS │                            │   (Python)   │
│             │  <───────────────────────  │              │
└─────────────┘      Enhanced Image        └──────┬───────┘
                                                  │
                                                  ▼
                                          ┌──────────────┐
                                          │  OpenCV      │
                                          │  FSRCNN x4   │
                                          └──────────────┘


1. User uploads an image via the frontend
2. JS sends it to the FastAPI backend using fetch()
3. Python processes it with OpenCV's DNN super-resolution
4. Enhanced image is returned and displayed

# Tech Stack

Layer Technology
Backend Python 3.10+, FastAPI, Uvicorn
AI Model OpenCV DNN Super-Resolution (FSRCNN)
Frontend HTML5, CSS3, Vanilla JavaScript
HTTP Fetch API + CORS middleware

# Getting Started

Prerequisites

· Python 3.10+
· A modern web browser
· VS Code (recommended)

1️. Clone the Repository

bash
git clone https://github.com/yourusername/image-enhancer.git
cd image-enhancer


2️. Set Up the Backend

bash
cd backend
python -m venv venv

# Activate the virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn python-multipart opencv-python numpy


3️. Download the AI Model

Download FSRCNN_x4.pb from the official OpenCV model repository:

https://github.com/Saafke/FSRCNN_Tensorflow/tree/master/models

Place the file inside the backend/ folder (next to main.py).

4️. Run the Backend

bash
uvicorn main:app --reload --port 8000


You should see:
Uvicorn running on http://127.0.0.1:8000


5️. Run the Frontend

Open a new terminal:

bash
cd frontend
python -m http.server 5500


# API Reference

POST /upscale

Enhances an uploaded image by 4x.

Request

· Content-Type: multipart/form-data
· Body: file (image/jpeg or image/png)

Response

· Content-Type: image/png
· Body: Enhanced image binary

# Usage

1. Open http://localhost:5500 in your browser
2. Drag & drop an image, or click the upload area
3. Wait a few seconds for processing
4. Download the enhanced result (right-click → Save Image As)

# Troubleshooting

Problem Cause Fix
Yellow squiggles under cv2 / np Wrong Python interpreter in VS Code Ctrl+Shift+P → Python: Select Interpreter → pick your venv
ModuleNotFoundError: cv2 Package not installed pip install opencv-python inside the venv
CORS policy blocked Backend not allowing origin Ensure CORSMiddleware is added to main.py
Failed to fetch Backend not running Start uvicorn main:app --reload
422 Unprocessable Entity Wrong form field name Must be formData.append('file', ...)
Can't open FSRCNN_x4.pb Model file missing Download & place in backend/ folder
net::ERR_CONNECTION_REFUSED Wrong port Match API_URL in script.js to uvicorn --port

# Configuration

Change the API Endpoint

In frontend/script.js:

javascript
const API_URL = 'http://localhost:8000';


Change the Model

In backend/main.py:

python
sr.readModel("FSRCNN_x4.pb")
sr.setModel("fsrcnn", 4)  # Try "edsr" or "lapsrn" for different models


Available models: edsr, espcn, fsrcnn, lapsrn

requirements.txt


fastapi
uvicorn
python-multipart
opencv-python
numpy


# Build & run:

bash
docker build -t image-enhancer .
docker run -p 8000:8000 image-enhancer

# Contributing

1. Fork the repo
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit changes (git commit -m 'Add amazing feature')
4. Push to branch (git push origin feature/amazing-feature)
5. Open a Pull Request

# Acknowledgements

· FastAPI — Modern Python web framework
· OpenCV — Computer vision library
· FSRCNN Model — Super-resolution model
· Real-ESRGAN — For production upgrades

# Contact

Chrislie — @ChrislieCorino
chrisliecorino@gmail.com

If you found this project useful, please give it a star on GitHub!
