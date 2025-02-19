"use client";

import { Pagination } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function Paginizer({ platform, pages, page } : { platform: string, pages: number, page: number }) {
    const router = useRouter();
    return (<Pagination
    total={pages}
    siblings={5}
    defaultValue={page}
    onChange={(page) => {
        router.push(`/platform/${platform}/${page}`)
    }}
/>)

}