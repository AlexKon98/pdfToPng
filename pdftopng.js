const fs = require('fs');
const { pdfToPng } = require('pdf-to-png-converter');

convertPdfToImg = async (buffer, pages) => {
  let pagesArr = [];
  for (let i = 1; i <= pages; i++) {
    pagesArr.push(i);
  }

  const pngPage = await pdfToPng(buffer, {
    disableFontFace: true,
    useSystemFonts: true,
    pagesToProcess: pagesArr,
    viewportScale: 2.0
  });

  return pngPage;
}

const convertToPng = async (pathToFile, pages) => {
  if (fs.existsSync(pathToFile)) {
    const pdf = fs.readFileSync(pathToFile);
    const pngs = await convertPdfToImg(pdf, pages);
    pngs.forEach((png, i) => {
      fs.writeFileSync(`./png_files/${pathToFile.replace(__dirname, '')
        .replace('.pdf', `-${i + 1}.png`)
        .replace(`\\pdf_files\\`)
        .replace('undefined', '')}`,
        png.content);
    });
  }
}

module.exports = convertToPng;
