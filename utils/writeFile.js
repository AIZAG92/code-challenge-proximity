const fs = require('fs');


module.exports = {
    writeFile(data) {
        const outputFile = fs.createWriteStream('./output.txt');
        outputFile.write(JSON.stringify(data));
        outputFile.end();
    }
}