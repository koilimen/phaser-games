import {GameScene} from "./game/gameScene";
import {MenuScene} from "./menu/MenuScene";


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
            debug: true
        }
    },
    scene: [MenuScene, GameScene]
};
window.addEventListener("load", function (event) {
    console.log("All resources finished loading!");
    const game = new Phaser.Game(config);
});



