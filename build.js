var directoryToJson = require('./directoryToJson.js');
directoryToJson.buildDirectory(
    {
        outputFile:'galleries.js',
        jsonPrefix:'var galleries='
    });

