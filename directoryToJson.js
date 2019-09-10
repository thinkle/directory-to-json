const glob = require('glob');
const fs = require('fs');

function buildDirectory ({
    outputFile='directory.json', // where to put the output
    metadataFilename='metadata.json',//Name of metadata files
    extensions=['jpg','jpeg','png','gif'],//File extensions to collect
    fileListProp='images', // Property to stick the array of filenames on
    root='images/',//Folder to start looking in
    jsonPrefix='',//Extra code to add before the JSON dump (e.g. to set a variable)
    outputTransform=(f)=>f, // function to transform image filenames in our output JSON
    filter=(o)=>true,
}
                        ) {
    
    console.log('Look for folders in %s',root);
    var jsonData = [];    
    var dirs = glob.sync(`./${root}/*/`);
    dirs.forEach(
        (d)=>{
            console.log('Reading directory... %s',d);
            var data, json;
            try {
                data = fs.readFileSync(`${d}/${metadataFilename}`);
            }
            catch (err) {
                console.log("...WARNING: No metadata for directory %s",d);
                json = {};
            }
            if (data) {
                try {
                    json = JSON.parse(data);
                }
                catch (err) {
                    console.log(`Error parsing JSON file ${d}/${metadataFilename}`);
                    console.log(`Got data: ${data}`);
                    throw err
                }
            }
            json[fileListProp] = []
            extensions.forEach(
                (ext)=>{
                    json[fileListProp].push(...glob.sync(`${d}/*.${ext}`))
                }
            );
            json[fileListProp] = json[fileListProp].filter(filter);
            json[fileListProp] = json[fileListProp].map(outputTransform);
            jsonData.push(json);
            console.log(`...found ${json[fileListProp].length} images`);
        }
    );
    console.log('Write to %s',outputFile);
    fs.writeFile(
        outputFile,
        jsonPrefix+JSON.stringify(jsonData),(e)=>{
            if (e) {
                console.log('Unable to write file directory.json: %s',e)
            }
            else {
                console.log('Wrote output to %s',outputFile);
            }
        });
}
    
exports.buildDirectory = buildDirectory;
