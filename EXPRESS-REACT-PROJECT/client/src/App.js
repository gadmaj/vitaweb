import React, { useEffect, useState } from 'react';
import './App.css';

// Collapsible component
const Collapsible = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div>
      <button type="button" className={`collapsible ${isOpen ? 'active' : ''}`} onClick={toggleOpen}>
        {title}
      </button>
      <div className="content" style={{ maxHeight: isOpen ? '100vh' : '0' }}>
        {children}
      </div>
    </div>
  );
};

// Main App component
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
          <Collapsible title="Open Chat">
            <p>Chatty</p>
          </Collapsible>
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
