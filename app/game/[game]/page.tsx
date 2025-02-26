import { parse } from "node-html-parser";
import Emulator from "./emulator";
import App from "@/app/app";
import { platforms } from "@/app/consoles";

interface Game {
    id: number;
    image: string;
    name: string;
    rom: string;
    rating: number;
}

export const dynamic = "force-static";
export const fetchCache = "force-cache";

type Props = {
    params: Promise<{ game: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { game } = await params;

    const res = await fetch(`https://www.romsgames.net/${game}/`, {
        cache: "force-cache",
    });
    const html = await res.text();
    const root = parse(html);
    const json = JSON.parse(
        root.querySelector('[type="application/ld+json"]')?.innerText || "{}"
    );

    return {
        description: `${json.name}`,
        openGraph: {
            title: 'blitzarcade',
            description: `${json.name}`,
            url: `https://blitzarcade.org/game/${game}`,
            images: [{ url: json.image }],
            type: "website",
            locale: "en_US"
        },
    };
}

export default async function Game({
    params,
}: {
    params: Promise<{ game: string }>;
}) {
    const { game } = await params;
    let res = await fetch(`https://www.romsgames.net/${game}/`, {
        cache: "force-cache",
    });
    const html = await res.text();
    const root = parse(html);
    const json = JSON.parse(
        root.querySelector('[type="application/ld+json"]')?.innerText || "{}"
    );
    const mediaId = root
        .querySelector("[data-media-id]")
        ?.getAttribute("data-media-id");
    res = await fetch(`https://www.romsgames.net/${game}/?download`, {
        headers: {
            accept: "application/json",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: `mediaId=${mediaId}`,
        method: "POST",
        cache: "force-cache",
    });
    const data = await res.json();

    const rom = `${data.downloadUrl}?mediaId=${mediaId}&attach=${data.downloadName}`;

    const platform = platforms.find(
        (platform) => platform.system === json.gamePlatform
    );

    return (
        <App
            netplay={platform?.netplay}
            breadcrumbs={[
                { name: "Home", href: "/" },
                {
                    name: platform?.name || "Unknown Console",
                    href: `/platform/${platform?.path || "nintendo-ds"}/1`,
                },
                { name: json.name, href: '#' },
            ]}
        >
            <Emulator name={json.name} rom={rom} platform={json.gamePlatform} />
        </App>
    );
}
