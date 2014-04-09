var SwitchComponent = Em.Component.extend({
    isChecked:      false,
    isDisabled:     false,
    labelOn:        'Active',
    labelOff:       'Inactive',

    labelText: function() {
        return this.get(this.get('isChecked') ? 'labelOn' : 'labelOff');
    }.property('isChecked', 'labelOn', 'labelOff')
});

export default SwitchComponent;