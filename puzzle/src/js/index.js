import {MenuScene} from "./menu/MenuScene";

let game;
window.addEventListener("load", function (event) {
    const config = {
        title: "Puzzle",
        version: '0.1',
        disableContextMenu: true,
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 300
                },
                debug: true
            }
        },
        scene: [MenuScene]
    };
    console.log("All resources finished loading!");
    game = new Phaser.Game(config);

});

