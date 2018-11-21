import {preload} from "./preload";
import {create} from "./create";
import {update} from "./update";

class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MenuScene",
            active: true,
            visible: true
        })
    }

    preload() {
        preload(this);
    }


    update() {
        update(this);
    }

    create() {
        create(this);
    }
}

export {MenuScene}