const fs = require('fs');
const express = require('express');
const spdy = require('spdy');
const bodyParser = require('body-parser');
const cors = require('cors');

const key = fs.readFileSync(`${__dirname}/certs/key.pem`);
const cert = fs.readFileSync(`${__dirname}/certs/cert.pem`);
const options = {
  key: key,
  cert: cert,
};

const compression = require('compression');

const app = express();

app.use(compression());

const router = express.Router();

const port = parseInt(process.env.PORT, 10) || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => {
  Promise.all([
    fs.promises.readFile(`${__dirname}/public/index.html`),
    fs.promises.readFile(`${__dirname}/public/images/train.jpg`),
    fs.promises.readFile(`${__dirname}/public/images/train.png`)
  ]).then(files => {
    if(res.push) {
      let trainJpgStream = res.push('/images/train.jpg', {
        req: { 'accept': '**/*' },
        res: { 'content-type': 'image/jpg' }
      });

      trainJpgStream.on('error', err => {
        console.log(err);
      });

      trainJpgStream.end(files[1]);

      let trainPngStream = res.push('/images/train.png', {
        req: { 'accept': '**/*' },
        res: { 'content-type': 'image/png' }
      });

      trainPngStream.on('error', err => {
        console.log(err);
      });

      trainPngStream.end(files[2]);
    }

    res.set({
      'Cache-control': 'no-store'
    });
    res.removeHeader('X-Powered-By');

    res.writeHead(200);
    res.end(files[0]);
  }).catch(error => res.status(500).send(error.toString()));
});

app.use(express.static(`${__dirname}/public`, {
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    const hashRegExp = new RegExp('\\.[0-9a-f]{8}\\.');

    if (path.endsWith('.html')) {
      // All of the project's HTML files end in .html
      res.setHeader('Cache-Control', 'no-cache');
    } else if (hashRegExp.test(path)) {
      // If the RegExp matched, then we have a versioned URL.
      res.setHeader('Cache-Control', 'max-age=31536000');
    }
  }
}));

const routes = require(`${__dirname}/config/routes.js`)(app, fs, __dirname);

const server = spdy.createServer(options, app);

server.listen(port, function () {
  console.log(`🌍 Web server listening on port ${port}
    https://localhost:3000
  `);
});