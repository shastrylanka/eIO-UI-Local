export default Ember.CollectionView.extend({
	tagName: 'tr',

	createChildView: function (viewClass, attrs) {
		var cellView = attrs.content.get('footerView');
		attrs.column = attrs.content;
		attrs.controller = this.get('controller');

		viewClass = typeof cellView === 'string' ? this.container.lookupFactory(cellView) : cellView;

		return this._super(viewClass, attrs);
	}
});
