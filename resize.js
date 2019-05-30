/* A simple resize library */
const sharp = require('sharp');
const glob = require('glob');

function addSuffix (fn, suffix) {
    filenames = fn.split('.')
    filenames.splice(filenames.length-1,0,suffix)
    return filenames.join('.');
}

function resize (fn, s) {
    outName = addSuffix(fn,''+s);
    sharp(fn)   
    .resize({
        width : s,
        height : s,
        fit : 'inside',
        withoutEnlargement : true,
    })
        .toFile(outName,
                function (err) {
                    if (err) {console.log('Error writing %s: %s',outName,err)};
                }
               )
}

var resizer = {
    resize : resize,
    resizeAll : function (fn) {
        this.sizes.map((s)=>this.resize(fn,s));
    },
    crawl : function ({
        files=[],
        dir='images',
        extensions=['jpg','jpeg','png','gif','webm']
    }) {
        extensions.forEach(
            (ext)=>{files.push(...glob.sync(`${dir}/*.${ext}`))}
        ); 
        files.forEach((fn)=>this.resizeAll(fn)) // resize files...
        var dirs = glob.sync(`./${dir}/*/`);
        dirs.forEach((d)=>this.crawl({dir:d,files,extensions})); // recurse...
    },
    sizes : [1920,800,400,150],
    mapSizes : function (fn) {
        var output = {original:fn,}
        this.sizes.forEach(
            (s)=>output[s]=addSuffix(fn,s)
        );
        return output;
    }
}
exports.resizer = resizer;
