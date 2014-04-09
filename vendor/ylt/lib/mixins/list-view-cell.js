export default Ember.Mixin.create({
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
