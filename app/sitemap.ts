import { MetadataRoute } from "next";
import { platforms } from "./consoles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const baseUrl = "https://blitzarcade.org";

    const pages: MetadataRoute.Sitemap = [];

    for (const platform of platforms) {
        const res = await fetch(`https://www.romsgames.net/roms/${platform.path}/`, {
            cache: "force-cache"
        });
        const html = await res.text();
        const p =
            html.split(
                "flex items-center justify-center px-5 h-12 mx-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-950"
            ).length - 1 || 1;

        for (let i = 1; i <= p; i++) {
            pages.push({ url: `${baseUrl}/${platform.path}/${i}`, lastModified: new Date(), priority: 0.5, changeFrequency: 'daily' });
        }
    }

    return [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            priority: 1,
            changeFrequency: 'weekly'
        },
        ...pages,
    ];
}
