export function preload($scene) {
    preloader($scene);
    const base = document.querySelector("base");
    let baseHref = "";
    if (base)
        baseHref = base.getAttribute("href");
    $scene.load.atlasXML('sheet', baseHref + '/assets/Spritesheet/sheet.png', baseHref + '/assets/Spritesheet/sheet.xml');
}

function preloader($scene) {
    var progressBar = $scene.add.graphics();
    var progressBox = $scene.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    var width = $scene.cameras.main.width;
    var height = $scene.cameras.main.height;
    var loadingText = $scene.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = $scene.make.text({
        x: width / 2,
        y: 295,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);

    $scene.load.on('progress', function (value) {
        console.log(value);
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(250, 280, 300 * value, 30);
        percentText.setText(parseInt(value * 100) + '%');
    });

    $scene.load.on('fileprogress', function (file) {
        console.log(file.src);
    });

    $scene.load.on('complete', function () {
        console.log('complete');
        console.log($scene.scene.key + ' is loaded');
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
    });
}
