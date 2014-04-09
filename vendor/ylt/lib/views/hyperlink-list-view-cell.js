// Ember.Y.HyperLinkListViewCell
import ListViewCell from './list-view-cell';


export default ListViewCell.extend({
	template: Ember.Handlebars.compile('{{#if view.routeName}}' +
			'<span>{{#link-to view.routeName view.rowId}}{{view.renderValue}}{{/link-to}}</span>' +
		'{{else}}' +
			'<span><a {{action "navigate" view.rowId target="view"}}>{{view.renderValue}}</a></span>' +
		'{{/if}}'),
	routeName : function(){
		return this.get('column.routeName');
	}.property('column', 'column.routeName'),
	rowId : function(){
		return this.get('column').getContext(this.get('row'));
	}.property('column'),

	actions: {
		navigate: function () {
			var column = this.get('column'),
				row = this.get('row'),
				routeName = column.get('routeName');

			if (routeName) {
				this.get('controller').transitionToRoute(routeName, column.getContext(row));
			} else {
				column.navigate.call(this, row);
			}
		}
	}
});
