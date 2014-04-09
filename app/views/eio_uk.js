var MyOwnView = Ember.View.extend({
  templateName: 'eio-uk',
    didInsertElement: function() {
    	$.('#logo').html('/assets/img/Yahoo_uk.jpg');
    },
    
    productisAPT: function() {
        var ord = this.get('controller').get('ord');	
        return this.get('lineItems.productType') === 'APT Media';
      }.property('lineItems.productType')
});

export default MyOwnView;