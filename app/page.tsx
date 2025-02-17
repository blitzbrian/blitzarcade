import { AppShell, AppShellHeader, AppShellMain, Card, CardSection, Image, Text, Button, Rating, Flex } from '@mantine/core';
import NextImage from 'next/image';


interface Game {
  id: number;
  image: string;
  rom: string;
  name: string;
  platform: 'Nintendo DS';
  rating: number;
}

// Store the cache for a day
export const revalidate = 86400;

export const dynamicParams = true;

export default async function Home() {
  return (<></>
  );
}
