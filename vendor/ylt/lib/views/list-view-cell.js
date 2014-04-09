// Ember.Y.ListViewCell

import ListViewCellMixin from '../mixins/list-view-cell';

export default Ember.View.extend(ListViewCellMixin,{
	tagName: 'td',
	attributeBindings: ['row', 'column'],
	defaultTemplate: Ember.Handlebars.compile('<span>{{unbound view.renderValue}}</span>'),
	row: null,
	column: null,

	renderValue: function () {
		return this.get('column').getRenderValue(this.get('row'));
	}.property()
});
