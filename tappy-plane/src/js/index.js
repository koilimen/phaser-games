import {GameScene} from "./game/gameScene";


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
    scene: [GameScene]
};
window.addEventListener("load", function (event) {
    console.log("All resources finished loading!");
    const game = new Phaser.Game(config);
});



