import { Card, CardSection, Image, Text, Flex } from "@mantine/core";
import NextImage from "next/image";

import App from "./app";
import Link from "next/link";
import { platforms } from "./consoles";

export default async function Home() {
    return (
        <App breadcrumbs={[{ name: "Home", href: "#" }]}>
            <Flex gap="md" justify="center" align="center" mb="xl" maw="100%">
                <NextImage priority alt="logo" height={679 / 4 } width={759 / 4} src="/image/logo.png"></NextImage>
                <Text fw={500} fz="min(8vw, 50px)">blitzarcade</Text>
            </Flex>
            <Flex direction="row" wrap="wrap" justify="center" gap="xl">
                {platforms.map((platform, i) => (
                    <>
                        <Link
                            style={{ textDecoration: "none", width: "400px", maxWidth: "400px" }}
                            key={platform.path}
                            prefetch={false}
                            href={`/platform/${platform.path}/1`}
                        >
                            <Card
                                m="ms"
                                w="100%"
                                h="100%"
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                            >
                                <CardSection mb="xs" mt="auto" px="md">
                                    <Image
                                        component={NextImage}
                                        src={`/image/${platform.path}.png`}
                                        width={350}
                                        height={0}
                                        h="auto"
                                        w="100%"
                                        alt="Console Art"
                                        priority={i <= 6}
                                        fallbackSrc="/image/no-cover.png"
                                    />
                                </CardSection>

                                <Text
                                    fw={500}
                                    fz={20}
                                    ta="center"
                                    mt="auto"
                                    mb={0}
                                >
                                    {platform.name}
                                </Text>
                            </Card>
                        </Link>
                    </>
                ))}
            </Flex>
        </App>
    );
}
