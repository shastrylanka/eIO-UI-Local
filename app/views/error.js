var errorView = Ember.View.extend({
  templateName: 'error',
    didInsertElement: function() {
    	$('#OrderDetails').hide();
    	$('#statLbl').hide();
    	$('#heading').hide();
    }
});

export default errorView;    