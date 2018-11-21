import {preload} from "./preload";
import {create} from "./create";
import {update} from "./update";

let GameScene =  {
    key: "GameScene",
    active: false,
    visible: false,
    preload: preload,
    create: create,
    update: update
};

export {GameScene}