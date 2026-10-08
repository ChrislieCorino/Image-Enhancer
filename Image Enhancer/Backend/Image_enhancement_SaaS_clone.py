from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Restrict this to your domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi import File, UploadFile, HTTPException
from fastapi.responses import Response
import cv2
import numpy as np

# Load a lightweight model (FSRCNN) on startup
sr = cv2.dnn_superres.DnnSuperResImpl_create()
sr.readModel("FSRCNN_x4.pb") # Download this model file
sr.setModel("fsrcnn", 4)

@app.post("/upscale")
async def upscale_image(file: UploadFile = File(...)):
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Unsupported format")
    
    # Read and decode the image
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    # Perform upscaling
    result = sr.upsample(img)
    
    # Encode the result back to PNG
    _, encoded_img = cv2.imencode('.png', result)
    return Response(content=encoded_img.tobytes(), media_type="image/png")