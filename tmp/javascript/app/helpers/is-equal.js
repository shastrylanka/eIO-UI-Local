var isEqual = Ember.Handlebars.makeBoundHelper(
		function(lvalue, rvalue) {
		    if (arguments.length < 2) {
		        throw new Error("Handlebars Helper needs 2 parameters");
		    }
		    if(lvalue.indexOf(rvalue)!==-1){
		    	return new Ember.Handlebars.SafeString('</div><div class="row">');
		    } 
		}
);

export default isEqual;