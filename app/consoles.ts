interface Platform {
    name: string;
    path: string;
    core: string;
    system: string;
    netplay?: number;
}

export const platforms: Platform[] = [
    {
        name: "Nintendo DS",
        path: "nintendo-ds",
        core: "desmume",
        system: "Nintendo DS",
    },
    {
        name: "Gameboy Advance",
        path: "gameboy-advance",
        core: "gba",
        system: "Gameboy Advance"
    },
    {
        name: "Playstation Portable",
        path: "playstation-portable",
        core: "psp",
        system: "Playstation Portable"
    },
    {
        name: "Nintendo",
        path: "nintendo",
        core: "nes",
        system: "Nintendo",
        netplay: 1
    },
    {
        name: "Nintendo 64",
        path: "nintendo-64",
        core: "n64",
        system: "Nintendo 64",
        netplay: 1
    },
    {
        name: "Playstation",
        path: "playstation",
        core: "mednafen_psx_hw",
        system: "Playstation"
    },
    {
        name: "Super Nintendo",
        path: "super-nintendo",
        core: "snes",
        system: "Super Nintendo",
        netplay: 1
    },
    {
        name: "Gameboy",
        path: "gameboy",
        core: "gb",
        system: "Gameboy"
    },
    {
        name: "Gameboy Color",
        path: "gameboy-color",
        core: "gb",
        system: "Gameboy Color"
    },
    {
        name: "Sega Saturn",
        path: "sega-saturn",
        core: "segaSaturn",
        system: "Sega Saturn"
    },
    {
        name: "Atari 2600",
        path: "atari-2600",
        core: "atari2600",
        system: "Atari 2600",
        netplay: 1
    },
    {
        name: "Mame",
        path: "mame-037b11",
        core: "mame2003",
        system: "MAME 037b11",
    },
    {
        name: "Sega Master System",
        path: "sega-master-system",
        core: "segaMS",
        system: "Sega Master System",
        netplay: 1
    },
    {
        name: "Game Gear",
        path: "game-gear",
        core: "segaGG",
        system: "Game Gear"
    },
    {
        name: "Commodore 64",
        path: "commodore-64",
        core: "c64",
        system: "Commodore 64"
    },
    {
        name: "Sega 32x",
        path: "sega-32x",
        core: "sega32x",
        system: "Sega 32X",
        netplay: 1
    },
    {
        name: "Atari 7800",
        path: "atari-7800-prosystem",
        core: "atari7800",
        system: "Atari 7800 ProSystem"
    },
    {
        name: "Famicom",
        path: "nintendo-famicom-disk-system",
        core: "famicom",
        system: "Nintendo Famicom Disk System"
    },
    {
        name: "Atari 5200",
        path: "atari-5200-supersystem",
        core: "atari5200",
        system: "Atari 5200 SuperSystem"
    },
    {
        name: "Atari Jaguar",
        path: "atari-jaguar",
        core: "jaguar",
        system: "Atari Jaguar"
    },
    {
        name: "Atari Lynx",
        path: "atari-lynx",
        core: "lynx",
        system: "Atari Lynx"
    },
    {
        name: "Commodore VIC20",
        path: "commodore-vic20",
        core: "vic20",
        system: "Commodore VIC20"
    },
    {
        name: "Commodore Plus4",
        path: "commodore-plus4-c16",
        core: "plus4",
        system: "Commodore Plus4 C16"
    },
    {
        name: "Amiga",
        path: "amiga-500",
        core: "amiga",
        system: "Amiga 500"
    },
    {
        name: "Commodore Pet",
        path: "commodore-pet",
        core: "pet",
        system: "Commodore Pet"
    },
    {
        name: "Virtual Boy",
        path: "nintendo-virtual-boy",
        core: "vb",
        system: "Nintendo Virtual Boy"
    },
];