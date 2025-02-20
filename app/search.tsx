"use client";

import { Input } from "@mantine/core";
import { useRouter } from "next/navigation";


export default function Search() {
    const router = useRouter();

    return (
        <Input ml="auto" onKeyDown={(e) => {
            if(e.key === "Enter") router.push(`/search/${e.currentTarget.value}`);
        }}/>
    )
}