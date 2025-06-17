import React from 'react';

function UploadForm() {
  const handleUpload = async (event) => {
    const formData = new FormData();
    formData.append('image', event.target.files[0]);

    const res = await fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    console.log('Image URL:', data.imageUrl);
    alert(`Зображення завантажено: ${data.imageUrl}`);
  };

  return (
    <div>
      <h2>Завантажити фото</h2>
      <input type="file" onChange={handleUpload} />
    </div>
  );
}

export default UploadForm;
