// Ember.Y.InfiniteFetchControllerMixin

import ListViewRowController from '../controllers/list-view-row';
import ListViewRow from '../views/list-view-row';
import ListViewFooterRow from '../views/list-view-footer-row';

export default Ember.Mixin.create({
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
