export function preloader($scene, oncomplete) {
    const pbX = 240, pbY = 370;

    var progressBar = $scene.add.graphics();
    var progressBox = $scene.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(pbX, pbY, 320, 50);
    var width = $scene.cameras.main.width;
    var height = $scene.cameras.main.height;
    var loadingText = $scene.make.text({
        x: width/2,
        y: pbY - 30,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#000'
        }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = $scene.make.text({
        x: width / 2,
        y: pbY+25,
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
        progressBar.fillRect(pbX+10, pbY+10, 300 * value, 30);
        percentText.setText(parseInt(value * 100) + '%');
    });

    $scene.load.on('fileprogress', function (file) {
        console.log(file.src);
    });

    $scene.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        oncomplete()
    });
}