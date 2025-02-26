import App from "@/app/app";
import Paginizer from "../../../pagination";
import { Card, CardSection, Image, Text, Flex, Title } from "@mantine/core";
import NextImage from "next/image";
import Link from "next/link";
import { parse } from "node-html-parser";
import { platforms } from "@/app/consoles";

interface Game {
    image: string;
    name: string;
    path: string;
}

export const dynamic = 'force-static';
export const fetchCache = 'force-cache';

type Props = {
    params: Promise<{ platform: string, page: string }>
}

export async function generateMetadata( { params }: Props) {
    const { platform, page } = await params;

    const platformName = platforms.find(path => path.path === platform)?.name || "Unknown Console"

    return {
        title: `blitzarcade: ${platformName}`,
        openGraph: {
            title: `blitzarcade: ${platformName}`,
            url: `https://blitzarcade.org/platform/${platform}/${page}`
        }
    }
}

export async function generateStaticParams() {
    const params = [];

    for (const platform of platforms) {
        const res = await fetch(`https://www.romsgames.net/roms/${platform.path}/`, {
            cache: "force-cache"
        });
        const html = await res.text();
        const pages =
            html.split(
                "flex items-center justify-center px-5 h-12 mx-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-950"
            ).length - 1 || 1;
        for (let i = 1; i <= pages; i++) {
            params.push({ platform: platform.path, page: i.toString() });
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

    const platformName = platforms.find(path => path.path === platform)?.name || "Unknown Console"

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
        <App breadcrumbs={[{ name: "Home", href: "/" }, { name: platformName, href: `/platform/${platform}/${page}` }]}>

            <Flex align="center" mb="md" gap="xl" direction="column">
                <Title>
                    {platformName}
                </Title>
                <Paginizer
                    pages={pages}
                    page={parseInt(page)}
                    platform={platform}
                />
            </Flex>
            <Flex direction="row" wrap="wrap" justify="center" gap="xl">
                {games.map((game) => (
                    <Link
                        style={{ textDecoration: "none", maxWidth: "400px", width: "400px" }}
                        prefetch={false}
                        href={`/game${game.path}`}
                        key={game.path}
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
                            <CardSection mb="xs">
                                <Image
                                    component={NextImage}
                                    src={game.image}
                                    width={350}
                                    height={0}
                                    w="100%"
                                    h="auto"
                                    alt="Cover Art"
                                    priority
                                    fallbackSrc="/image/no-cover.png"
                                />
                            </CardSection>

                            <Text fw={500} fz={20} ta="center">
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
