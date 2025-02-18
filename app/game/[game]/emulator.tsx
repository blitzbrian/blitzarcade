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
        <iframe style={{ margin: 0, height: '100%', width: '100%', border: 'none' }} src={`/emulator.html?rom=${rom}&core=${core}&name=${name}`}>

        </iframe>
    </>)
}