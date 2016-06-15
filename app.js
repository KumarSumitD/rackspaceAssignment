var path = require('path');
var express = require('express');
var glob = require('glob');
var _ = require('lodash');
var app;
var miniApps = {};

if (module === require.main) startServer();

function startServer() {
  //- creating express object and setting some basic configuration
  //- In Ideal State we can export config from a a seperate file and load it
  //- In Practical scenario we can break down each use case in another file and export it using require
  //- This willl keep code modular
  app = express();
  app
    .set('trust proxy', true)
    .set('view options', {layout:false})
    .set('views', path.join(process.cwd(), '/app'))
    .set('view engine', 'jade');

  //- This is to load static file, otherwise for static file also request come to Node instead to file.
  app.use(express.static(process.cwd() + '/client'));

  //- Looping through all app and keeping in an array
  glob.sync('./**/*.js', { cwd: process.cwd() + '/app'})
    .forEach(function(file, index) {
      var fileName = path.basename(file, '.js');
      var requireFileName = require(process.cwd() + '/app/' +fileName+ '/' +fileName+ '.js')();
      miniApps[requireFileName.route] = requireFileName;
      miniApps[requireFileName.route].routeVerb = requireFileName.routeVerb || 'get';
      miniApps[requireFileName.route].templatePath = path.join(path.dirname(file), fileName);
    });

  //- This function will go through all modules in miniApp array and set the route dynamically in express with help of express middleware
  routeSetup(app);
  function routeSetup(app) {
    _.each(miniApps,function(module){
      app[module.routeVerb](module.route, appCallback);
    });
  };

  function appCallback(req, res, next) {
    var currentModule = miniApps[req.route.path];
    res.myModuleData = {};
    currentModule.processData(req,res);
    res.render(currentModule.templatePath, res.myModuleData);
  }

  //- App starting on port 3000
  app.listen(3000);
  console.log('Server Started');
}