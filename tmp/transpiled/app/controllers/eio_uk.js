define("appkit/controllers/eio_uk", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var eioUkController = Ember.Controller.extend({
    needs: ['application'],
    actions:{
      new: function(){
       this.transitionToRoute('eio_uk');
      }
    }
    });
    
    __exports__["default"] = eioUkController;
  });