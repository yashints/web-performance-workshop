const fs = require('fs');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const chokidar = require("chokidar");

const compression = require('compression');

const app = express();

app.use(compression());

app.set('etag', false);

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

const router = express.Router();
const watcher = chokidar.watch(`${__dirname}`);

// hot reloading
watcher.on("ready", function() {
  watcher.on("all", function() {
    console.log("Reloading server....");
    Object.keys(require.cache).forEach(function(id) {
      const localId = id.substr(process.cwd().length)
      delete require.cache[id]
    })    
    console.log("Server reloaded.")
  })
})

const port = parseInt(process.env.PORT, 10) || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

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

const server = app.listen(port, function () {
  console.log(`CORS-enabled web server listening on port ${port}`)  
})