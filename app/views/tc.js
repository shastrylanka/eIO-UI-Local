var tc = Ember.View.extend({
    templateName: "tc",
    //classNames: ["modal", "fade"],
    didInsertElement: function() {
        this.$('#myModal').modal('show');
        this.$('#myModal').on('hidden.bs.modal', $.proxy(this._viewDidHide,this));
    },
    // modal dismissed by example clicked in X, make sure the modal view is destroyed
    _viewDidHide: function() {
        this.get('controller').transitionToRoute('/eio-us');
    },
    // here we click in close button so _viewDidHide is called
    close: function() {        
        this.$(".close").click();
    }
});

export default tc;