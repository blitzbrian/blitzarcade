import { AppShell, AppShellHeader, AppShellMain, Breadcrumbs, Flex, Text, Anchor } from "@mantine/core";
import NextImage from "next/image"
import Search from "./search";
import Link from "next/link";
import Netplay from "./netplay";

interface Breadcrumb {
    href: string;
    name: string;
}

export default function App({ children, breadcrumbs, netplay }: { children: React.ReactNode, breadcrumbs: Breadcrumb[], netplay?: number }) {
    return (
        <AppShell header={{ height: 60 }} padding="md">
            <AppShellHeader p="sm">
                <Flex >
                    <Link style={{ textDecoration: "none", color: "white", width: "100px", display: "block" }} prefetch={false} href="/">
                        <Flex align="center" direction="row" h="100%">    
                            <NextImage alt="logo" height={679 / 25 } width={759 / 25} src="/image/logo.png"></NextImage>
                            <Text ml="xs" fw={500} fz={15}>blitzarcade</Text>
                        </Flex>
                    </Link>
                    <Breadcrumbs ml="auto" visibleFrom="xs" mr="auto">
                        {breadcrumbs.map((breadcrumb) => (
                            <Anchor key={breadcrumb.name} href={breadcrumb.href} component={Link} prefetch={false} c="white">{breadcrumb.name}</Anchor>
                        ))}
                    </Breadcrumbs>

                    {netplay === 1 && <Netplay />}
                    <Search />
                </Flex>
            </AppShellHeader>

            <AppShellMain>{children}</AppShellMain>
        </AppShell>
    );
}