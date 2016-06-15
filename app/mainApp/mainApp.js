module.exports = function(){
  return {
    route: '/',
    processData: function(req,res) {
      res.myModuleData = {
        pageName: 'Index'
      };
    }
  }
}