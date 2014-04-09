define("appkit/routes/component_test", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
      model: function() {
        return ['purple', 'green', 'orange', 'red'];
      }
    });
  });