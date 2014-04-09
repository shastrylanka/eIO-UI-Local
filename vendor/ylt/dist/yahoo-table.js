(function(global) {
define("YLT/columns/boolean-list-view-column", 
  ["./list-view-column","../views/boolean-list-view-cell","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    // Ember.Y.BooleanListViewColumn
    var ListViewColumn = __dependency1__["default"];
    var BooleanListViewCell = __dependency2__["default"];


    __exports__["default"] = ListViewColumn.extend({
    	cellView: BooleanListViewCell,
    	routeName: null,
    	getContext: function (row) {
    		return Ember.get(row, 'id');
    	},
    	navigate: function (row) {
    		// if routeName is null this function will be called
    	}
    });
  });
define("YLT/columns/hyperlink-list-view-column", 
  ["./list-view-column","../views/hyperlink-list-view-cell","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    // Ember.Y.HyperLinkListViewColumn
    var ListViewColumn = __dependency1__["default"];
    var HyperLinkListViewCell = __dependency2__["default"];


    __exports__["default"] = ListViewColumn.extend({
    	cellView: HyperLinkListViewCell,
    	routeName: null,
    	getContext: function (row) {
    		return Ember.get(row, 'id');
    	},
    	navigate: function (row) {
    		// if routeName is null this function will be called
    	}
    });
  });
define("YLT/columns/list-view-column", 
  ["../views/list-view-header","../views/list-view-footer","../views/list-view-cell","../views/list-view-editable-cell","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    // Ember.Y.ListViewColumn
    var ListViewHeader = __dependency1__["default"];
    var ListViewFooter = __dependency2__["default"];
    var ListViewCell = __dependency3__["default"];
    var ListViewEditableCell = __dependency4__["default"];


    __exports__["default"] = Ember.Object.extend({
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
  });
define("YLT/controllers/list-view-row", 
  ["exports"],
  function(__exports__) {
    "use strict";
    // Ember.Y.ListViewColumn

    __exports__["default"] = Ember.ArrayController.extend({
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
  });
define("YLT/core", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var YLT;

    if ('undefined' === typeof YLT) {
      YLT = Ember.Namespace.create({
        VERSION: '0.0.16'
      });

      if ('undefined' !== typeof window) {
        window.YLT = YLT;
      }

      if (Ember.libraries) {
        Ember.libraries.registerCoreLibrary('Yahoo Table', YLT.VERSION);
      }
    }

    __exports__["default"] = YLT;
  });
define("YLT/initializer", 
  ["./views/list-view-cell","./views/list-view-editable-cell","./views/list-view-cell-container","./views/boolean-list-view-cell","./views/hyperlink-list-view-cell","./views/infinite-list-view","./views/list-view-header","./views/list-view-row","./controllers/list-view-row"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __dependency8__, __dependency9__) {
    "use strict";
    var ListViewCell = __dependency1__["default"];
    var ListViewEditableCell = __dependency2__["default"];
    var ListViewCellContainer = __dependency3__["default"];
    var BooleanListViewCell = __dependency4__["default"];
    var HyperLinkListViewCell = __dependency5__["default"];
    var InfiniteList = __dependency6__["default"];
    var ListViewHeader = __dependency7__["default"];
    var ListViewRow = __dependency8__["default"];
    var ListViewRowController = __dependency9__["default"];

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
  });
define("YLT/main", 
  ["./core","./controllers/list-view-row","./mixins/infinite-fetch-controller","./mixins/infinite-fetch-view","./views/list-view-cell-container","./views/list-view-cell","./views/list-view-editable-cell","./views/boolean-list-view-cell","./views/hyperlink-list-view-cell","./views/infinite-list-view","./views/list-view-header","./views/list-view-row","./columns/boolean-list-view-column","./columns/hyperlink-list-view-column","./columns/list-view-column","./initializer","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __dependency8__, __dependency9__, __dependency10__, __dependency11__, __dependency12__, __dependency13__, __dependency14__, __dependency15__, __dependency16__, __exports__) {
    "use strict";
    var YLT = __dependency1__["default"];

    // ------------------------------------------------------------------------------
    // CONTROLLERS
    // ------------------------------------------------------------------------------
    var ListViewRowController = __dependency2__["default"];

    // ------------------------------------------------------------------------------
    // MIXINS
    // ------------------------------------------------------------------------------
    var InfiniteFetchControllerMixin = __dependency3__["default"];
    var InfiniteFetchViewMixin = __dependency4__["default"];

    // ------------------------------------------------------------------------------
    // VIEWS
    // ------------------------------------------------------------------------------
    var ListViewCellContainer = __dependency5__["default"];
    var ListViewCell = __dependency6__["default"];
    var ListViewEditableCell = __dependency7__["default"];
    var ListViewCellContainer = __dependency5__["default"];
    var BooleanListViewCell = __dependency8__["default"];
    var HyperLinkListViewCell = __dependency9__["default"];
    var InfiniteListView = __dependency10__["default"];
    var ListViewHeader = __dependency11__["default"];
    var ListViewRow = __dependency12__["default"];


    // ------------------------------------------------------------------------------
    // COLUMNS
    // ------------------------------------------------------------------------------
    var BooleanListViewColumn = __dependency13__["default"];
    var HyperLinkListViewColumn = __dependency14__["default"];
    var ListViewColumn = __dependency15__["default"];



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

    __exports__["default"] = YLT;
  });
define("YLT/mixins/infinite-fetch-controller", 
  ["../controllers/list-view-row","../views/list-view-row","../views/list-view-footer-row","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    // Ember.Y.InfiniteFetchControllerMixin

    var ListViewRowController = __dependency1__["default"];
    var ListViewRow = __dependency2__["default"];
    var ListViewFooterRow = __dependency3__["default"];

    __exports__["default"] = Ember.Mixin.create({
    	isLoading: false,
    	autoEdit : false,
    	autoEditMode : 'cell', //cell, row
    	rowView: ListViewRow,
    	rowController: ListViewRowController,
    	columnGroup: null,
    	expandedView: null,
    	showFooter : false,
    	footerView : ListViewFooterRow,
    	selectedRow: null,
    	tableContentBinding: 'content',
    	mode : function(){
    		return this.loadData ? 'server' : 'client';
    	}.property(),

    	setOptions: function (forView, properties) {
    		var options = this.get('options') || Ember.Object.create({});

    		options.set(forView, Ember.Object.create(_.extend({
    			page: 1,
    			limit: 50,
    			filterText: null,
    			groups: Ember.ArrayProxy.create({content: Ember.A()}),
    			bufferGroup: null,
    			sortColumn: null,
    			isLoading: false,
    			sortAscending: false,
    			allDataLoaded: false,
    			queryParams: {},
    			forView : forView
    		}, properties)));

    		if (!this.get('options')) {
    			this.set('options', options);
    		}

    		return options.get(forView);
    	},

    	init: function () {
    		//set the properties inside the init method as we need separate instances for all
    		this._super();

    		if (this.get('columns')) {
    			this.get('columns').forEach(function (c) {
    				c.set('table', this);
    			}, this);
    		}

    		this.setOptions('tableContent');
    		this.addObserver('filterText', this, 'onFilterTextChanged');

    		this.set('arrangedColumns', Ember.ArrayProxy.create({content: Ember.A()}));
    	},

    	onArrangedColumns: function () {
    		Ember.run.next(this, function(){
    			this.get('arrangedColumns').setObjects(this.get('columns').filter(function (c) {
    				var columnGroups = c.get('groups');
    				return !columnGroups || columnGroups.contains(this.get('columnGroup'));
    			}, this));
    		}.bind(this));
    	}.observes('columns.[]', 'columnGroup').on('init'),

    	contentIsLoading: function () {
    		return this.get('isLoading') || this.get('options.tableContent.isLoading');
    	}.property('isLoading', 'options.tableContent.isLoading'),

    	resultsAreEmpty: function () {
    		return this.get('options.tableContent.groups.content.length') <= 0;
    	}.property('options.tableContent.groups.content.length'),

    	getLoadedContent : function(forView){
    		forView = this.getForView(forView) || 'tableContent';
    		var result = [],
    			option = this.get('options.' + forView);
    		if(option){
    			option.get('groups').forEach(function(group){
    				result.pushObjects(group);
    			});

    			var bufferGroup = option.get('bufferGroup');
    			if(bufferGroup){
    				result.pushObjects(bufferGroup);
    			}
    		}

    		return result;
    	},

    	resetContent: function (forView, content) {
    		content = content || this.get(forView);

    		var options = this.get('options.' + forView),
    			limit = options.get('limit'),
    			contentLength = content.get('length'),
    			self = this,
    			bufferGroup = null;

    		if (limit > 0) {
    			options.get('groups').clear();
    			var groups = [],
    				groupsCount = Math.floor(contentLength / limit);

    			content.setEach('isSelected', false);

    			if (contentLength % limit > 0) {
    				groupsCount++;
    			}

    			for (var i = 0; i < groupsCount - 1; i++) {
    				groups.push(this._getRowControllersOrRows(content.slice(i * limit, (i + 1) * limit)));
    			}

    			//in case no data is returned stay on page 1
    			groupsCount = Math.max(groupsCount, 1);
    			bufferGroup = this._getRowControllersOrRows(content.slice((groupsCount - 1) * limit));


    			options.get('groups').pushObjects(groups);
    			bufferGroup.setEach('isSelected', false);


    			options.setProperties({
    				bufferGroup: bufferGroup,
    				page: groupsCount,
    				allDataLoaded: false
    			});

    			Ember.run.scheduleOnce('afterRender', self, function () {
    				//if not enough data is loaded the vertical scroll might be visible
    				//in this case load more data or do nothing if we have loaded everything
    				if (groupsCount <= 1 || (bufferGroup.length > 0 && !self.documentHasVerticalScrollbar())) {
    					self.send('loadData', options);
    				}
    			});
    		}
    		else {
    			throw 'Page size must be greater than 0.';
    		}
    	},

    	contentChanged: function () {
    		this.set('selectedRow', null);
    		this.resetContent('tableContent');
    	}.observes('tableContent'),

    	onFilterTextChanged: function() {
    		this.set('options.tableContent.filterText', this.get('filterText'));
    		this.reloadData('tableContent');
    	},

    	actions: {
    		loadData: function (forView) {
    			forView = this.getForView(forView) || 'tableContent';
    			var options = null;
    			if(forView instanceof Ember.Object){
    				options = forView;
    				forView = options.forView;
    			}else{
    				options = this.get('options.' + forView);
    			}

    			if (options.get('isLoading') || options.get('allDataLoaded')) {
    				return;
    			}

    			var self = this,
    				bufferGroup = options.get('bufferGroup');

    			if (bufferGroup) {
    				if (bufferGroup.get('length') > 0) {
    					options.get('groups').pushObject(bufferGroup);
    				}

    				options.set('bufferGroup', null);
    			}

    			//if the last loaded records are less then the page size we have loaded everything
    			if ((bufferGroup && bufferGroup.length < options.get('limit')) || this.get('mode') === 'client' || !!this.loadData) {
    				options.set('allDataLoaded', true);
    			} else {
    				options.incrementProperty('page');

    				var promiseData = this.loadData(this.getLoadParams(forView));
    				if (promiseData) {
    					if (!promiseData.then) {
    						var data = promiseData;
    						promiseData = new Ember.RSVP.Promise(function (resolve) {
    							resolve({content: data});
    						});
    					}
    					options.set('isLoading', true);
    					promiseData.then(function (data) {
    						options.setProperties({
    							isLoading: false,
    								bufferGroup: self._getRowControllersOrRows(Array.isArray(data) ? data : data.content)
    						});

    						Ember.run.scheduleOnce('afterRender', self, function () {
    							//if not enough data is loaded the vertical scroll might be visible
    							//in this case load more data or do nothing if we have loaded everything
    							if (data.content && data.content.get('length') > 0 && !self.documentHasVerticalScrollbar()) {
    								options.incrementProperty('page');
    								self.send('loadData', options);
    							}
    						});
    					});
    				}
    			}
    		},

    		sortByColumn: function (column, forView) {
    			if (!column.get('sortable')) {
    				return;
    			}
    			forView = this.getForView(forView) || 'tableContent';
    			var options = this.get('options.' + forView);
    			if (column === options.get('sortColumn')) {
    				options.toggleProperty('sortAscending');
    			}

    			options.set('sortColumn', column);

    			this.reloadData(forView);
    		}
    	},


    	reloadData: function (forView) {
    		forView = this.getForView(forView) || 'tableContent';
    		var options = this.get('options.' + forView);

    		//reset all the parameters as the whole content will be replaced
    		options.setProperties({
    			page: 1,
    			bufferGroup: null,
    			allDataLoaded: this.get('mode') === 'client'
    		});

    		options.get('groups').clear();

    		if(this.get('mode') === 'server' && !!this.loadData){
    			var promiseData = this.loadData(this.getLoadParams(forView), forView),
    				self = this;

    			if (promiseData) {
    				if (!promiseData.then) {
    					var data = promiseData;
    					promiseData = new Ember.RSVP.Promise(function (resolve) {
    						resolve({ tableContent: data });
    					});
    				}
    				options.set('isLoading', true);

    				promiseData.then(function (data) {
    					options.set('isLoading', false);
    					self.set(forView, data);
    				});
    			}else{
    				options.set('allDataLoaded', true);
    			}
    		}
    	},

    	getLoadParams: function (forView) {
    		forView = this.getForView(forView) || 'tableContent';
    		var options = this.get('options.' + forView),
    			queryParams = options.get('queryParams'),
    			params = {};

    		if (options.get('filterText')) {
    			params.query = options.get('filterText');
    		}

    		if (queryParams) {
    			for (var prop in queryParams) {
    				if (queryParams[prop] !== null && queryParams[prop] !== undefined) {
    					params[prop] = queryParams[prop];
    				}
    			}
    		}

    		params.page = options.get('page');
    		params.limit = options.get('limit') * (params.page === 1 ? 2 : 1);

    		if (options.get('sortColumn')) {
    			params.dir = options.get('sortAscending') ? 'asc' : 'desc';
    			params.sort = options.get('sortColumn.valueBindingPath') || Ember.String.camelize(options.get('sortColumn.header'));
    		}

    		return params;
    	},

    	loadData: null, //function (/*params, forView*/) { //overwrite to load data	},

    	//overwrite this method if you want to use multiple result sets in a single grid
    	getForView: function (forView) {
    		return forView;
    	},

    	rowDoubleClick: function (/*row*/) {
    		return true;
    	},

    	documentHasVerticalScrollbar: function () {
    		// Check if body height is higher than window height :)
    		return Ember.$('body').height() > Ember.$(window).height();
    	},

    	insertRows : function(rows, forView){
    		this.addRows(rows, forView, this.get('options.' + forView + '.groups.firstObject'));
    	},

    	addRows : function(rows, forView, inGroup){
    		forView = this.getForView(forView) || 'tableContent';
    		var option = this.get('options.' + forView);
    		if(option && rows){
    			rows = Ember.isArray(rows) ? rows : [rows];
    			if(!Ember.isEmpty(rows)){
    				inGroup = inGroup || option.get('groups.lastObject');
    				rows = this._getRowControllersOrRows(rows);
    				//add to the last group, if there are no groups, create a new one
    				if(inGroup){
    					inGroup.pushObjects(rows);
    				}else{
    					option.get('groups').pushObject(rows);
    				}
    			}
    		}
    	},

    	removeRows : function(rows, forView){
    		forView = this.getForView(forView) || 'tableContent';
    		var option = this.get('options.' + forView);
    		if(option && rows){
    			rows = Ember.isArray(rows) ? rows : [rows];
    			if(!Ember.isEmpty(rows)){
    				var emptyGroups = [],
    					groups = option.get('groups'),
    					bufferGroup = option.get('bufferGroup');

    				groups.forEach(function(group){
    					group.removeObjects(rows);
    					if(group.get('length') === 0) {
    						emptyGroups.push(group);
    					}
    				});

    				if(!Ember.isEmpty(emptyGroups)) {
    					groups.removeObjects(emptyGroups);
    				}

    				if(bufferGroup){
    					bufferGroup.removeObjects(rows);
    					if(bufferGroup.get('length')===0) {
    						option.set('bufferGroup', null);
    					}
    				}
    			}
    		}
    	},

    	exportData : function(fileName, forView){
    		forView = forView || 'tableContent';
    		var options = this.get('options.' + forView),
    			rowController = this.get('rowController'),
    			csvContent = 'data:text/csv;charset=utf-8,';

    		this.get('arrangedColumns').forEach(function(column){
    			csvContent += ('"' +  (column.get('header') || '').toString().replace('"', '/"') + '",');
    		}, this);

    		csvContent += '\n';

    		this.getLoadedContent().forEach(function(row){
    			if(row instanceof rowController) {
    				row = row.get('row');
    			}

    			this.get('arrangedColumns').forEach(function(column){
    				csvContent += ('"' + (column.getRenderValue(row) || '').toString().replace('"', '/"') + '",');
    			});
    			csvContent += '\n';
    		}, this);

    		csvContent += '\n';

    		var encodedUri = encodeURI(csvContent);
    		var link = document.createElement('a');
    		link.setAttribute('href', encodedUri);
    		link.setAttribute('download', fileName || 'Data_Export.csv');

    		link.click(); // This will download the data file.
    	},

    	_getRowControllersOrRows: function (rows) {
    		var rowController = this.get('rowController');
    		rows = rowController ? rows.map(function (row) {
    			return (row instanceof rowController) ? row : (rowController.create({
    				target: this,
    															content: this.get('arrangedColumns'),
    															row : row,
    															container : this.get('container'),
    															parentController: this
    														}));
    		}, this) : rows;

    		return Ember.A(rows);
    	}
    });
  });
define("YLT/mixins/infinite-fetch-view", 
  ["exports"],
  function(__exports__) {
    "use strict";
    // Ember.Y.InfiniteFetchViewMixin

    __exports__["default"] = Ember.Mixin.create({
    	forView : 'tableContent',
    	footerOffset : null,
    	footerPosition : null,
    	_viewPort : null,
    	_footerRelativeTo : null,
    	didInsertElement: function () {
    		var	el = this.$(),
    			viewPort =  null;
    		el.parents().each(function(i, p){
    			var pEl = Ember.$(p);
    			if(!viewPort && ['scroll', 'auto'].contains(pEl.css('overflow-y'))) {
    				viewPort = pEl;
    			}
    		});
    		this.set('_viewPort', viewPort || Ember.$(window));

    		// todo: replace proxy
    		this.get('_viewPort').on('scroll', Ember.$.proxy(this.didScroll, this));
    		if(this.get('controller.showFooter')){
    			Ember.$(window).on('resize', Ember.$.proxy(this._onResize, this));
    			this._onResize();
    		}
    	},
    	willDestroyElement: function () {
    		// todo: replace proxy
    		this.get('_viewPort').off('scroll', Ember.$.proxy(this.didScroll, this));
    		Ember.$(window).off('resize', Ember.$.proxy(this._onResize, this));
    	},
    	didScroll: function () {
    		if (this.isScrolledToBottom()) {
    			this.get('controller').send('loadData', this.get('forView'));
    		}
    	},
    	isScrolledToBottom: function () {
    		var viewPort = this.get('_viewPort'),
    			el = Ember.$(viewPort.children()[0] || document),
    			distanceToViewportTop = (
    			el.height() - viewPort.height()),
    			viewPortTop = el.scrollTop();

    		if (viewPortTop === 0) {
    			// if we are at the top of the page, don't do
    			// the infinite scroll thing
    			return false;
    		}

    		return (viewPortTop - distanceToViewportTop === 0);
    	},
    	_onResize : function(){
    		var  el = this.$(),
    			footer = el.find('tfoot');
    		if(footer){
    			var	viewPort = null;
    			el.parents().each(function(i, p){
    				var pEl = Ember.$(p);
    				if(!viewPort && pEl.height() > 0 && pEl.height() < el.height()) {
    					viewPort = pEl;
    				}
    			});
    			if(!viewPort) {
    				viewPort = el;
    			}

    			var viewPortTop = viewPort.offset().top,
    				elOffsetTop = el.offset().top,
    				footerHeight =  Ember.$(footer).height(),
    				result = 0;

    			if(viewPort.height() <= el.height()){
    				result = viewPortTop + viewPort.height() - footerHeight;
    			}else{
    				result = elOffsetTop + el.height() - footerHeight;
    			}

    			this.set('footerOffset', 'top : ' + result + 'px;');
    		}
    	}
    });
  });
define("YLT/mixins/list-view-cell", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Mixin.create({
    	init: function() {
    		this._super();
    		
    		if( this.get('column.wordBreak') ) {
    			this.get('classNames').pushObjects(['word-break', 'break-word']);
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

    		// this checks if the column is sorted which means that an active tint needs to be applied
    		if( this.get('controller.options.content.sortColumn') === this.get('column') ) {
    			this.get('classNames').pushObject('active');
    		}
    	}
    });
  });
define("YLT/views/boolean-list-view-cell", 
  ["exports"],
  function(__exports__) {
    "use strict";
    // Ember.Y.BooleanListViewCell

    __exports__["default"] = Ember.View.extend({
    	tagName: 'td',
    	attributeBindings: ['row', 'column'],
    	row: null,
    	column: null,
    	template: Ember.Handlebars.compile('<span>{{boolean-to-check view.renderValue}}</span>'),

    	renderValue: function () {
    		return this.get('column').getRenderValue(this.get('row'));
    	}.property()
    });
  });
define("YLT/views/hyperlink-list-view-cell", 
  ["./list-view-cell","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    // Ember.Y.HyperLinkListViewCell
    var ListViewCell = __dependency1__["default"];


    __exports__["default"] = ListViewCell.extend({
    	template: Ember.Handlebars.compile('{{#if view.routeName}}' +
    			'<span>{{#link-to view.routeName view.rowId}}{{view.renderValue}}{{/link-to}}</span>' +
    		'{{else}}' +
    			'<span><a {{action "navigate" view.rowId target="view"}}>{{view.renderValue}}</a></span>' +
    		'{{/if}}'),
    	routeName : function(){
    		return this.get('column.routeName');
    	}.property('column', 'column.routeName'),
    	rowId : function(){
    		return this.get('column').getContext(this.get('row'));
    	}.property('column'),

    	actions: {
    		navigate: function () {
    			var column = this.get('column'),
    				row = this.get('row'),
    				routeName = column.get('routeName');

    			if (routeName) {
    				this.get('controller').transitionToRoute(routeName, column.getContext(row));
    			} else {
    				column.navigate.call(this, row);
    			}
    		}
    	}
    });
  });
define("YLT/views/infinite-list-view", 
  ["../mixins/infinite-fetch-view","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    // Ember.Y.InfiniteListView
    var InfiniteFetchViewMixin = __dependency1__["default"];


    __exports__["default"] = Ember.View.extend(InfiniteFetchViewMixin, {
    	contentBinding: 'controller',
    	template: Ember.Handlebars.compile(
            '<table {{bind-attr class=":table :table-striped :table-hover :stickyfooter fixedLayout"}}><thead><tr>' +
    			'{{#each column in arrangedColumns}}' +
    				'{{view column.headerView columnBinding="column" widthBinding="column.width"}}' +
    			'{{/each}}</tr></thead>' +
    			'<tbody>{{#each g in options.tableContent.groups}}' +
    				'{{#each row in g}}' +
    					'{{view row.parentController.rowView contentBinding="row" controllerBinding="row"}}' +
    					'{{#if row.isExpanded}}' +
    						'<tr><td {{bind-attr colspan="row.parentController.arrangedColumns.length"}}>{{view row.parentController.expandedView}}</td></tr>' +
    					'{{/if}}' +
    				'{{/each}}' +
    			'{{/each}}</tbody>' +
    			'{{#if showFooter}}' +
    			'<tfoot {{bind-attr style=view.footerOffset }}' +
    				'{{view footerView contentBinding="arrangedColumns"}}' +
    			'</tfoot>' +
    			'{{/if}}' +
    		'</table>' +
    		'{{#if controller.contentIsLoading}}' +
    			'<div class="loader"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>' +
    		'{{else}}'+
    			'{{#if resultsAreEmpty}}' +
    				'<div class="no-results">No Results</div>' +
    			'{{/if}}'+
            '{{/if}}')
    });
  });
define("YLT/views/list-view-cell-container", 
  ["../mixins/list-view-cell","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    // Ember.Y.ListViewCell

    var ListViewCellMixin = __dependency1__["default"];


    __exports__["default"] = Ember.ContainerView.extend(ListViewCellMixin,{
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
  });
define("YLT/views/list-view-cell", 
  ["../mixins/list-view-cell","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    // Ember.Y.ListViewCell

    var ListViewCellMixin = __dependency1__["default"];

    __exports__["default"] = Ember.View.extend(ListViewCellMixin,{
    	tagName: 'td',
    	attributeBindings: ['row', 'column'],
    	defaultTemplate: Ember.Handlebars.compile('<span>{{unbound view.renderValue}}</span>'),
    	row: null,
    	column: null,

    	renderValue: function () {
    		return this.get('column').getRenderValue(this.get('row'));
    	}.property()
    });
  });
define("YLT/views/list-view-editable-cell", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.View.extend({
    	defaultTemplate: Ember.Handlebars.compile(
    		'<span>{{input value=view.parentView.value type="text"}}</span>'
    	)
    });
  });
define("YLT/views/list-view-footer-row", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.CollectionView.extend({
    	tagName: 'tr',

    	createChildView: function (viewClass, attrs) {
    		var cellView = attrs.content.get('footerView');
    		attrs.column = attrs.content;
    		attrs.controller = this.get('controller');

    		viewClass = typeof cellView === 'string' ? this.container.lookupFactory(cellView) : cellView;

    		return this._super(viewClass, attrs);
    	}
    });
  });
define("YLT/views/list-view-footer", 
  ["exports"],
  function(__exports__) {
    "use strict";
    // Ember.Y.ListViewHeader

    __exports__["default"] = Ember.View.extend({
    	tagName: 'td',
    	attributeBindings: ['width'],
    	column: null,
    	
    	template: Ember.Handlebars.compile(
    		'{{#if view.renderValue}}' +
    			'<div>' +
    				'{{view.renderValue}}'+
    			'</div>' +
    		'{{/if}}'),

    	renderValue: function () {
    		var row = this.get('controller.footerRow'),
    			column = this.get('column');
    		return row ? column.getRenderValue(row) : column.get('emptyValue');
    	}.property()
    });
  });
define("YLT/views/list-view-header", 
  ["exports"],
  function(__exports__) {
    "use strict";
    // Ember.Y.ListViewHeader

    __exports__["default"] = Ember.View.extend({
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
  });
define("YLT/views/list-view-row", 
  ["../views/list-view-cell-container","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    // Ember.Y.ListViewRow

    var ListViewCellContainer = __dependency1__["default"];


    __exports__["default"] = Ember.CollectionView.extend({
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
  });
global.YLT = requireModule('YLT/main')['default'];
}(window));