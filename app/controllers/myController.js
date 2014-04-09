var myController = Ember.Controller.extend(Ember.TablePaginationMixin,{
	categoryType:'',
	needs: ['application'],
	actions:{
		new: function(){
			this.transitionToRoute('mytestroute');
		}
	}
});

export default myController;