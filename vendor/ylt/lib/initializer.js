import ListViewCell from './views/list-view-cell';
import ListViewEditableCell from './views/list-view-editable-cell';
import ListViewCellContainer from './views/list-view-cell-container';
import BooleanListViewCell from './views/boolean-list-view-cell';
import HyperLinkListViewCell from './views/hyperlink-list-view-cell';
import InfiniteList from './views/infinite-list-view';
import ListViewHeader from './views/list-view-header';
import ListViewRow from './views/list-view-row';
import ListViewRowController from './controllers/list-view-row';

Ember.onLoad('Ember.Application', function(Application) {
    Application.initializer({
        name: 'light-table',
        initialize: function(container, app) {
            app.register('view:light-table/listViewCell', ListViewCell);
            app.register('view:light-table/listViewEditableCell', ListViewEditableCell);
            app.register('view:light-table/listViewCellContainer', ListViewCellContainer);
            app.register('view:light-table/booleanListViewCell', BooleanListViewCell);
            app.register('view:light-table/hyperLinkListViewCell', HyperLinkListViewCell);
            app.register('view:light-table/infiniteListView', InfiniteList);
            app.register('view:light-table/listViewHeader', ListViewHeader);
            app.register('view:light-table/listViewRow', ListViewRow);
            app.register('controller:light-table/listViewRowController', ListViewRowController);
        }
    });
});
