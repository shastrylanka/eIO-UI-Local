// Ember.Y.BooleanListViewColumn
import ListViewColumn from './list-view-column';
import BooleanListViewCell from '../views/boolean-list-view-cell';


export default ListViewColumn.extend({
	cellView: BooleanListViewCell,
	routeName: null,
	getContext: function (row) {
		return Ember.get(row, 'id');
	},
	navigate: function (row) {
		// if routeName is null this function will be called
	}
});
