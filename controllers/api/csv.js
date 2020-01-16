const { isEqual } = require('lodash');
const { readFile } = require('../../utils/readFile');
const { processData } = require('../../utils/processData');
const { writeFile } = require('../../utils/writeFile');
const validation = require('../../utils/validation');

module.exports = {
    async parseCsv(req, res) {
        const { params: { providerName = null }, file = {} } = req;
        const { path = null } = file;
        console.log('provider name :', providerName);

        const { isValid, errors } = validation({
            providerName,
            file
        });

        if (!isValid) {
            return res.status(400).json(errors);
        }

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

        writeFile(newData);
        console.log('Final Data', newData);

        res.status(200).json({
            messsage: 'File uploaded and successfully processed'
        });

    }
}