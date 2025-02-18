const cores = {
    "Gameboy Advance": "gba",
    "Gameboy": "gb",
    "Gameboy Color": "gb",
    "Nintendo": "nes",
    "Nintendo 64": "n64",
    "Nintendo DS": "desmume",
    "Playstation Portable": "psp",
    "Playstation": "mednafen_psx_hw",
    "Nintendo Famicom Disk System": "famicom",
    "Nintendo Virtual Boy": "vb",
    "Super Nintendo": "snes",
    "Sega Saturn": "segaSaturn",
    "Atari 2600": "atari2600",
    "MAME 037b11": "mame2003",
    "Sega Master System": "segaMS",
    "Game Gear": "segaGG",
    "Commodore 64": "c64",
    "Sega 32X": "sega32x",
    "Atari 7800 ProSystem": "atari7800",
    "Atari 5200 SuperSystem": "atari5200",
    "Atari Jaguar": "jaguar",
    "Atari Lynx": "lynx",
    "Commodore VIC20": "vic20",
    "Commodore Plus4 C16": "plus4",
    "Amiga 500": "amiga",
    "Commodore Pet": "pet"
}



export default function Emulator({ rom, name, platform } : { rom: string, name: string, platform: string }) {
    const core = cores[platform as keyof typeof cores];


    return (<>
        <iframe style={{ position: 'absolute', top: 0, bottom: 0, height: '100vh', width: '100vw', border: 'none', overflow: 'hidden' }} src={`/emulator.html?rom=${rom}&core=${core}&name=${name}`}>

        </iframe>
    </>)
}