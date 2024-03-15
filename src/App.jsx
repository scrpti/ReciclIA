import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Main } from './Components/Main'
import { useEffect, useState } from "react";
import { BarcodeScanner } from './Components/BarcodeScanner';



function App() {
  
  return (
    <>
    <BarcodeScanner/>
    </>
  );
}

export default App
