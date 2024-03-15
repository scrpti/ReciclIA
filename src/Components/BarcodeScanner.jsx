import React, { useEffect, useRef } from 'react';
import Quagga from 'quagga';

export function BarcodeScanner() {
    const videoRef = useRef(null); // Referencia al elemento video

    useEffect(() => {
        // Inicialización de Quagga
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#videoQuagga'), // Corregido el id aquí
                constraints: {
                    width: 640,
                    height: 480,
                    facingMode: "environment"
                },
            },
            decoder: {
                readers: ["ean_reader"]
            }
        }, function (err) {
            if (err) {
                console.log(err);
                return
            }
            console.log("Initialization finished. Ready to start");
            Quagga.start();
            Quagga.onDetected((result) => {
                console.log('Barcode detected:', result);
            });
        });

        // Limpieza al desmontar el componente
        return () => {
            Quagga.stop();
        };
    }, []);

    return (
        <div>
            <div id='videoQuagga' className='w-[600px] h-[600px] '></div> {/* Corregido el id aquí */}
        </div>
    );
};