// Ember.Y.ListViewHeader

export default Ember.View.extend({
	tagName: 'td',
	attributeBindings: ['width'],
	column: null,
	
	template: Ember.Handlebars.compile(
		'{{#if view.renderValue}}' +
			'<div>' +
				'{{view.renderValue}}'+
			'</div>' +
		'{{/if}}'),

	renderValue: function () {
		var row = this.get('controller.footerRow'),
			column = this.get('column');
		return row ? column.getRenderValue(row) : column.get('emptyValue');
	}.property()
});
