let game;
const textStyle = {
    fontFamily: 'kenvector future thin',
    fontSize: 22,
    color: '#000'
};

export function create() {
    const $scene = this;
    $scene.speed = 3;

    game = $scene.game;

    $scene.anims.create({
        key: 'plane',
        repeat: -1,
        frameRate: 24,
        frames: $scene.anims.generateFrameNames('sheet', {start: 1, end: 3, prefix: 'planeBlue', suffix: '.png'})
    });
    $scene.anims.create({
        key: 'poofing',
        repeat: 0,
        frameRate: 7,
        hideOnComplete: true,
        frames: [{
            key: 'sheet',
            frame: 'puffSmall.png'
        }, {
            key: 'sheet',
            frame: 'puffLarge.png'
        }
        ]
    });
    $scene.bg = $scene.add.tileSprite(0, 0, 800, 480, 'sheet', 'background.png').setOrigin(0);
    let grounds = $scene.physics.add.staticGroup();
    $scene.groundBottom = $scene.add.tileSprite(0, 409, 800, 71, 'sheet', 'groundDirt.png').setOrigin(0);
    $scene.groundTop = $scene.add.tileSprite(0, 0, 800, 71, 'sheet', 'groundDirt.png').setOrigin(0);
    grounds.add($scene.groundBottom);
    grounds.add($scene.groundTop);
    $scene.groundTop.body.setSize(800, 45);
    // $scene.groundTop.body.setOffset(-800, -71);

    $scene.groundBottom.body.setOffset(0, 20);
    // $scene.groundBottom.setInteractive(polygon);
    $scene.groundTop.flipX = true;
    $scene.groundTop.flipY = true;
    $scene.plane = $scene.physics.add.sprite(400, 300, 'sheet').play('plane');
    $scene.plane.setOrigin(0.5, 0.5);
    $scene.plane.body.setSize(65, 56);
    $scene.physics.add.overlap($scene.plane, grounds, () => {
        planeCrash($scene);
    });
    $scene.rocks = [];
    $scene.stars = [];
    $scene.time.addEvent({
        delay: 2000,
        loop: true,
        callback: () => {
            const height = getRandomYPosition();
            const rock1 = grounds.create(900, height, 'sheet', 'rock.png').setOrigin(0.5, 1);
            const rock2 = grounds.create(900, height - 603, 'sheet', 'rockDown.png').setOrigin(0.5, 0);
            $scene.rocks.push(rock1);
            $scene.rocks.push(rock2);
            $scene.stars.push($scene.add.image(855, height / 2 - 20, 'sheet', 'starGold.png'));

        }
    });
    $scene.input.on('pointerdown', (event) => {
        $scene.plane.setVelocityY(-230);

    });
    $scene.score = 0;
    $scene.scoreTxt = $scene.add.text(10, 10, "Score: 0", textStyle);
}

function getRandomYPosition() {
    const min = 480;
    const max = min + 239 / 2;
    return Math.random() * (max - min) + min;
}




function planeCrash($scene) {
    $scene.speed = 0;
    const x = $scene.plane.x;
    const y = $scene.plane.y;
    $scene.physics.pause();
    $scene.plane.setVisible(false);
    $scene.add.sprite(x, y, 'sheet').play('poofing');
    setTimeout(() => {

        $scene.add.image(400, 100, 'sheet', 'textGameOver.png');
        $scene.add.image(400, 300, 'sheet', 'UIbg.png');
        $scene.add.image(400, 270, 'sheet', 'starGold.png');
        $scene.add.text(310, 200, 'Your Score: ' + $scene.score, textStyle);
        $scene.add.text(310, 320, 'Tap to restart', textStyle);
        $scene.stopCount = true;
        $scene.input.on('pointerdown', (event) => {
            console.log("Pointer down");
            $scene.scene.restart();
            $scene.stopCount = false;

        });
    }, 1000);

}


