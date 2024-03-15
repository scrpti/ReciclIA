// import React, { useState } from 'react';
// import './styles.css'; // Importa el archivo de estilos CSS

// function EscanerCodigoBarras() {
//     const [codigoBarra, setCodigoBarra] = useState('');
//     const [material, setMaterial] = useState('');

//     const buscarProducto = () => {
//         const { data,error } = await supabase.from('productos').select('material').eq('codigo_barra',codigo_barra)
//         // Simulación de la obtención del material del producto
//         const materialObtenido = "material-1"; // Supongamos que el material del producto es "material-1", "material-2", o "material-3" según lo que hayas obtenido de la base de datos

//         setMaterial(materialObtenido);
//     };

//     return (
//         <div className="container">
//             <h1>Escaner de Código de Barras</h1>
//             <div className={`resultado ${material}`}>
//                 Material del Producto: {material}
//             </div>
//         </div>
//     );
// }

// export default EscanerCodigoBarras;


// SELECT material FROM prodcutos where codigo_barra == lectura