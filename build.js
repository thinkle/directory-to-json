var directoryToJson = require('./directoryToJson.js');
var resizer = require('./resize.js');


directoryToJson.buildDirectory(
    {
        outputFile:'galleries.js', // Create a galleries.js file to contain our galleries data
        jsonPrefix:'var galleries=', // Store JSON output in "galleries" global variable :)
        outputTransform: (fn)=>resizer.resizer.mapSizes(fn), // make each image a map of different available filesizes
        filter : (fn)=>!fn.match(resizer.resizer.resizedMatcher),
    });


resizer.resizer.crawl('images'); // Do the actual resizing of images
