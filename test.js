var fs = require('fs');

function touch (fn) {
    fs.closeSync(fs.openSync(fn, 'w'));
}

function makedirs (dir) {
    var dirs = dir.split('/');
    var folder = '.';
    for (var d of dirs) {
        folder = folder+'/'+d;
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
    }
}

makedirs('tests');
for (var gal=0; gal<4; gal++) {
    makedirs(`tests/galleries/gal${gal}`);
    for (var i=0; i<10; i++) {
        ['png','gif','jpg'].forEach(
            (ext)=>{
                touch(`tests/galleries/gal${gal}/img${i}.${ext}`)
            })
    }
}


var directoryToJson = require('./directoryToJson.js');
directoryToJson.buildDirectory({
    outputFile:'tests/mctester.json',
    root:'tests/galleries',
})

