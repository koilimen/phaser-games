export function preload($scene) {
    const base = document.querySelector("base");
    let baseHref = "";
    if (base)
        baseHref = base.getAttribute("href");
    $scene.load.image('puzzleFace', baseHref + '/assets/puzzle_face.png');
    $scene.load.image("track", baseHref+"/assets/track.png");
    $scene.load.spritesheet('bar', baseHref+ '/assets/bar.png', { frameWidth: 22, frameHeight: 44 });
}




