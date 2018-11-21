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
    $scene.plane = $scene.physics.add.sprite(400, 300, 'sheet').play('plane');
    const pauseText = this.add.text(16, 16, 'pause', {
        fontSize: '32px',
        fill: '#900',
        fontFamily: 'kenvector future thin'
    });
    pauseText.setInteractive(new Phaser.Geom.Rectangle(0, 0, pauseText.width, pauseText.height), Phaser.Geom.Rectangle.Contains);
    pauseText.on('pointerdown', pause);
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

function pause() {
    isPaused = !isPaused;
    if (isPaused) {
        game.scene.resume('default')
    } else {
        game.scene.pause('default')
    }
}