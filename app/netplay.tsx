"use client";

import { ActionIcon, Tooltip } from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";
import { useState } from "react";

export default function Netplay() {
    const [netplay, setNetplay] = useState(false);

    const toggleNetplay = (url: string) => {
        setNetplay(!netplay);
        const element = document.body.querySelector("#emulator");
        const src = element?.getAttribute("src");
        const parts = src?.split("?") || [];
        const query = new URLSearchParams(parts[1]);
        query.set("netplay", netplay ? "null" : url);

        element?.setAttribute(
            "src",
            parts[0] + "?" + query.toString()
        );
    }
    return (
        <Tooltip
            label={netplay ? "Disable network play" : "Enable network play"}
            color="gray"
        >
            <ActionIcon
                onClick={() => toggleNetplay("https://emulatorjs-netplay-old.onrender.com")}
                onContextMenu={(e) => {
                    e.preventDefault();
                    if(netplay) toggleNetplay("");
                    else toggleNetplay(prompt("Enter netplay url:") || "https://emulatorjs-netplay-old.onrender.com")

                }}
                variant={netplay ? "outline" : "default"}
                mr="sm"
                radius="xl"
                size="input-sm"
                color="gray.0"
            >
                <IconWorld size={20} color="var(--mantine-color-gray-0)" />
            </ActionIcon>
        </Tooltip>
    );
}
