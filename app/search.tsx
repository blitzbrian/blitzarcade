"use client";

import { TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";

export default function Search() {
    const router = useRouter();

    return (
        <TextInput variant="unstyled" placeholder="Search" radius="xl" leftSection={<IconSearch size={15} color="var(--mantine-color-gray-0)" />}  onKeyDown={(e) => {
            if(e.key === "Enter") router.push(`/search/${e.currentTarget.value}`);
        }}/>
    )
}