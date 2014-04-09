export default Ember.View.extend({
	defaultTemplate: Ember.Handlebars.compile(
		'<span>{{input value=view.parentView.value type="text"}}</span>'
	)
});
