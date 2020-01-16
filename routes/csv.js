const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/csv/' })
const { parseCsv } = require('../controllers/api/csv');

router.post('/:providerName', upload.single('file'), parseCsv);

module.exports = router; 