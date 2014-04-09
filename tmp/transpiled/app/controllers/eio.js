define("appkit/controllers/eio", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var eioController = Ember.Controller.extend({
    needs: ['application'],
    actions:{
      new: function(){
       this.transitionToRoute('eio');
      }
    }
    });
    
    __exports__["default"] = eioController;
  });