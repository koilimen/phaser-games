export function update() {
    const $scene = this;
    $scene.groundBottom.tilePositionX += $scene.speed;
    $scene.groundTop.tilePositionX -= $scene.speed;

    $scene.plane.angle = 180 * Math.atan(($scene.plane.body._dy) / 3) / Math.PI;
    $scene.stars.forEach((star, i) => {
        star.setX(star.x - $scene.speed);
        if (checkOverlap(star, $scene.plane)) {
            console.log("addScore");
            $scene.score += 10;
            $scene.scoreTxt.setText("Score: " + $scene.score);
            star.destroy();
            $scene.stars.splice(i,1)
        }
    });
    if ($scene.rocks && $scene.rocks.length !== 0) {
        $scene.rocks.forEach((rock, index) => {
            rock.setX(rock.x - $scene.speed);
            rock.refreshBody();
            rock.body.setSize(14, 239);
            rock._displayOriginX = 114;
            if (rock.x < -100) {
                rock.destroy();
                $scene.rocks.splice(index, 1);
            }
        });
    }
}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    let intersection = Phaser.Geom.Rectangle.Intersection(boundsA, boundsB);
    return intersection.width > 0 && intersection.height > 0;

}