// Ember.Y.ListViewHeader

export default Ember.View.extend({
	tagName: 'th',
	attributeBindings: ['column', 'width'],
	classNameBindings: 'active',
	width: null,
	actualWidth : null,
	column: null,
	
	template: Ember.Handlebars.compile(
		'{{#if view.renderValue}}' +
			'<div {{action "sortByColumn" view.column}} {{bind-attr class=":content :no-header"}}>' +
				'<div>' +
					'{{view.renderValue}}' +
					'{{#if view.isSortingAsc}}' +
					'	<i class="icon-caret-up" style="font-size:10px"></i>' +
					'{{/if}}' +
					'{{#if view.isSortingDesc}}' +
						'<i class="icon-caret-down" style="font-size:10px"></i>' +
					'{{/if}}' +
					'{{#if view.column.isLoading}}' +
						'<div class="cell-spinner"></div>' +
					'{{/if}}' +
				'</div>' +
			'</div>' +
		'{{/if}}'),

	renderValue: function () {
		var column = this.get('column');

		if (column) {
			return column.get('header');
		}
	}.property(),

	init: function() {
		this._super();

		if( this.get('column.sortable') === false ) {
			this.get('classNames').pushObject('not-sortable');
		}

		switch ( this.get('column.align') ) {
			case 'middle':
				this.get('classNames').pushObjects(['align', 'middle']);
				break;
			case 'right':
				this.get('classNames').pushObjects(['align', 'right']);
				break;
			default :
				this.get('classNames').pushObjects(['align', 'left']);
		}
	},

	active: function() {
		// this checks if the column is sorted which means that an active tint needs to be applied
		return this.get('controller.options.content.sortColumn') === this.get('column');
	}.property('controller.options.content.sortColumn'),

	isSorting: function () {
		return this.get('controller.options.content.sortColumn') === this.get('column');
	}.property('controller.options.content.sortColumn'),

	isSortingAsc: function () {
		return this.get('isSorting') && this.get('controller.options.content.sortAscending');
	}.property('isSorting', 'controller.options.content.sortAscending'),

	isSortingDesc: function () {
		return this.get('isSorting') && !this.get('controller.options.content.sortAscending');
	}.property('isSorting', 'controller.options.content.sortAscending')

	/*didInsertElement: function() {
		this.$().on('resize', this._onResize);
	},

	willDestroyElement : function(){
		this.$().off('resize', this._onResize)
	},

	_onResize : function(){
		console(this.get('renderValue') +  this.$().css('actualWidth'));
	}*/
});
