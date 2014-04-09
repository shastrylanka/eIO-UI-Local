// Ember.Y.HyperLinkListViewColumn
import ListViewColumn from './list-view-column';
import HyperLinkListViewCell from '../views/hyperlink-list-view-cell';


export default ListViewColumn.extend({
	cellView: HyperLinkListViewCell,
	routeName: null,
	getContext: function (row) {
		return Ember.get(row, 'id');
	},
	navigate: function (row) {
		// if routeName is null this function will be called
	}
});
