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
                target: document.querySelector('#videoQuagga'), // Usando la referencia al elemento video
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
        });

        // Limpieza al desmontar el componente
        return () => {
            Quagga.stop();
        };
    }, []);

    return (
        <div>
            <video id='videQuagga' className='w-[600px] h-[600px] bg-black'></video> {/* Utilizando la referencia al elemento video */}
        </div>
    );
};