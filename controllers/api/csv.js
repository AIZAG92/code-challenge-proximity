const { readFile } = require('../../utils/readFile');

module.exports = {
    async parseCsv(req, res) {
        const { params: { providerName = null }, file = {} } = req;
        const { path = null } = file;
        console.log('provider name :', providerName);
        let csvData = [];

        try {
            csvData = await readFile(path);
            console.log('csvData', csvData)
        }
        catch (error) {
            console.log('Error reading the file', error);
            res.status(400).json({
                messsage: 'Error reading the file' + error
            });
        }

    }
}