import React, { useEffect, useRef, useState } from 'react';
import Quagga from 'quagga';
import { createClient } from "@supabase/supabase-js";
import debounce from 'just-debounce-it';

const supabase = createClient("https://vmnxetknjsnjczgogdud.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbnhldGtuanNuamN6Z29nZHVkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMDUxMTQyMiwiZXhwIjoyMDI2MDg3NDIyfQ.O5I6b0AcuXaobOVnQai9RQR5sdcimBiXcsr4Tbi4SB8");



export function BarcodeScanner() {
    const videoRef = useRef(null); // Referencia al elemento video
    const [barcode, setBarcode] = useState();
    const [material, setMaterial] = useState();
    const [diferentesOpciones, setDiferentesOpciones] = useState([]);

    const buscarProducto = async (codigo_barra) => {
        console.log('lanzo petición');
        const { data, error } = await supabase.from('productos').select('material').eq('codigo_barra', codigo_barra);
        if (error) {
            console.log(error);
        } else {
            setMaterial(data);
            console.log(codigo_barra, data);
        }
        const materialObtenido = "material-1"; // Supongamos que el material del producto es "material-1", "material-2", o "material-3" según lo que hayas obtenido de la base de datos
    };


    useEffect(() => {
        // Inicialización de Quagga

        const buscarProductoConDebounce = debounce((barcode) => {
            buscarProducto(barcode);
        }, 500);

        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#videoQuagga'), // Corregido el id aquí
                constraints: {
                    width: 1000,
                    height: 1000,
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
                setBarcode(result?.codeResult?.code);
                console.log(result?.codeResult?.code);
                buscarProductoConDebounce(result?.codeResult?.code);
            });
        });

        // Limpieza al desmontar el componente
        return () => {
            Quagga.stop();
        };
    }, []);



    return (
        <div>
            <div id='videoQuagga' className='w-[1000px] h-[1000px] '></div> {/* Corregido el id aquí */}
            <h1>{barcode}</h1>
        </div>
    );
};