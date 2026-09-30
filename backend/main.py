from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="MediLens API",
    description="AI Medical Report Demystifier backend",
    version="1.0.0",
)


# Allow the Next.js frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "message": "MediLens API is running",
        "status": "ok",
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "MediLens backend",
    }


@app.post("/analyze")
async def analyze_report(file: UploadFile = File(...)):
    return {
        "success": True,
        "filename": file.filename,
        "content_type": file.content_type,
        "message": "Report received successfully.",
    }