const cores = {
    "Gameboy Advance": "gba",
    "Gameboy": "gb",
    "Gameboy Color": "gb",
    "Nintendo": "nes",
    "Nintendo 64": "n64",
    "Nintendo DS": "nds",
    "Playstation Portable": "psp",
    "Playstation": "pcsx_rearmed",
    "Nintendo Famicom Disk System": "famicom"
}



export default function Emulator({ rom, name, platform } : { rom: string, name: string, platform: string }) {
    const core = cores[platform as keyof typeof cores];


    return (<>
        <iframe style={{ position: 'absolute', top: 0, bottom: 0, height: '100vh', width: '100vw', border: 'none', overflow: 'hidden' }} src={`/emulator.html?rom=${rom}&core=${core}&name=${name}`}>

        </iframe>
    </>)
}