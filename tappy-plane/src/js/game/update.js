export function update() {
    const $scene = this;
    $scene.groundBottom.tilePositionX += $scene.speed;
    $scene.groundTop.tilePositionX -= $scene.speed;
   

    $scene.plane.angle = 180 * Math.atan(($scene.plane.body._dy) / 3) / Math.PI
    if ($scene.rocks && $scene.rocks.length !== 0) {
        let toDestroy = [];
        $scene.rocks.forEach((rock, index) => {
            rock.setX(rock.x - $scene.speed);
            rock.refreshBody();
            rock.body.setSize(54, 239);
            rock.body.setOffset(0);
            if (rock.x < 0) {
                toDestroy.push(index);
            }
        })
        toDestroy.forEach((i) => {
            const dstr = $scene.rocks.splice(i, 1);
            dstr[0].destroy();
        })
        
    }


}