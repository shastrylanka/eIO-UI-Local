// Ember.Y.ListViewCell

import ListViewCellMixin from '../mixins/list-view-cell';


export default Ember.ContainerView.extend(ListViewCellMixin,{
	isEditing : false,
	hasFocus: false,
	cellView : null,
	cellViewAttrs : null,
	boundParam: 'value',

	init : function(){
		this._super();
		Ember.Binding.from('row.' + this.get('column.valueBindingPath')).to(this.get('boundParam')).connect(this);
		this.set('isEditing', !!this.get('controller.isEditing'));
	},

	mouseDown: function() {
		this.set('hasFocus', true);
		this._super();
	},

	focusOut: function() {
		this.set('hasFocus', false);
		this._super();
	},

	hasFocusChanged : function(){
		var tableController = this.get('controller.parentController'),
			canEdit = tableController.get('autoEdit') && (tableController.get('autoEditMode') === 'cell');

		if(this.get('hasFocus')){
			if(canEdit){
				this.set('isEditing', true);
			}
			if(this.get('controller')){
				this.get('controller').send('beginEditing');
			}
		}else{
			if(canEdit) {
				this.set('isEditing', false);
			}
		}
	}.observes('hasFocus'),

	isEditingChanged : function(){
		if(this.get('isEditing')){
			var editView = this.get('column.editView'),
				view = editView ?
					(typeof editView === 'string' ? this.container.lookupFactory('view:' + editView) : editView) :
					Ember.View.extend({templateName : this.get('column.editTemplate')}),
				props = {
					row : this.get('row'),
					column : this.get('column'),
					parentView : this
				};
			this.set('currentView', view.create(props));
		}else{
			this.set('currentView', this.get('cellView').create(this.get('cellViewAttrs')));
		}
	}.observes('isEditing').on('init')
});
