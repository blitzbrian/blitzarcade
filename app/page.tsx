import { Card, CardSection, Image, Text, Flex } from "@mantine/core";
import NextImage from "next/image";

import App from "./app";
import Link from "next/link";

interface Platform {
    name: string;
    path: string;
}

const platforms: Platform[] = [
    {
        name: "Nintendo DS",
        path: "nintendo-ds",
    },
    {
        name: "Gameboy Advance",
        path: "gameboy-advance",
    },
    {
        name: "Playstation Portable",
        path: "playstation-portable",
    },
    {
        name: "Nintendo",
        path: "nintendo",
    },
    {
        name: "Nintendo 64",
        path: "nintendo-64",
    },
    {
        name: "Playstation",
        path: "playstation",
    },
    {
        name: "Super Nintendo",
        path: "super-nintendo",
    },
    {
        name: "Gameboy",
        path: "gameboy",
    },
    {
        name: "Gameboy Color",
        path: "gameboy-color",
    },
    {
        name: "Sega Saturn",
        path: "sega-saturn",
    },
    {
        name: "Atari 2600",
        path: "atari-2600",
    },
    {
        name: "Mame",
        path: "mame-037b11",
    },
    {
        name: "Sega Master System",
        path: "sega-master-system",
    },
    {
        name: "Game Gear",
        path: "game-gear",
    },
    {
        name: "Commodore 64",
        path: "commodore-64",
    },
    {
        name: "Sega 32x",
        path: "sega-32x",
    },
    {
        name: "Atari 7800",
        path: "atari-7800-prosystem",
    },
    {
        name: "Famicom",
        path: "nintendo-famicom-disk-system",
    },
    {
        name: "Atari 5200",
        path: "atari-5200-supersystem",
    },
    {
        name: "Atari Jaguar",
        path: "atari-jaguar",
    },
    {
        name: "Atari Lynx",
        path: "atari-lynx",
    },
    {
        name: "Commodore VIC20",
        path: "commodore-vic20",
    },
    {
        name: "Commodore Plus4",
        path: "commodore-plus4-c16",
    },
    {
        name: "Amiga",
        path: "amiga-500",
    },
    {
        name: "Commodore PET",
        path: "commodore-pet",
    },
    {
        name: "Virtual Boy",
        path: "nintendo-virtual-boy",
    },
];

export default async function Home() {
    return (
        <App>
            <Flex gap="md" justify="center" align="center" mb="xl">
                <NextImage alt="logo" height={679 / 4 } width={759 / 4} src="/image/logo.png"></NextImage>
                <Text fw={500} fz={50}>blitzarcade</Text>
            </Flex>
            <Flex direction="row" wrap="wrap" justify="center" gap="xl">
                {platforms.map((platform) => (
                    <>
                        <Link
                            style={{ textDecoration: "none" }}
                            key={platform.path}
                            prefetch={false}
                            href={`/platform/${platform.path}/1`}
                        >
                            <Card
                                m="ms"
                                w={400}
                                h="100%"
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                            >
                                <CardSection mb="xs" mt="auto">
                                    <Image
                                        component={NextImage}
                                        src={`/image/${platform.path}.png`}
                                        width={350}
                                        height={0}
                                        h="auto"
                                        w="100%"

                                        alt="Console Art"
                                        priority
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
