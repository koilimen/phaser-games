export function update(){
    const $scene = this;
    $scene.bg.tilePositionX += 1;
    const activePointer = $scene.input.activePointer;
    if (activePointer.isDown) {
        $scene.plane.setVelocityY(-250);
    }

}