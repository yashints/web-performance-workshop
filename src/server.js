const fs = require('fs');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const chokidar = require("chokidar");

const app = express()
const router = express.Router();
const watcher = chokidar.watch(`${__dirname}`);

let serverRestarted = true;

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

app.use(cors())
app.use(express.static(`${__dirname}/public`))

const routes = require(`${__dirname}/config/routes.js`)(app, fs, __dirname);

app.all('*', function(req, res, next){
  // read files
  fs.readFile(`${__dirname}/public/images/train.jpg`, function(err, trainImage) {
    fs.readFile(`${__dirname}/public/images/1.jpg`, function(err, img) {
      console.log(img);
    });
  });

  next();
});

const server = app.listen(port, function () {
  console.log(`CORS-enabled web server listening on port ${port}`)  
})