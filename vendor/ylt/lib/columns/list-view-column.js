// Ember.Y.ListViewColumn
import ListViewHeader from '../views/list-view-header';
import ListViewFooter from '../views/list-view-footer';
import ListViewCell from '../views/list-view-cell';
import ListViewEditableCell from '../views/list-view-editable-cell';


export default Ember.Object.extend({
	header: null,
	valueBindingPath: null,
	cellView: ListViewCell,
	editView: ListViewEditableCell,
	headerView: ListViewHeader,
	footerView: ListViewFooter,
	sortable: true,

	getRenderValue: function (row) {
		var renderer = this.get('renderer'),
			path = this.get('valueBindingPath'),
			value = path && row ?  row.get(path) : null;

		if (renderer && typeof renderer === 'function') {
			value = renderer.call(this, value, row);
		}

		return (value !== null && value !== '') ? value : this.emptyValue;
	}
});
