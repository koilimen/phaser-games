const Utils = {
    createText: function(text, $scene){
        let offset = 0;
        for (let i = 0; i < text.length; i++) {
            if (word[i] !== ' ') {
                const letter = $scene.add.image(leftCorner + offset, topCorner, 'sheet', 'letter' + word[i].toUpperCase() + '.png');
                offset += letter.displayWidth;
            } else {
                offset += offset / i;
            }
        }
    }
}