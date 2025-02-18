"use client";

import { Pagination } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function Paginizer({ platform, pages, page } : { platform: string, pages: number, page: number }) {
    const router = useRouter();
    return (<Pagination
    // getItemProps={async (page) => {
    //   return {
    //     component: Link,
    //     href: `/platform/${platform}/${page}`,
    //   }
    // }}
    total={pages}
    siblings={3}
    defaultValue={page}
    onChange={(page) => {
        router.push(`/platform/${platform}/${page}`)
    }}
/>)

}