import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [backendData, setBackendData] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then(data => {
        setBackendData(data);
      });

    fetch('/api/images')
      .then(response => response.json())
      .then(images => {
        setImageFiles(images);
      });
  }, []);

  return (
    <div className="app-container">
      <body className="app-body">
        <center>
          <font className="title" size="+20">PSVITA/GAD TRACKER (WIP)</font>
        </center>
        <div className="image-container">
          {imageFiles.map((imageFile, index) => (
            <img className="image" key={index} src={`/images/${imageFile}`} alt={`img-${index}`} />
          ))}
        </div>
      </body>
    </div>
  );
}

export default App;
