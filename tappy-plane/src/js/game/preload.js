export function preload(){
	const $scene = this;
    $scene.load.atlasXML('sheet', '/assets/Spritesheet/sheet.png', '/assets/Spritesheet/sheet.xml');
    console.log("Scene "+ $scene.key+" is loaded")
}