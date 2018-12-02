let game;


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
    $scene.groundTop = $scene.add.tileSprite(game.canvas.width, 71, 800, 71, 'sheet', 'groundDirt.png').setOrigin(0);
    grounds.add($scene.groundBottom);
    grounds.add($scene.groundTop);
    $scene.groundTop.body.setSize(800, 45);
    $scene.groundTop.body.setOffset(-800, -71);
    
    $scene.groundBottom.body.setOffset(0, 20);
    // $scene.groundBottom.setInteractive(polygon);
    $scene.groundTop.flipX = true;
    $scene.groundTop.flipY = true;
    $scene.plane = $scene.physics.add.sprite(400, 300, 'sheet').play('plane');
    $scene.plane.setOrigin(0.5, 0.5);
    $scene.plane.body.setSize(88, 73);
    $scene.physics.add.overlap($scene.plane, grounds, () => {
        planeCrash($scene);
    });
    window.addEventListener('resize', resize);
    $scene.rocks = [];
    $scene.time.addEvent({
        delay:2000,
        loop:true,
        callback: () => {
            const height = getRoackRandomHeight()
            const rock1 = grounds.create(900, height, 'sheet', 'rock.png').setOrigin(0);
            const rock2 = grounds.create(900, height-380, 'sheet', 'rock.png').setOrigin(0);
            rock2.flipY = true;
            $scene.rocks.push(rock1);        
            $scene.rocks.push(rock2);        

        }
    });
    $scene.input.on('pointerdown', (event) => {
        $scene.plane.setVelocityY(-230);

    });
}

function getRoackRandomHeight(){
    const min = 380;
    const max = min+239;
    return Math.random() * (max - min) + min;
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

function planeCrash($scene) {
    $scene.speed = 0;
    const x = $scene.plane.x;
    const y = $scene.plane.y;
    console.log("Crashed in: (" + x + "; " + y + ")");
    $scene.physics.pause();
    $scene.plane.setVisible(false);
    $scene.add.sprite(x, y+30, 'sheet').play('poofing');
    $scene.add.image(400, 200, 'sheet', 'textGameOver.png');

}