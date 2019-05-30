var directoryToJson = require('./directoryToJson.js');
var resizer = require('./resize.js');


directoryToJson.buildDirectory(
    {
        outputFile:'galleries.js',
        jsonPrefix:'var galleries=',
    });

resizer.resizer.crawl('images');
