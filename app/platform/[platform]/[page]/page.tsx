import App from "@/app/app";
import Paginizer from "@/app/pagination";
import { Card, CardSection, Image, Text, Flex } from "@mantine/core";
import NextImage from "next/image";
import Link from "next/link";
import { parse } from "node-html-parser";

interface Game {
    image: string;
    name: string;
    path: string;
}

// Store the cache for a day
export const dynamic = 'force-static';
export const fetchCache = 'force-cache';


export async function generateStaticParams() {
    const params = [];
    const platforms = [
        "nintendo-ds",
        "gameboy-advance",
        "playstation-portable",
        "nintendo",
        "nintendo-64",
        "playstation",
        "super-nintendo",
        "gameboy",
        "gameboy-color",
        "sega-saturn",
        "atari-2600",
        "mame-037b11",
        "sega-master-system",
        "game-gear",
        "commodore-64",
        "sega-32x",
        "atari-7800-prosystem",
        "nintendo-famicom-disk-system",
        "atari-5200-supersystem",
        "nintendo-virtual-boy",
        "atari-jaguar",
        "atari-lynx",
        "commodore-vic20",
        "commodore-plus4-c16",
        "amiga-500",
        "commodore-pet",
    ];

    for (const platform of platforms) {
        const res = await fetch(`https://www.romsgames.net/roms/${platform}/`, {
            cache: "force-cache"
        });
        const html = await res.text();
        const pages =
            html.split(
                "flex items-center justify-center px-5 h-12 mx-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-950"
            ).length - 1 || 1;
        for (let i = 1; i <= pages; i++) {
            params.push({ platform, page: i.toString() });
        }
    }
    return params;
}

export default async function Games({
    params,
}: {
    params: Promise<{ platform: string; page: string }>;
}) {
    const { platform, page } = await params;
    const res = await fetch(
        `https://www.romsgames.net/roms/${platform}/?page=${page}&sort=popularity`,
        {
            cache: "force-cache"
        }
    );
    const html = await res.text();
    const pages =
        html.split(
            "flex items-center justify-center px-5 h-12 mx-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-950"
        ).length - 1 || 1;
    const root = parse(html);

    const games: Game[] = root
        .querySelectorAll("a.p-2.transform.transition-all.duration-300")
        .map((element) => {
            let image = element.querySelector("img")?.getAttribute("src");
            if (image?.startsWith("//"))
                image = image.replace("//", "https://");

            return {
                image: image || "/image/no-cover.png",
                name: parse(
                    element.querySelector("div")?.innerText.trim() ||
                        "Unknown game"
                ).text,
                path: element.getAttribute("href") || "#",
            };
        });

    return (
        <App>
            <Flex justify="center" m="md">
                <Paginizer
                    pages={pages}
                    page={parseInt(page)}
                    platform={platform}
                />
            </Flex>
            <Flex direction="row" wrap="wrap" justify="center" gap="xl">
                {games.map((game) => (
                    <Link
                        style={{ textDecoration: "none" }}
                        prefetch={false}
                        href={`/game${game.path}`}
                        key={game.path}
                    >
                        <Card
                            m="ms"
                            w={400}
                            shadow="sm"
                            padding="lg"
                            radius="md"
                            withBorder
                        >
                            <CardSection mb="xs">
                                <Image
                                    component={NextImage}
                                    src={game.image}
                                    width={350}
                                    height={0}
                                    w="400"
                                    h="auto"
                                    alt="Cover Art"
                                    priority
                                />
                            </CardSection>

                            <Text fw={500} fz={20} ta="center" mt="auto" mb={0}>
                                {game.name}
                            </Text>
                        </Card>
                    </Link>
                ))}
            </Flex>

            <Flex justify="center" mt="md">
                <Paginizer
                    pages={pages}
                    page={parseInt(page)}
                    platform={platform}
                />
            </Flex>
        </App>
    );
}
