// Ember.Y.InfiniteFetchViewMixin

export default Ember.Mixin.create({
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
