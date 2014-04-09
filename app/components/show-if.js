var component = Ember.Component.extend({
  value1: null,
  value2: null,
  value3: null,
  operator: '===',

  conditionMatch: function () {
    var v1 = this.get('value1'),
      v2 = this.get('value2'),
      v3 = this.get('value3');

    //console.log(v1 + ' : ' + v2 + " : " + v3);
    if(v1.indexOf(v2)!==-1)
    {
    	return v1===v2;
    }
    else if(v1.indexOf(v3)!==-1)
    {
    	return v1===v3;
    }
    else return false;
   /* switch (this.get('operator')) {
      case '===':
        return v1 === v2;
      case '>':
        return v1 < v2;
      default:
        return false;
    }*/
  }.property('value1', 'value2', 'value3', 'operator')

});

export default component;
