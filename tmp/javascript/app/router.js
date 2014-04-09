var Router = Ember.Router.extend({
  location: 'history'

}); // ensure we don't share routes between all Router instances

Router.map(function() {
	this.route('index',{path: '/'});
	this.route('eio-us');
	this.route('eio-uk',{path: '/eio-uk/:ord'});
	this.route('eio',{path: '/eio/:ord'});
	this.route('tc',{path: '/tc'});
	this.route('status',{path: '/status'});
	this.route('error',{path:'/error'});
});


export default Router;
