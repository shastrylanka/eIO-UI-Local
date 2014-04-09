var eioController = Ember.Controller.extend({
needs: ['application'],
actions:{
  new: function(){
   this.transitionToRoute('eio');
  }
}
});

export default eioController;