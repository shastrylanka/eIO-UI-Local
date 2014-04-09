define("appkit/helpers/percent-format", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var percentFormat = Ember.Handlebars.makeBoundHelper(
    		function(lvalue) {
    		    if (arguments.length < 1) {
    		        throw new Error("Handlebars Helper needs 2 parameters");
    		    }
    		    var percent = lvalue*100;
    		    percent=percent+ '%';
    		    return percent;
    		}
    );
    
    __exports__["default"] = percentFormat;
  });