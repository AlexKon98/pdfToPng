const convertToPng = require('./pdftopng');
const path = require('path');

convertToPng(path.join(__dirname, './pdf_files/АТТЕСТАТ ФАРМЛНИК.pdf'), 2);
