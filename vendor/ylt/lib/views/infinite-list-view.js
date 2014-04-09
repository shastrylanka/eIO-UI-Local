// Ember.Y.InfiniteListView
import InfiniteFetchViewMixin from '../mixins/infinite-fetch-view';


export default Ember.View.extend(InfiniteFetchViewMixin, {
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
