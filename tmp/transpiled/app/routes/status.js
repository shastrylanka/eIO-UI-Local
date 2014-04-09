define("appkit/routes/status", 
  ["exports"],
  function(__exports__) {
    "use strict";
    //import appkit/models/status;
    __exports__["default"] = Ember.Route.extend({
      model: function(){
          //return Status.create();
      },
      /*setupController : function(controller, model){
      	  console.log(model);
          controller.set('model', model);
      }*/
    });
  });