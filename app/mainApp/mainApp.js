module.exports = function(){
  return {
    route: '/',
    processData: function(req,res) {
      //- This will be call for each app after route is captured
      res.myModuleData = {
        logoTitle: 'Rackspace Assignment'
      };
    }
  }
}