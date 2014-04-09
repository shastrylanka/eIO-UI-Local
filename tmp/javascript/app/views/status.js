var statusView = Ember.View.extend({
  showModal: function () {
    Em.$('#userDataModal').modal();
  }.on('didInsertElement')

});

export default statusView;