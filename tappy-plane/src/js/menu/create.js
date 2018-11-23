let game;

export function create($scene) {
    game = $scene.game;
    $scene.add.image(0, 0, 'sheet', 'background.png').setOrigin(0);
    $scene.add.image(0, 409, 'sheet', 'groundDirt.png').setOrigin(0);
    $scene.add.image(600, 359, 'sheet', 'rock.png');
    let rockTop = $scene.add.image(0, 0, 'sheet', 'groundDirt.png');
    rockTop.flipX = true;
    rockTop.flipY = true;
    rockTop.setOrigin(0);
    let plane1 = $scene.add.image(130, 200, 'sheet', 'planeBlue1.png');
    plane1.angle = -25;
    let plane2 = $scene.add.image(160, 290, 'sheet', 'planeRed2.png');
    plane2.flipX = true;
    $scene.anims.create({
        key: 'tapTicking',
        repeat: -1,
        frameRate: 2,
        frames: [{
            key: 'sheet',
            frame: 'tap.png'
        }, {
            key: 'sheet',
            frame: 'tapTick.png'
        }
        ]
    })
    ;
    $scene.add.sprite(410, 250, 'sheet').play('tapTicking');
    let tapLeft = $scene.add.image(480, 210, 'sheet', 'tapLeft.png');
    tapLeft.angle = -30;
    let tapRight = $scene.add.image(350, 290, 'sheet', 'tapRight.png');
    tapRight.angle = -30;

    // adding "Tappy plane" text
    const topCorner = 100;
    const leftCorner = 150;
    const word = "tappy plane";
    let offset = 0;
    for (let i = 0; i < word.length; i++) {
        if (word[i] !== ' ') {
            const letter = $scene.add.image(leftCorner + offset, topCorner, 'sheet', 'letter' + word[i].toUpperCase() + '.png');
            offset += letter.displayWidth;
        } else {
            offset += offset / i;
        }
    }
    $scene.input.on('pointerdown', (event) => {
        console.log("Pointer down");
        $scene.scene.sleep("MenuScene");
        $scene.scene.run("GameScene");

    });
}

