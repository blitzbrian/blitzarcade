import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Card,
  CardSection,
  Image,
  Text,
  Button,
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

// Store the cache for a day
export const revalidate = 86400;

export const dynamicParams = false;

export async function generateStaticParams() {
  let params = [];
  const platforms = ["nintendo-ds", "gameboy-advance"];

  for (const platform of platforms) {
    const res = await fetch(`https://www.romsgames.net/roms/${platform}/`);
    const html = await res.text();
    const pages =
      html.split(
        "flex items-center justify-center px-5 h-12 mx-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-950"
      ).length - 1;
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
    `https://www.romsgames.net/roms/${platform}/?page=${page}&sort=popularity`
  );
  const html = await res.text();
  const root = parse(html);
  const games: Game[] = root
    .querySelectorAll("a.p-2.transform.transition-all.duration-300")
    .map((element, i) => ({
      id: i || 1,
      image:
        element.querySelector("img")?.getAttribute("src") ||
        "https://cache.downloadroms.io/static/e240d3cbd93b644721ffa992c189a129fd75730f/image.jpeg",
      name:
        element.querySelector("div")?.innerText.trim() || "Yoshi's Island DS",
      path: element.getAttribute("href") || "/404",
    }));

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShellHeader>
        <div>Logo</div>
      </AppShellHeader>

      <AppShellMain>
        <Flex direction="row" wrap="wrap" justify="center" gap="xl">
          {games.map((game) => (
            <Card m="ms" w={400} key={game.id} shadow="sm" padding="lg" radius="md" withBorder>
              <CardSection>
                <Image
                  component={NextImage}
                  src={game.image}
                  height={350}
                  width={350}
                  alt="Cover Art"
                />
              </CardSection>

              <Text fw={500} fz={20} ta="center" mt="xs" mb={0}>{game.name}</Text>

              <Button color="blue" fullWidth mt="auto" radius="md">
                Play
              </Button>
            </Card>
          ))}
        </Flex>
      </AppShellMain>
    </AppShell>
  );
}
