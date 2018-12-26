let height = 0;

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
            star.setVisible(false);
        }
        if (star.x < -60) {
            star.setX(1540);
            height = $scene.getRandomYPosition();
            star.setY(height - 300);
            star.setVisible(true);
        }
    });
    $scene.rocks.children.each((rock, index) => {
        rock.setX(rock.x - $scene.speed);
        rock.refreshBody();
        rock.body.setSize(14, 239);
        rock._displayOriginX = 114;
        if (rock.x < -60) {
            rock.setX(1540);
            // const height = getRandomYPosition();
            if ((index + 1) % 2 === 0)
                rock.setY(height - 608);
            else {
                rock.setY(height);
            }
        }
    });
}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    let intersection = Phaser.Geom.Rectangle.Intersection(boundsA, boundsB);
    return spriteA.visible && spriteB.visible && intersection.width > 0 && intersection.height > 0;

}