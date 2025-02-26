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
    image: string;
    name: string;
    path: string;
}

type Props = {
    params: Promise<{ search: string }>
}

export async function generateMetadata( { params }: Props) {
    const { search } = await params;

    return {
        description: `Search for ${decodeURI(search)}`,
        openGraph: {
            title: 'blitzarcade',
            description: `Search for: ${decodeURI(search)}`,
            url: `https://blitzarcade.org/search/${search}`,
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
        <App breadcrumbs={[{ name: "Home", href: "/" }, { name: "Search", href: "#" }, { name: decodeURI(search), href: `#` }]}>
            <Flex direction="row" wrap="wrap" justify="center" gap="xl">
                {games.map((game, i) => (
                    <Link
                        style={{ textDecoration: "none", width: "400px", maxWidth: "400px" }}
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
                                    priority={i <= 6}
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
