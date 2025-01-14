import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

function App() {
  const [data, setData] = useState("Not Found");
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCameraToggle = () => {
    if (!isCameraEnabled) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => {
          setIsCameraEnabled(true);
          setErrorMessage('');
        })
        .catch((err) => {
          console.error("Camera permission denied", err);
          handleCameraError(err);
        });
    } else {
      setIsCameraEnabled(false);
    }
  };

  const handleCameraError = (err) => {
    if (err.name === "NotAllowedError") {
      setErrorMessage("Camera access is denied. Please enable it in your browser settings.");
    } else if (err.name === "NotFoundError") {
      setErrorMessage("No camera found on this device.");
    } else if (err.name === "NotReadableError") {
      setErrorMessage("Camera is already in use by another application.");
    } else {
      setErrorMessage("An unknown error occurred while accessing the camera.");
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Barcode Scanner</h1>
      <button onClick={handleCameraToggle}>
        {isCameraEnabled ? 'Stop Camera' : 'Start Camera'}
      </button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {isCameraEnabled && (
        <BarcodeScannerComponent
          width={500}
          height={500}
          onUpdate={(err, result) => {
            if (result) setData(result.text);
            else setData("Not Found");
          }}
          style={{ width: '100%', maxWidth: '500px', margin: 'auto' }}
        />
      )}
      <p>{data}</p>
    </div>
  );
}

export default App;
