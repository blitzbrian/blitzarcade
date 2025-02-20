import App from "@/app/app";
import {
    Card,
    CardSection,
    Image,
    Text,
    Flex,
} from "@mantine/core";
import NextImage from "next/image";
import Link from "next/link";
import { parse } from "node-html-parser";

interface Game {
    id: number;
    image: string;
    name: string;
    path: string;
}

export const dynamic = 'force-static';
export const fetchCache = 'force-cache';

export default async function Search({
    params,
}: {
    params: Promise<{ search: string }>;
}) {
    const { search } = await params;

    const res = await fetch(`https://www.romsgames.net/search/?q=${search}`, {
        cache: "force-cache"
    });

    const html = await res.text();
    const root = parse(html);

    const games: Game[] = root
        .querySelectorAll("a.p-2.transform.transition-all.duration-300")
        .map((element, i) => ({
            id: i || 1,
            image:
                element.querySelector("img")?.getAttribute("src") ||
                "/image/no-cover.png",
                name:
                element.querySelector("div")?.innerText.trim() ||
                "Unknown game",
            path: element.getAttribute("href") || "#",
        }));


        return (
        <App breadcrumbs={[{ name: "Home", href: "/" }, { name: search, href: `/search/${search}` }]}>
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
        </App>
    );
}
