import YLT from './core';

// ------------------------------------------------------------------------------
// CONTROLLERS
// ------------------------------------------------------------------------------
import ListViewRowController from './controllers/list-view-row';

// ------------------------------------------------------------------------------
// MIXINS
// ------------------------------------------------------------------------------
import InfiniteFetchControllerMixin from './mixins/infinite-fetch-controller';
import InfiniteFetchViewMixin from './mixins/infinite-fetch-view';

// ------------------------------------------------------------------------------
// VIEWS
// ------------------------------------------------------------------------------
import ListViewCellContainer from './views/list-view-cell-container';
import ListViewCell from './views/list-view-cell';
import ListViewEditableCell from './views/list-view-editable-cell';
import ListViewCellContainer from './views/list-view-cell-container';
import BooleanListViewCell from './views/boolean-list-view-cell';
import HyperLinkListViewCell from './views/hyperlink-list-view-cell';
import InfiniteListView from './views/infinite-list-view';
import ListViewHeader from './views/list-view-header';
import ListViewRow from './views/list-view-row';


// ------------------------------------------------------------------------------
// COLUMNS
// ------------------------------------------------------------------------------
import BooleanListViewColumn from './columns/boolean-list-view-column';
import HyperLinkListViewColumn from './columns/hyperlink-list-view-column';
import ListViewColumn from './columns/list-view-column';


import './initializer';

Ember.Handlebars.registerBoundHelper('boolean-to-check', function (status, options) {
  if (status === true) {
		return new Ember.Handlebars.SafeString('<i class=\'icon-active\'></i>');
	}
	else {
		return new Ember.Handlebars.SafeString('');
	}
});

// ------------------------------------------------------------------------------

// ------------------------------------------------------------------------------

YLT.InfiniteFetchControllerMixin = InfiniteFetchControllerMixin;
YLT.InfiniteFetchViewMixin = InfiniteFetchViewMixin;

YLT.ListViewCellContainer = ListViewCellContainer;
YLT.ListViewCell = ListViewCell;
YLT.ListViewEditableCell = ListViewEditableCell;
YLT.ListViewCellContainer = ListViewCellContainer;
YLT.BooleanListViewCell = BooleanListViewCell;
YLT.HyperLinkListViewCell = HyperLinkListViewCell;
YLT.InfiniteListView = InfiniteListView;
YLT.ListViewHeader = ListViewHeader;

YLT.ListViewRow = ListViewRow;
YLT.BooleanListViewColumn = BooleanListViewColumn;
YLT.HyperLinkListViewColumn = HyperLinkListViewColumn;
YLT.ListViewColumn = ListViewColumn;

YLT.ListViewRowController = ListViewRowController;

export default YLT;
