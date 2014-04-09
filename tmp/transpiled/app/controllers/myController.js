define("appkit/controllers/myController", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var myController = Ember.Controller.extend(Ember.TablePaginationMixin,{
    	categoryType:'',
    	needs: ['application'],
    	actions:{
    		new: function(){
    			this.transitionToRoute('mytestroute');
    		}
    	}
    });

    __exports__["default"] = myController;
  });