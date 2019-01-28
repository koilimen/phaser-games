export function update($scene){
        let camera = $scene.cameras.getCamera('imagesCamera');
    if ($scene.cursors.up.isDown) {
        camera.setScroll(0, camera.scrollY - 10);
    } else if ($scene.cursors.down.isDown) {
        camera.setScroll(0, camera.scrollY + 10);
    }
}