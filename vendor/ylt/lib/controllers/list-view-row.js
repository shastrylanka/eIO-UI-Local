// Ember.Y.ListViewColumn

export default Ember.ArrayController.extend({
	isSelected : false,
	isEditing : false,

	isExpanded : function(){
		return this.get('isSelected') && this.get('parentController.expandedView');
	}.property('isSelected'),

	actions :{
		beginEditing : function(){
			if(this.get('parentController.autoEdit') && this.get('parentController.autoEditMode') === 'row' && !this.get('isEditing')){
				this.toggleProperty('isEditing');
			}
		}
	}
});
