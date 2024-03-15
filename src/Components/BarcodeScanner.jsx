import React, { useEffect, useRef } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = () => {
  const videoRef = useRef(null); // Referencia al elemento video

  useEffect(() => {
    // Inicialización de Quagga
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: videoRef.current, // Usando la referencia al elemento video
        constraints: {
          width: 640,
          height: 480,
          facingMode: "environment"
        },
      },
      decoder: {
        readers: ["ean_reader"]
      }
    }, (err) => {
      if (err) {
        console.error("Error al inicializar Quagga:", err);
        return;
      }
      Quagga.start();
    });

    // Limpieza al desmontar el componente
    return () => {
      Quagga.stop();
    };
  }, []);

  return (
    <div>
      <video ref={videoRef}></video> {/* Utilizando la referencia al elemento video */}
    </div>
  );
};

export default BarcodeScanner;
