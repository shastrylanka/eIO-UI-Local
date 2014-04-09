var formatDate = Ember.Handlebars.makeBoundHelper(
		function(date) {
		    if (arguments.length < 1) {
		        throw new Error("Handlebars Helper needs atleast 1 parameter");
		    }
		   var newDate = date.substring(0,10)
		   return new Ember.Handlebars.SafeString(newDate);
		    
		}
);

export default formatDate;