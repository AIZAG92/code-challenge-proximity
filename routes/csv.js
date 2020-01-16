const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/csv/' })
const { parseCsv } = require('../controllers/api/csv');

/**
 * Creates a new client account.
 *
 * @name Create a txt file from a csv 
 * @route {POST} api/v1/csv/:providerName
 * @routeparam  {string} providerName - the providername that sent the file.
 * @bodyparam   {file}  file - The csv file to be sent. 
 *
 * @return {Object} PLACEHOLDER
 */
router.post('/:providerName', upload.single('file'), parseCsv);

module.exports = router; 
