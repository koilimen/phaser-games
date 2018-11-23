let game;
let isPaused = false;

export function create() {
    const $scene = this;
    game = $scene.game;
    $scene.anims.create({
        key: 'plane',
        repeat: -1,
        frameRate: 24,
        frames: $scene.anims.generateFrameNames('sheet', {start: 1, end: 3, prefix: 'planeBlue', suffix: '.png'})
    });
    $scene.bg = $scene.add.tileSprite(0, 0, 800, 480, 'sheet', 'background.png').setOrigin(0);
    let grounds = $scene.physics.add.staticGroup();
    $scene.groundBottom = $scene.add.tileSprite(0, 409, 800, 71, 'sheet', 'groundDirt.png').setOrigin(0);
    $scene.groundTop = $scene.add.tileSprite(0, 0, 800, 71, 'sheet', 'groundDirt.png').setOrigin(0);
    grounds.add($scene.groundBottom);
    grounds.add($scene.groundTop);
    $scene.groundTop.body.setSize(800,71);
    $scene.groundBottom.body.setSize(800,71);
    $scene.groundTop.flipX = true;
    $scene.groundTop.flipY = true;
    $scene.plane = $scene.physics.add.sprite(400, 300, 'sheet').play('plane');
    $scene.plane.setOrigin(1,0.5);
    $scene.physics.add.overlap($scene.plane, grounds, () => {
        console.log("Bang");
    });
    // $scene.infoText = $scene.add.text(16, 16, 'Velosity: '+$scene.plane.body._dy, {
    //     fontSize: '22px',
    //     fill: '#900',
    //     fontFamily: 'kenvector future thin'
    // });
    window.addEventListener('resize', resize);
}

function resize() {
    const canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
    const wratio = width / height, ratio = canvas.width / canvas.height;

    if (wratio < ratio) {
        canvas.style.width = width + "px";
        canvas.style.height = (width / ratio) + "px";
    } else {
        canvas.style.width = (height * ratio) + "px";
        canvas.style.height = height + "px";
    }
}

