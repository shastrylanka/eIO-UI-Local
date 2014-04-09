define("appkit/components/switch-component", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var SwitchComponent = Em.Component.extend({
        isChecked:      false,
        isDisabled:     false,
        labelOn:        'Active',
        labelOff:       'Inactive',

        labelText: function() {
            return this.get(this.get('isChecked') ? 'labelOn' : 'labelOff');
        }.property('isChecked', 'labelOn', 'labelOff')
    });

    __exports__["default"] = SwitchComponent;
  });