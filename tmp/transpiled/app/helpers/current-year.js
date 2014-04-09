define("appkit/helpers/current-year", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.makeBoundHelper(function() {
    	var d=new Date();
    	var year = d.getFullYear();
    	return year;
    });
  });