"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import revalidate from "./revalidate";
import { platforms } from "@/app/consoles";

export default function Emulator({
    rom,
    name,
    platform,
}: {
    rom: string;
    name: string;
    platform: string;
}) {
    const p = platforms.find(p => p.system === platform);
    const router = useRouter();

    useEffect(() => {
        window.addEventListener("message", async (e) => {
            if (e.origin !== location.origin) return;
            if (e.data === "revalidate") {
                await revalidate(location.pathname);
                setTimeout(() => {
                    router.refresh();
                }, 2000);
            }
        });
    }, []);

    return (
        <iframe
            style={{
                position: "absolute",
                left: 0,
                top: "60px",
                height: "calc(100vh - 60px)",
                width: "100%",
                border: "none",
            }}
            id="emulator"
            src={`/emulator.html?rom=${rom}&core=${p?.core}&name=${encodeURI(name)}`}
        />
    );
}

