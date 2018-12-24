import {GameScene} from "./game/gameScene";
import {MenuScene} from "./menu/MenuScene";

let game;
window.addEventListener("load", function (event) {
    const config = {
        title: "Tappy plane",
        version: '0.1',
        disableContextMenu: true,
        type: Phaser.WEBGL,
        width: 800,
        height: 480,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 300
                },
                debug: false
            }
        },
        scene: [MenuScene, GameScene]
    };
    console.log("All resources finished loading!");
    game = new Phaser.Game(config);
    window.addEventListener('resize', resize);
    resize();

});


function resize() {
    const canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
    const wratio = width / height, ratio = canvas.width / canvas.height;

    if (wratio < ratio) {
        canvas.style.width = width + "px";
        canvas.style.height = (width / ratio) + "px";
    } else {
        canvas.style.width = (height * ratio) + "px";
        canvas.style.height = height + "px";
    }
}
