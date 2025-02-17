"use client";

import { useEffect } from "react";

export default function Emulator({ rom } : { rom: string }) {
    useEffect(() => {
        fetch(rom).then(res => {
            res.blob().then(blob => {

            });
        });
    }, [])

    return (<>
    
    </>)
}