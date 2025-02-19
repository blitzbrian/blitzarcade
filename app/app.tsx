import { AppShell, AppShellHeader, AppShellMain, Flex, Text } from "@mantine/core";
import NextImage from "next/image"
import Link from "next/link";

export default function App({ children }: { children: React.ReactNode }) {
    return (
        <AppShell header={{ height: 60 }} padding="md">
            <AppShellHeader p="md">
                <Link style={{ textDecoration: "none", color: "white", width: "100px", display: "block" }} prefetch={false} href="/">
                    <Flex align="center" direction="row" h="100%">    
                        <NextImage alt="logo" height={679 / 25 } width={759 / 25} src="/image/logo.png"></NextImage>
                        <Text ml="xs" fw={500} fz={15}>blitzarcade</Text>
                    </Flex>
                </Link>
            </AppShellHeader>

            <AppShellMain>{children}</AppShellMain>
        </AppShell>
    );
}
