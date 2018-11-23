const speed = 3;

export function update() {
    const $scene = this;
    $scene.groundBottom.tilePositionX += speed;
    $scene.groundTop.tilePositionX -= speed;
    $scene.input.on('pointerdown', (event) => {
        $scene.plane.setVelocityY(-250);

    });
    $scene.plane.angle = 180 * Math.atan(($scene.plane.body._dy) / 3) / Math.PI


}