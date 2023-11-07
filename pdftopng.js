const fs = require('fs');
const { pdfToPng } = require('pdf-to-png-converter');

convertPdfToImg = async (buffer, pages) => {
  let pagesArr = Array(pages).fill().map((e, i) => i + 1);

  const pngPage = await pdfToPng(buffer, {
    disableFontFace: true,
    useSystemFonts: true,
    pagesToProcess: pagesArr,
    viewportScale: 2.0
  });

  return pngPage;
}

function makePath(pathToFile, i) {
  return pathToFile.replace(__dirname, '')
    .replace('.pdf', `-${i + 1}.png`)
    .replace(`\\pdf_files\\`)
    .replace('/pdf_files/', '')
    .replace('undefined', '');
}

const convertToPng = async (pathToFile, pages) => {
  if (fs.existsSync(pathToFile)) {
    const pdf = fs.readFileSync(pathToFile);
    const pngs = await convertPdfToImg(pdf, pages);
    pngs.forEach((png, i) => {
      fs.writeFileSync(__dirname + `/png_files/` + makePath(pathToFile, i), png.content);
    });
  }
}

module.exports = convertToPng;
