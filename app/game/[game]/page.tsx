import { parse } from "node-html-parser";
import Emulator from "./emulator";

interface Game {
  id: number;
  image: string;
  name: string;
  rom: string;
  rating: number;
}

// Store the cache for a day
export const revalidate = 86400;

export const dynamicParams = false;

//   export async function generateStaticParams() {
//     let params = [];
//     const platforms = ["nintendo-ds", "gameboy-advance"];

//     for (const platform of platforms) {
//       const res = await fetch(`https://www.romsgames.net/roms/${platform}/`);
//       const html = await res.text();
//       const pages =
//         html.split(
//           "flex items-center justify-center px-5 h-12 mx-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-950"
//         ).length - 1;
//       for (let i = 1; i <= pages; i++) {
//         params.push({ platform, page: i.toString() });
//       }
//     }
//     return params;
//   }

export default async function Game({
  params,
}: {
  params: Promise<{ game: string }>;
}) {
  const { game } = await params;
  let res = await fetch(`https://www.romsgames.net/${game}/`);
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
  });
  const data = await res.json();

  const rom = `${data.downloadUrl}?mediaId=${mediaId}&attach=${data.downloadName}`;

  // console.log(json, data);

  // console.log(json.gamePlatform)

  return (
    <Emulator name={json.name} rom={rom} platform={json.gamePlatform} />
  );
}
