const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const loading = document.getElementById('loading');
const result = document.getElementById('result');
const enhancedImg = document.getElementById('enhanced-img');

// Click to upload
dropZone.addEventListener('click', () => fileInput.click());

// Handle file selection
fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) uploadImage(e.target.files[0]);
});

// Drag and drop
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    if (e.dataTransfer.files.length) uploadImage(e.dataTransfer.files[0]);
});

async function uploadImage(file) {
    // UI Feedback
    loading.classList.remove('hidden');
    result.classList.add('hidden');
    
    const formData = new FormData();
    formData.append('file', file); // Match the FastAPI parameter name

    try {
        const response = await fetch('http://localhost:8000/upscale', {
            method: 'POST',
            body: formData // No headers set manually
        });

        if (!response.ok) throw new Error('Enhancement failed');

        const blob = await response.blob();
        enhancedImg.src = URL.createObjectURL(blob);
        
        loading.classList.add('hidden');
        result.classList.remove('hidden');
    } catch (error) {
        alert(error.message);
        loading.classList.add('hidden');
    }
}