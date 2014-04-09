var eioUkController = Ember.Controller.extend({
needs: ['application'],
actions:{
  new: function(){
   this.transitionToRoute('eio_uk');
  }
}
});

export default eioUkController;