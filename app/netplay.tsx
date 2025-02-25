"use client";

import { ActionIcon, Tooltip } from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";

export default function Netplay() {
    return (
        <Tooltip label="Enable network play" color="gray">
            <ActionIcon onClick={() => {
                const element = document.body.querySelector('#emulator');
                const src = element?.getAttribute("src");
                element?.setAttribute('src', src + "&netplay=1");

            }} variant="default" mr="sm" radius="xl" size="input-sm">
                <IconWorld size={20} color="var(--mantine-color-gray-0)" />
            </ActionIcon>
        </Tooltip>
    );
}
