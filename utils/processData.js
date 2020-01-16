const { difference } = require('lodash');

module.exports = {
    processData({ csvData, headers, columnNameAllow }) {
        const necessaryColumns = [];
        const newData = [];
        headers.forEach((value, index) => {
            if (columnNameAllow.includes(value)) {
                necessaryColumns.push(index);
            }
        })

        for (let i = 0; i < csvData.length; i++) {
            let newRow = [];
            for (let j = 0; j < csvData[i].length; j++) {
                if (necessaryColumns.includes(j)) {
                    newRow.push(csvData[i][j]);
                }
            }
            if (newRow.length < columnNameAllow.length) {
                if (i === 0) {
                    let headerDifference = difference(columnNameAllow, newRow);
                    for (let k = 0; k < headerDifference.length; k++) {
                        newRow.push(headerDifference[k]);
                    }
                }
                let differenceColumn = columnNameAllow.length - newRow.length;
                for (let k = 0; k < differenceColumn; k++) {
                    newRow.push(null);
                }
            }
            newData.push(newRow);
        }

        return newData;
    }
};