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
                <div style={{ display: "grid", "gridTemplateColumns": "1fr auto 1fr", alignItems: "center" }}>
                    <Link style={{ textDecoration: "none", color: "var(--mantine-color-gray-0)", width: "100px", display: "block", justifySelf: "start" }} prefetch={false} href="/">
                        <Flex align="center" direction="row" h="100%">    
                            <NextImage priority alt="logo" height={679 / 25 } width={759 / 25} src="/image/logo.png"></NextImage>
                            <Text ml="xs" fw={500} fz={15}>blitzarcade</Text>
                        </Flex>
                    </Link>
                    <Breadcrumbs style={{ justifySelf: "center" }} visibleFrom="xs">
                        {breadcrumbs.map((breadcrumb) => (
                            <Anchor key={breadcrumb.name} href={breadcrumb.href} component={Link} prefetch={false} c="white">{breadcrumb.name}</Anchor>
                        ))}
                    </Breadcrumbs>

                    <Flex style={{ justifySelf: "end" }} align="center" direction="row" h="100%">    
                        {netplay === 1 && <Netplay />}
                        <Search />
                    </Flex>
                </div>
            </AppShellHeader>

            <AppShellMain>{children}</AppShellMain>
        </AppShell>
    );
}