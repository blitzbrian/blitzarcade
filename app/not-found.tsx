import { Flex, Title, Text, Button } from "@mantine/core";
import App from "./app";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    openGraph: {
        title: 'blitzarcade',
        description: '404: Not Found',
        url: 'https://blitzarcade.org',
        type: "website",
        locale: "en_US",
        images: [
          {
            url: 'https://blitzarcade.org/image/logo.png',
            width: 759,
            height: 697,
            alt: 'Logo'
          }
        ]
    }
}

export default function NotFound() {
    return (
        <App breadcrumbs={[{ name: "Home", href: "/" }, { name: "Not Found", href: "#" }]}>
            <Flex direction="column" justify="center" align="center" h="calc(100vh - 152px)">
                <Title mb="md">404: Not Found</Title>
                <Text>
                    The page you are looking for has not been found, it was possibly moved or deleted.
                </Text>
                <Text>
                    Press the button below me to go back to the homepage.
                </Text>
                <Button variant="default" mt="md" component={Link} href="/" prefetch={false}>
                    Get me back home
                </Button>
            </Flex>
        </App>
    );
}
