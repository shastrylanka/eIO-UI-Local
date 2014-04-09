// Ember.Y.BooleanListViewCell

export default Ember.View.extend({
	tagName: 'td',
	attributeBindings: ['row', 'column'],
	row: null,
	column: null,
	template: Ember.Handlebars.compile('<span>{{boolean-to-check view.renderValue}}</span>'),

	renderValue: function () {
		return this.get('column').getRenderValue(this.get('row'));
	}.property()
});
