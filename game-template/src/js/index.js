import {preload} from "./preload";
import {create} from "./create";
import {update} from "./update";

const config = {
    title: "Little Puzzle",
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
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);




