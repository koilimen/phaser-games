export function create() {
    let fsp;
    //todo перемешать части
    let x_offset = 0;
    let y_offset = 0;
    this.imagesPool = [];
    this.imagesPool.push([]);
    let scene = this;
    let row=0;
    Object.keys(this.cache.json.entries.entries.sheet.frames)
        .sort((a, b) => { return Math.random() - 0.5 })
        .forEach((k) => {
            const part = this.cache.json.entries.entries.sheet.frames[k];
            if (x_offset >= part.sourceSize.w) {
                x_offset = 0;
                y_offset += part.frame.h + 1;
                row++;
                scene.imagesPool.push([]);
            }
            x_offset += part.frame.w + 1
            const partImage = this.add.image(x_offset, y_offset, 'sheet', k);
            scene.imagesPool[row].push(partImage);
            partImage.setInteractive();
            partImage.on('pointerdown', function (e) {
                if (fsp) {
                    const px = partImage.x;
                    const py = partImage.y;
                    partImage.x = fsp.x;
                    partImage.y = fsp.y;
                    fsp.x = px;
                    fsp.y = py;
                    fsp.clearTint();
                    swap(scene.imagesPool, fsp.frame.name, partImage.frame.name);
                    fsp = undefined;
                    if(checkTheOrder(scene.imagesPool)){
                        console.log("Puzzle complete!");
                    } else {
                        console.log("I give you one more chance.");
                    };
                } else {
                    fsp = partImage;
                    partImage.setTint(0xaaffaa);
                }
            }).on("pointerover", function (e) {
                partImage.setTint(0xaaffaa, 0xaaffaa, 0xaaffaa, 0xaaffaa);
            }).on("pointerout", function (e) {
                if (fsp !== partImage)
                    partImage.clearTint();
            });
        });
}

function checkTheOrder(images){
    // for(let i = 0; i< images.length; i++){
        // if(images[i].frame.name !== 'part'+i){
            // return false;
        // }
    // }
    return true;
}

function swap(imagesPool, name1, name2){
    console.log("SWapping "+name1+" "+name2);
    let buffer1;
    let buffer2;
    let partNum = 0;
    for(let i = 0; i<imagesPool.length; i++ ){
        for(let j =0; j< imagesPool[i].length; j++){
            if(name1 === 'part'+partNum){
                buffer1 = [i,j];
            } else if(name2 === 'part'+partNum){
                buffer2 = [i,j];
            }
            if(buffer1 && buffer2) break;
            partNum++;
        }
    }
    let buffer = imagesPool[buffer1[0]][buffer1[1]]; // getting first image for swapping
    imagesPool[buffer1[0]][buffer1[1]] = imagesPool[buffer2[0]][buffer2[1]];
    imagesPool[buffer2[0]][buffer2[1]] = buffer;
    console.log(imagesPool);
}