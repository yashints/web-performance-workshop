const util = require('util');
const path = require('path');
const fs = require('graceful-fs');
const makeDir = require('make-dir');
const writeFile = util.promisify(fs.writeFile);

const imagemin = require('imagemin');
const jpeg = require('imagemin-mozjpeg');
const png = require('imagemin-pngquant');
const svg = require('imagemin-svgo');
const webp = require('imagemin-webp');

const srcdir = 'src/public/images';
const distdir = 'dist/public/images';

(async() => {
  const files = await imagemin(
      [`${srcdir}/**/*.{jpg,jpeg,png}`],
      {        
        plugins: [
          jpeg({
            quality: 30
          }),
          png({
            speed: 4,
            quality: [0.45,0.70]
          }),
          svg()
        ]
      }
  );
  
  files.forEach(async v => {
    let source = path.parse(v.sourcePath);
    v.destinationPath = `${source.dir.replace(srcdir, distdir)}/${source.name}${source.ext}`;
    console.log(`✅ ${v.destinationPath}`);
    await makeDir(path.dirname(v.destinationPath));
    await writeFile(v.destinationPath, v.data);
  });
})();