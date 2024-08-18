const fs = require('fs');
const { pdfToPng } = require('pdf-to-png-converter');

const readDir = (path) => {
  return fs.readdirSync(__dirname + path, {});
};

const makePath = (path, i) => {
  path.replace(__dirname, '').replace('\\dir', '').replace('.pdf', '') + `-${i}.png`
}

const convertPdfToImg = async (buffer, pages) => {
  let pagesArr = Array(pages).fill().map((e, i) => i + 1);

  const pngPage = await pdfToPng(buffer, {
    disableFontFace: true,
    useSystemFonts: true,
    pagesToProcess: pagesArr,
    viewportScale: 2.0
  });

  return pngPage;
};

const convertToPng = async (pathToFile, pages) => {
  if (fs.existsSync(pathToFile)) {
    const pdf = fs.readFileSync(pathToFile);
    const pngs = await convertPdfToImg(pdf, pages);
    pngs.forEach((png, i) => {
      fs.writeFileSync(__dirname + `\\png_files` + makePath(pathToFile, i), png.content);
    });
  }
};

// TODO...
const files = readDir('/dir');

files.forEach(async (file) => {
  await convertToPng(__dirname + '\\dir\\' + file, 100);
});
