import {preloader} from "../utils/preloader";

let game;

export function create($scene) {
    game = $scene.game;
    let face = $scene.add.image(400, 200, 'puzzleFace');
    $scene.cameras.main.setBackgroundColor('#eee');
    face.setScale(0.5);
    preloader($scene, oncomplete);
    game.puzzle_images = {pageNum: 1};
    game.puzzle_images.prefix = '/assets/images/page' + (game.puzzle_images.pageNum);
    for (let i = 0; i < 5; i++) {
        $scene.load.image('puzzle_image' + (i + 1), game.puzzle_images.prefix + '/image' + (i + 1) + '.jpg');
    }
    $scene.load.start();
    $scene.cursors = $scene.input.keyboard.createCursorKeys()

    function oncomplete() {
        const tweenDuration = 1000;
        $scene.tweens.add({
            targets: face,
            props: {
                x: {value: 400, duration: tweenDuration},
                y: {value: 50, duration: tweenDuration},
                scaleX: {value: 0.2, duration: tweenDuration},
                scaleY: {value: 0.2, duration: tweenDuration},
            },
            ease: 'Sine.easeInOut',
            yoyo: false,
            repeat: 0,
            onComplete: function () {
                $scene.cameras.add(200, 140, 400, 460, false, 'imagesCamera');
                $scene.cameras.getCamera("imagesCamera").ignore(face);
                for (let i = 0; i < 5; i++) {
                    let image = $scene.add.image(200, 170+ i * 320, 'puzzle_image' + (i + 1));
                    image.setScale(0.5);
                    $scene.cameras.main.ignore(image);
                }


            }
        });
    }
}



