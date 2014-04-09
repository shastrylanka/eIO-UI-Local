# Yahoo Light Table

### The documentation is work in progress as the API is likely to change.

## Setting up a controller
```
App.FooController = Ember.Controller.extend(YLT.InfiniteFetchControllerMixin, {
	columns: [
		YLT.ListViewColumn.create({
			valueBindingPath: 'id',
			header: 'ID',
			width:'50px'
		}),
		YLT.ListViewColumn.create({
			valueBindingPath: 'name',
			header: 'Name',
			width:'100px',
			renderer: function(val) { return formatter.percent(val); }
		}),
		YLT.ListViewColumn.create({
			valueBindingPath: 'cost',
			header: 'Cost',
			width:'100px',
			align: 'right',
			renderer: function(val) { return formatter.abbrev(val); }
		})
	],

	getLoadParams: function() {
		return Ember.$.extend(this._super(), { foosId: this.get('foosId') } );
	},

	loadData: function(params) {
		return this.store.find('foos', params);
	},

	rowDoubleClick:function(row) {
		/* take some action when the row is clicked */
		this.transitionToRoute('foo', row.id);
	}
});
```

## Rendering the table inside of your FoosView template
```
{{view 'YLT.InfiniteListView'}}
```

## Namespacing and ES6 Modules
Both are supported at the moment, but it's highly encouraged that if you're using the ES6 transpiler in your project that you make sure of `import` if you need to include or extend an object or mixin.  You can find the define paths for each of the types by reviewing defines within `dist\yahoo-table.js`

### Example
```
import HyperListViewColumn from 'YLT/columns/hyperlink-list-view-column';
```

## Projects using Yahoo Light Table
* [Yahoo Ad Manager Plus](https://git.corp.yahoo.com/ads-data/dsp)
* [Yahoo Report Central](https://git.corp.yahoo.com/ads-data/report-central)
