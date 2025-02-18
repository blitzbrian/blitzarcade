import { AppShell, AppShellHeader, AppShellMain, Text } from "@mantine/core";

export default function App({ children }: { children: React.ReactNode }) {
    return (
        <AppShell header={{ height: 60 }} padding="md">
            <AppShellHeader>
                <Text fz={20} fw={600} ml="xl" mt="sm">blitzarcade</Text>
            </AppShellHeader>

            <AppShellMain>{children}</AppShellMain>
        </AppShell>
    );
}
