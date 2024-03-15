import React, { useEffect, useRef, useState } from 'react';
import Quagga from 'quagga';
import { createClient } from "@supabase/supabase-js";
import debounce from 'just-debounce-it';

const supabase = createClient("https://vmnxetknjsnjczgogdud.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbnhldGtuanNuamN6Z29nZHVkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMDUxMTQyMiwiZXhwIjoyMDI2MDg3NDIyfQ.O5I6b0AcuXaobOVnQai9RQR5sdcimBiXcsr4Tbi4SB8");



export function BarcodeScanner() {
    const videoRef = useRef(null); // Referencia al elemento video
    const [barcode, setBarcode] = useState();
    const [material, setMaterial] = useState();
    const codigosLeidos = useRef([]);

    const fetchProduct = async (codigo_barra) => {
        const { data, error } = await supabase.from('productos').select('material').eq('codigo_barra', codigo_barra);
        if (error) {
            console.log(error);
            return false;
        } else {
            setMaterial(data);
            console.log(codigo_barra, data);
            return true;
        }
    }

    const buscarProducto = async () => {
        const codigosSet = codigosLeidos.current;

        let i = 0;
        let encontrado = false;
        while (codigosSet[i] && !encontrado) {
            encontrado = fetchProduct(codigosSet[i]);
        };
    };


    useEffect(() => {
        // Inicialización de Quagga

        const buscarProductoConDebounce = debounce((barcode) => {
            buscarProducto(barcode);
        }, 1000);

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
                const nuevoCodigo = result?.codeResult?.code;
                setBarcode(nuevoCodigo);
                console.log(nuevoCodigo);
                buscarProductoConDebounce(nuevoCodigo);

                if (nuevoCodigo && !codigosLeidos.current.includes(nuevoCodigo)) {
                    const anadir = [...codigosLeidos.current, nuevoCodigo];
                    codigosLeidos.current = anadir;
                }
            });
        });

        // Limpieza al desmontar el componente
        return () => {
            Quagga.stop();
        };
    }, []);



    return (
        <div>
            <div id='videoQuagga' className='w-[280px] h-[280px] '></div> {/* Corregido el id aquí */}
            <h1>{material ? JSON.stringify(material) : 'TODAVIA NO HAY'}</h1>
        </div>
    );
};