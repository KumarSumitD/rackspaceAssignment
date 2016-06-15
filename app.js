var path = require('path');
var express = require('express');
var glob = require('glob');
var _ = require('lodash');
var app;
var miniApps = {};

if (module === require.main) startServer();

function startServer() {
  app = express();
  app
    .set('trust proxy', true)
    .set('view options', {layout:false})
    .set('views', path.join(process.cwd(), '/app'))
    .set('view engine', 'jade');

  app.use(express.static(process.cwd() + '/client'));
  glob.sync('./**/*.js', { cwd: process.cwd() + '/app'})
    .forEach(function(file, index) {
      var fileName = path.basename(file, '.js');
      var requireFileName = require(process.cwd() + '/app/' +fileName+ '/' +fileName+ '.js')();
      miniApps[requireFileName.route] = requireFileName;
      miniApps[requireFileName.route].routeVerb = requireFileName.routeVerb || 'get';
      miniApps[requireFileName.route].templatePath = path.join(path.dirname(file), fileName);
    });

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


  app.listen(3000);
  console.log('Server Started');
}