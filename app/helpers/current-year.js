export default Ember.Handlebars.makeBoundHelper(function() {
	var d=new Date();
	var year = d.getFullYear();
	return year;
});

