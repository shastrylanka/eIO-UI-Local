define("appkit/tests/acceptance/index_test", 
  [],
  function() {
    "use strict";
    var App;

    module('Acceptances - Index', {
      setup: function(){
        App = startApp();
      },
      teardown: function() {
        Ember.run(App, 'destroy');
      }
    });

    test('index renders', function(){
      expect(3);

      visit('/').then(function(){
        var title = find('h1');
        var list = find('#test-target>li');

        equal(title.text(), 'Welcome to Ember.js');

        equal(list.length, 3);
        equal(list.text().replace(/\s/g, ''), 'redyellowblue');
      });
    });
  });