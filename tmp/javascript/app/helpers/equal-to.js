var equalTo = Ember.Handlebars.registerHelper(
		function(lvalue, rvalue, options) {
		    if (arguments.length < 2) {
		        throw new Error("Handlebars Helper needs 2 parameters");
		    }
		    if(lvalue.indexOf(rvalue)!==-1){ //if it contains the string
		    	console.log(lvalue);
		    	console.log(rvalue);
		    	var check="pass";
		    	return options.inverse(this);
		    } else {
		        return options.fn(this);
		    } 
		}
);

export default equalTo;