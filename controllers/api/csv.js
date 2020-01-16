const { isEqual } = require('lodash');
const { readFile } = require('../../utils/readFile');
const { processData } = require('../../utils/processData');

module.exports = {
    async parseCsv(req, res) {
        const { params: { providerName = null }, file = {} } = req;
        const { path = null } = file;
        console.log('provider name :', providerName);
        let csvData = [];
        const columnNameAllow = [
            'UUID',
            'VIN',
            'Make',
            'Model',
            'Mileage',
            'Year',
            'Price',
            'Zip Code',
            'Create Date',
            'Update Date'];

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

        const [headers = []] = csvData;
        let newData = [];

        if (isEqual(headers, columnNameAllow)) {
            newData = csvData;
        }

        else {
            newData = processData({ csvData, headers, columnNameAllow });
        }

        console.log('Final Data', newData);

    }
}