// Ember.Y.ListViewRow

import ListViewCellContainer from '../views/list-view-cell-container';


export default Ember.CollectionView.extend({
	tagName: 'tr',
	classNameBindings: ['controller.isSelected:selected', 'controller.isEditing:editing'],
	
	onIsEditing : function(){
		var value = this.get('controller.isEditing');
		this.forEach(function(cell){
			cell.set('isEditing', value);
		});
	}.observes('controller.isEditing'),

	mouseDown: function (event) {
		//TODO: Figure out a way to get rid of this logic here. (prevents mouseDown from selecting the row when user clicks on certain nested elements)
		//Should be a better way to stop the mouseDown even from getting here when user clicks on nested elements in a list.
		var targetClasses = event.target.parentNode.classList,
			blockRowSelect = Ember.$.inArray('blockRowSelect', targetClasses) >= 0;

		if(!blockRowSelect) {
			var row = this.get('controller'),
				context = this.get('controller.parentController') || this.get('context'),
				selectedRow = context.get('selectedRow');

			if (!row.get('isSelected')) {
				if (selectedRow) {
					selectedRow.set('isSelected', false);
				}

				row.set('isSelected', true);
				context.set('selectedRow', row);
			}
		}

		return true;
	},

	doubleClick: function () {
		var row = this.get('controller'),
			parent = this.get('controller.parentController') || this.get('context');
		if (parent) {
			return parent.rowDoubleClick(row);
		}
		else {
			return true;
		}
	},

	createChildView: function (viewClass, attrs) {
		var cellView = attrs.content.get('cellView'),
			column = attrs.column = attrs.content;

		viewClass = typeof cellView === 'string' ? this.container.lookupFactory(cellView) : cellView;
		attrs.controller = this.get('controller');
		attrs.row = attrs.controller.get('row');

		if(column.get('editable')){
			var childAttrs = Ember.copy(attrs);
			delete childAttrs._parentView;
			childAttrs.tagName = null;

			//pass the celView attributes to the container as Ember destroys the views once detached from the DOM
			return this._super(ListViewCellContainer, Ember.merge(attrs, {
				cellView : viewClass,
				cellViewAttrs : childAttrs
			}));
		} else{
			return this._super(viewClass, attrs);
		}
	}
});
