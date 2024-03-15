import { Grip } from 'lucide-react';
import { BarcodeScanner } from '../logic/BarcodeScanner';

export function Main() {


    return (
        <>
            <article className="w-full p-4">
                <header className="flex w-full justify-between items-center">
                    ReciclIA
                    <Grip />
                </header>
                <BarcodeScanner />

            </article>
        </>
    )
}