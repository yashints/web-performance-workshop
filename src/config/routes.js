const appRouter = (app, fs, baseDir) => {
  // variables
  const validPaths = fs
    .readdirSync(`${baseDir}/api`, { withFileTypes: true })
    .filter((item) => !item.isDirectory())
    .map((item) => item.name.split('.')[0]);

  // READ
  app.get('/api/:dataPoint', (req, res) => {    
    if (validPaths.includes(req.params.dataPoint)) {
      fs.readFile(
        `${baseDir}/api/${req.params.dataPoint}.json`,
        'utf8',
        (err, data) => {
          if (err) {
            throw err;
          }

          res.send(JSON.parse(data));
        }
      );
    } else {
      res.sendStatus(404);
    }
  });
};

module.exports = appRouter;
