define("appkit/adapters/application", 
  ["appkit/serializers/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Serializer = __dependency1__["default"];

    var Adapter = DS.RESTAdapter.extend({
      namespace: 'api/v1/',
      host: 'http://localhost:8080', 
      serializer : Serializer.create()
    });

    __exports__["default"] = Adapter;
  });
define("appkit/adapters/store", 
  [],
  function() {
    "use strict";
    /*import ApplicationAdapter from 'appkit/adapters/application';

    export default DS.Store.Extend({
      adapter: 'Adapter'
    });*/
  });
define("appkit/app", 
  ["resolver","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Resolver = __dependency1__["default"];

    var EioApp = Ember.Application.extend({
      LOG_ACTIVE_GENERATION: true,
      LOG_MODULE_RESOLVER: true,
      LOG_TRANSITIONS: true,
      LOG_TRANSITIONS_INTERNAL: true,
      LOG_VIEW_LOOKUPS: true,
      modulePrefix: 'appkit', // TODO: loaded via config
      Resolver: Resolver['default']
    });

    Ember.RSVP.configure('onerror', function(error) {
      // ensure unhandled promises raise awareness.
      // may result in false negatives, but visibility is more important
      if (error instanceof Error) {
        Ember.Logger.assert(false, error);
        Ember.Logger.error(error.stack);
      }
    });

    __exports__["default"] = EioApp;
  });
define("appkit/components/pretty-color", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Component.extend({
        classNames: ['pretty-color'],
        attributeBindings: ['style'],
        style: function() {
            return 'color: ' + this.get('name') + ';';
        }.property('name')
    });
  });
define("appkit/components/show-if", 
  ["exports"],
  function(__exports__) {
    "use strict";
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

    __exports__["default"] = component;
  });
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
define("appkit/controllers/eio", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var eioController = Ember.Controller.extend({
    needs: ['application'],
    actions:{
      new: function(){
       this.transitionToRoute('eio');
      }
    }
    });
    
    __exports__["default"] = eioController;
  });
define("appkit/controllers/eio_uk", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var eioUkController = Ember.Controller.extend({
    needs: ['application'],
    actions:{
      new: function(){
       this.transitionToRoute('eio_uk');
      }
    }
    });
    
    __exports__["default"] = eioUkController;
  });
define("appkit/controllers/eio_us", 
  ["exports"],
  function(__exports__) {
    "use strict";

    var TableTestController = Ember.ObjectController.extend({
    	
    });


    __exports__["default"] = TableTestController;
  });
define("appkit/controllers/error", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var errorController = Ember.Controller.extend({
    });

    __exports__["default"] = errorController;
  });
define("appkit/controllers/myController", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var myController = Ember.Controller.extend(Ember.TablePaginationMixin,{
    	categoryType:'',
    	needs: ['application'],
    	actions:{
    		new: function(){
    			this.transitionToRoute('mytestroute');
    		}
    	}
    });

    __exports__["default"] = myController;
  });
define("appkit/controllers/status", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var statusController = Ember.Controller.extend({
    	actions:{
       cancel: function(){
    		this.transitionToRoute('eio');
       },
       save: function(){
        $.ajax
          ({
            headers: { 
              'Accept': 'application/json',
              'Content-Type': 'application/json' 
            },
            type: "POST",
            url:'http://ne1-eiouidev-02.adx.pool.ne1.yahoo.com:4080/api/v1/order/decision',
            dataType: 'json',
            async: false,
            data :'{"companyName":"Apple","firstName":"Uma","lastName":"TG","email":"uma@yahoo.com","ipAddress":"127:2:1:0","orderId":"1-201682480", "rejCode":"2","rejReason":"reject","title":"Y!", "status":"1","phone":"408-349-1402"}',
            success: function () {
              Em.$('#userDataModal').modal('hide');
            },
            error:function(){
              Em.$('#userDataModal').modal('hide');
            }
        });
       }
      }
    });

    __exports__["default"] = statusController;
  });
define("appkit/helpers/current-year", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.makeBoundHelper(function() {
    	var d=new Date();
    	var year = d.getFullYear();
    	return year;
    });
  });
define("appkit/helpers/equal-to", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var equalTo = Ember.Handlebars.registerHelper(
    		function(lvalue, rvalue, options) {
    		    if (arguments.length < 2) {
    		        throw new Error("Handlebars Helper needs 2 parameters");
    		    }
    		    if(lvalue.indexOf(rvalue)!==-1){ //if it contains the string
    		    	console.log(lvalue);
    		    	console.log(rvalue);
    		    	var check="pass";
    		    	return options.inverse(this);
    		    } else {
    		        return options.fn(this);
    		    } 
    		}
    );
    
    __exports__["default"] = equalTo;
  });
define("appkit/helpers/format-date", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var formatDate = Ember.Handlebars.makeBoundHelper(
    		function(date) {
    		    if (arguments.length < 1) {
    		        throw new Error("Handlebars Helper needs atleast 1 parameter");
    		    }
    		   var newDate = date.substring(0,10)
    		   return new Ember.Handlebars.SafeString(newDate);
    		    
    		}
    );
    
    __exports__["default"] = formatDate;
  });
define("appkit/helpers/is-equal", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var isEqual = Ember.Handlebars.makeBoundHelper(
    		function(lvalue, rvalue) {
    		    if (arguments.length < 2) {
    		        throw new Error("Handlebars Helper needs 2 parameters");
    		    }
    		    if(lvalue.indexOf(rvalue)!==-1){
    		    	return new Ember.Handlebars.SafeString('</div><div class="row">');
    		    } 
    		}
    );
    
    __exports__["default"] = isEqual;
  });
define("appkit/helpers/percent-format", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var percentFormat = Ember.Handlebars.makeBoundHelper(
    		function(lvalue) {
    		    if (arguments.length < 1) {
    		        throw new Error("Handlebars Helper needs 2 parameters");
    		    }
    		    var percent = lvalue*100;
    		    percent=percent+ '%';
    		    return percent;
    		}
    );
    
    __exports__["default"] = percentFormat;
  });
define("appkit/helpers/reverse-word", 
  ["exports"],
  function(__exports__) {
    "use strict";
    // Please note that Handlebars helpers will only be found automatically by the
    // resolver if their name contains a dash (reverse-word, translate-text, etc.)
    // For more details: http://stefanpenner.github.io/ember-app-kit/guides/using-modules.html

    __exports__["default"] = Ember.Handlebars.makeBoundHelper(function(word) {
      return word.split('').reverse().join('');
    });
  });
define("appkit/resources/i18nSpec", 
  [],
  function() {
    "use strict";
    (function () {

      if (/^2\./.test(jQuery.fn.jquery)) {
        // jQuery 2 leaks globals, but mocha.globals slows down testing
        mocha.globals([ 'jQuery*' ]);
      }

      describe('Em.I18n', function () {
        var view;

        function render(template, options) {
          if (options == null) options = {};
          options.template = Em.Handlebars.compile(template);
          view = Em.View.create(options);
          Em.run(function() {
            view.append();
          });
        }

        beforeEach(function() {
          this.originalTranslations = Em.I18n.translations;

          Em.I18n.translations = {
            'user.edit.title': 'A Foobar',
            'foo.bar.named': 'A Foobar named {{name}}',
            'foo.save.disabled': 'Saving Foo...',
            'foos.zero': 'No Foos',
            'foos.one': 'One Foo',
            'foos.other': 'All {{count}} Foos',
            'bars.all': 'All {{count}} Bars',
            baz: {
              qux: 'A qux appears'
            },
            fum: {
              one: 'A fum',
              other: '{{count}} fums'
            }
          };

          CLDR.defaultLanguage = 'ksh';
        });

        afterEach(function() {
          if (view != null) view.destroy();
          Em.I18n.translations = this.originalTranslations;
          CLDR.defaultLanguage = null;
        });

        it('exists', function() {
          expect(Em.I18n).to.not.equal(undefined);
        });

        describe('.exists', function() {
          it('returns true for present keys', function() {
            expect(Em.I18n.exists('foo.bar')).to.equal(true);
          });

          it('returns false for absent keys', function() {
            expect(Em.I18n.exists('chumble.fuzz')).to.equal(false);
          });

          it("returns false for absent keys even if they've been used", function() {
            Em.I18n.t('yakka foob');
            expect(Em.I18n.exists('yakka foob')).to.equal(false);
          });
        });

        describe('.t', function() {
          it('translates simple strings', function() {
            expect(Em.I18n.t('foo.bar')).to.equal('A Foobar');
          });

          it('interpolates', function() {
            expect(Em.I18n.t('foo.bar.named', {
              name: 'Sue'
            })).to.equal('A Foobar named Sue');
          });

          it('uses the "zero" form when the language calls for it', function() {
            expect(Em.I18n.t('foos', {
              count: 0
            })).to.equal('No Foos');
          });

          it('uses the "one" form when the language calls for it', function() {
            expect(Em.I18n.t('foos', {
              count: 1
            })).to.equal('One Foo');
          });

          it('interpolates count', function() {
            expect(Em.I18n.t('foos', {
              count: 21
            })).to.equal('All 21 Foos');
          });

          it("works on keys that don't have count suffixes", function() {
            expect(Em.I18n.t('bars.all', {
              count: 532
            })).to.equal('All 532 Bars');
          });

          it('warns about missing translations', function() {
            expect(Em.I18n.t('nothing.here')).to.equal('Missing translation: nothing.here');
          });

          describe('missing event', function() {
            var observer;

            afterEach(function() {
                Ember.I18n.off('missing', observer);
            });

            it('triggers missing events when translations are missing', function() {
              var didCall = false;
              observer = function(key) {
                expect(key).to.equal('nothing.here');
                didCall = true;
              };
              Ember.I18n.on('missing', observer);
              Em.I18n.t('nothing.here');
              expect(didCall).to.equal(true);
            });
          });

          describe('using nested objects', function() {
            it('works with a simple case', function() {
              expect(Em.I18n.t('baz.qux')).to.equal('A qux appears');
            });

            it('works with counts', function() {
              expect(Em.I18n.t('fum', {
                count: 1
              })).to.equal('A fum');

              expect(Em.I18n.t('fum', {
                count: 2
              })).to.equal('2 fums');
            });
          });

          it('prefers dotted keys to nested ones', function() {
            Em.I18n.translations.foo = { bar: 'Nested foo.bar' };
            expect(Em.I18n.t('foo.bar')).to.equal('A Foobar');
          });
        });

        describe('{{t}}', function() {
          it('outputs simple translated strings', function() {
            render('{{t foo.bar}}');

            Em.run(function() {
              expect(view.$().text()).to.equal('A Foobar');
            });
          });

          it('interpolates values', function() {
            render('{{t bars.all count="597"}}');

            Em.run(function() {
              expect(view.$().text()).to.equal('All 597 Bars');
            });
          });

          it('interpolates bindings', function() {
            render('{{t bars.all countBinding="view.count"}}', { count: 3 });

            Em.run(function() {
              expect(view.$().text()).to.equal('All 3 Bars');
            });
          });

          it('responds to updates on bound properties', function() {
            render('{{t bars.all countBinding="view.count"}}', { count: 3 });

            Em.run(function() {
              view.set('count', 4);
            });

            Em.run(function() {
              expect(view.$().text()).to.equal('All 4 Bars');
            });
          });

          it('does not error due to bound properties during a rerender', function() {
            render('{{t bars.all countBinding="view.count"}}', { count: 3 });

            expect(function() {
              Em.run(function() {
                view.rerender();
                view.set('count', 4);
              });
            }).to.not['throw']();
          });

          it('responds to updates on bound properties after a rerender', function() {
            render('{{t bars.all countBinding="view.count"}}', { count: 3 });

            Em.run(function() {
              view.rerender();
              view.set('count', 4);
            });

            Em.run(function() {
              expect(view.$().text()).to.equal('All 4 Bars');
            });
          });

          it('obeys a custom tag name', function() {
            render('{{t foo.bar tagName="h2"}}');

            Em.run(function() {
              expect(view.$('h2').html()).to.equal('A Foobar');
            });
          });

          it('handles interpolations from contextual keywords', function() {
            render('{{t foo.bar.named nameBinding="view.favouriteBeer" }}', {
              favouriteBeer: 'IPA'
            });

            Em.run(function() {
              expect(view.$().text()).to.equal('A Foobar named IPA');
            });
          });

          it('responds to updates on bound keyword properties', function() {
            render('{{t foo.bar.named nameBinding="view.favouriteBeer"}}', {
              favouriteBeer: 'Lager'
            });

            expect(view.$().text()).to.equal('A Foobar named Lager');

            Em.run(function() {
              view.set('favouriteBeer', 'IPA');
            });

            Em.run(function() {
              expect(view.$().text()).to.equal('A Foobar named IPA');
            });
          });
        });

        describe('{{{t}}}', function() {
          it('does not over-escape translations', function() {
            Em.I18n.translations['message.loading'] = '<span class="loading">Loading�</span>';
            render('<div>{{{t "message.loading"}}}</div>');
            Em.run(function() {
              expect(view.$('.loading').length).to.equal(1);
              expect(view.$('.loading').text()).to.equal('Loading�');
            });
          });
        });

        describe('{{translateAttr}}', function() {
          it('outputs translated attribute strings', function() {
            render('<a {{translateAttr title="foo.bar" data-disable-with="foo.save.disabled"}}></a>');
            Em.run(function() {
              expect(view.$('a').attr('title')).to.equal('A Foobar');
              expect(view.$('a').attr('data-disable-with')).to.equal('Saving Foo...');
            });
          });
        });

        describe('{{ta}}', function() {
          it('outputs translated attribute strings', function() {
            render('<a {{ta title="foo.bar" data-disable-with="foo.save.disabled"}}></a>');
            Em.run(function() {
              expect(view.$('a').attr('title')).to.equal('A Foobar');
              expect(view.$('a').attr('data-disable-with')).to.equal('Saving Foo...');
            });
          });
        });

        describe('{{ta}} == {{translateAttr}}', function() {
          it('check that {{ta}} and {{translateAttr}} outputs the same', function() {
            render('<a {{ta title="foo.bar" data-disable-with="foo.save.disabled"}}></a><span {{translateAttr title="foo.bar" data-disable-with="foo.save.disabled"}}></span>');
            Em.run(function() {
              expect(view.$('a').attr('title')).to.equal(view.$('span').attr('title'));
              expect(view.$('a').attr('data-disable-with')).to.equal(view.$('span').attr('data-disable-with'));
            });
          });
        });

        describe('eachTranslatedAttribute', function() {
          var calledWith;

          beforeEach(function() {
            calledWith = {};
            var object = { aKey: 'a value', titleTranslation: 'foo.bar' };
            Ember.I18n.eachTranslatedAttribute(object, function(attributeName, translation) {
              calledWith[attributeName] = translation;
            });
          });

          it('skips non-translated attributes', function() {
            expect(calledWith.aKey).to.equal(undefined);
          });

          it('calls the callback with translated attributes, minus the marker suffix, and their translations', function() {
            expect(calledWith.title).to.equal('A Foobar');
          });
        });

        describe('TranslateableProperties', function() {

          it('translates ___Translation attributes on the object', function() {
            var subject = Em.Object.extend(Em.I18n.TranslateableProperties).create({
              titleTranslation: 'foo.bar'
            });
            expect(subject.get('title')).to.equal('A Foobar');
          });

        });

        describe('TranslateableProperties update', function() {

          it('translates ___Translation attributes on the object and updates them when set', function() {
            var subject = Em.Object.extend(Em.I18n.TranslateableProperties).create({
              titleTranslation: 'foo.bar'
            });
            expect(subject.get('title')).to.equal('A Foobar');
            subject.set('titleTranslation', 'foos.zero');
            expect(subject.get('title')).to.equal('No Foos');
          });

        });

        describe('TranslateableAttributes', function() {
          it('exists', function() {
            expect(Em.I18n.TranslateableAttributes).to.not.equal(undefined);
          });

          it('translates ___Translation attributes on the DOM element', function() {
            Em.View.reopen(Em.I18n.TranslateableAttributes);
            render('{{view titleTranslation="foo.bar"}}');
            expect(view.$().children().first().attr('title')).to.equal("A Foobar");
          });
        });
      });

    }).call(this);
  });
define("appkit/router", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var Router = Ember.Router.extend({
      location: 'history'

    }); // ensure we don't share routes between all Router instances

    Router.map(function() {
    	this.route('index',{path: '/'});
    	this.route('eio-us');
    	this.route('eio-uk',{path: '/eio-uk/:ord'});
    	this.route('eio',{path: '/eio/:ord'});
    	this.route('tc',{path: '/tc'});
    	this.route('status',{path: '/status'});
    	this.route('error',{path:'/error'});
    });


    __exports__["default"] = Router;
  });
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
define("appkit/routes/eio-us", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
      model: function() {

      }
    });
  });
define("appkit/routes/eio", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var Jsonable = Ember.Mixin.create({
        getJson: function() {
            var v, ret = [];
            for (var key in this) {
                if (this.hasOwnProperty(key)) {
                    v = this[key];
                    if (v === 'toString') {
                        continue;
                    } // ignore useless items
                    if (Ember.typeOf(v) === 'function') {
                        continue;
                    }
                    ret.push(key);
                }
            }
            return this.getProperties.apply(this, ret);
        }
    });
    
    var Decision = Ember.Object.extend(Jsonable,{
          "fName":"",
          "lName":"",
          "title":""
    });
    
    __exports__["default"] = Ember.Route.extend({
    
      model: function(params) {
        var url ='http://ne1-eiouidev-02.adx.pool.ne1.yahoo.com:4080/api/v1/orders/' + params.ord;
        var lang = $.getJSON('/assets/resources/navigation_da-DK.json');
        var finalData = [];
        finalData.push($.getJSON(url));
        finalData.push(lang)
        return finalData;
      },
      afterModel: function(ord) {
    	 
      },
      setupController: function(controller,model) {
        controller.set('ord',model);
      },
      actions: {
    
        accept: function(){
          var myModal = $('#tcModal');
          var modalBody = myModal.find('.modal-body');
          modalBody.load('/assets/tc/US_A_TC.html');
          var height = $(window).height() - 300;
          $('#tcModal').find(".modal-body").css("max-height", height);
          myModal.modal('show'); 
        },
    
        tcAccept: function() {
          Em.$('#userDataModal').modal('show');  
          //this.transitionTo('status');
        },
    
        error: function(){
          this.transitionTo('error');
        },
        save: function(){
          /* '{"companyName":"Apple","firstName":"Uma","lastName":"TG","email":"uma@yahoo.com",
         "ipAddress":"127:2:1:0","orderId":"1-201682480", "rejCode":"2","rejReason":"reject","title":"Y!", 
         "status":"1","phone":"408-349-1402"}*/
    
          var decision = Decision.create();
          decision.set('companyName',$('#cName').val());
          decision.set('firstName',$('#fName').val());
          decision.set('lastName',$('#lName').val());
          decision.set('email',$('#email').val());
          decision.set('title',$('#jTitle').val());
          decision.set('orderId',this.get('controller').get('ord').io.id);
          decision.set('phone', $('#phone').val());
          decision.set('status','1');
    
        $.ajax
        ({
        headers: { 
           'Accept': 'application/json',
           'Content-Type': 'application/json' 
         },
         type: "POST",
         url:'http://ne1-eiouidev-02.adx.pool.ne1.yahoo.com:4080/api/v1/order/decision',
         dataType: 'json',
         async: false,
         data : JSON.stringify(decision.getJson()),
         success: function (response) {
             Em.$('#userDataModal').modal('hide');
              $('#status').html(response.status);
              $('#decision').hide();
              $('#status').removeClass('label label-info');
              if(response.status =='Presented'){
                $('#status').addClass('label label-info');
              }
              if(response.status =='Accepted'){
                $('#status').addClass('label label-success');
              }
              if(response.status =='Expired'){
                $('#status').addClass('label-warning');
              }
              if(response.status =='Rejected'){
                $('#status').addClass('label-danger');
              }
    
              $.growl(response.status, {
                typ: 'success',            // 'error', 'warn', 'success' (className)
                timeout: 5000,          // how long for the growl to stay visible (ms)
                top: 70,                // start position
                right: 20,              // how many pixels to the right of the screen
                spacing: 10,            // bottom margin (spacing between growls)  
                transitionSpeed:  400   // fade in/out speed (ms)
              });
           },
           error:function(){
            Em.$('#userDataModal').modal('hide');
            $('#status').html('error');
           }
           });
          }
        }
      });
  });
define("appkit/routes/error", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
      model: function() {

      }
    });
  });
define("appkit/routes/helper_test", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
      model: function() {
        return {
          name: "ajoop"
        };
      }
    });
  });
define("appkit/routes/index", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
      model: function() {
        return ['red', 'yellow', 'blue', 'umatg'];
      }
    });
  });
define("appkit/routes/status", 
  ["exports"],
  function(__exports__) {
    "use strict";
    //import appkit/models/status;
    __exports__["default"] = Ember.Route.extend({
      model: function(){
          //return Status.create();
      },
      /*setupController : function(controller, model){
      	  console.log(model);
          controller.set('model', model);
      }*/
    });
  });
define("appkit/serializers/application", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = DS.RESTSerializer.extend({
      primaryKey: '_id'
    });
  });
define("appkit/utils/ajax", 
  ["exports"],
  function(__exports__) {
    "use strict";
    /* global ic */
    __exports__["default"] = function ajax(){
      return ic.ajax.apply(null, arguments);
    }
  });
define("appkit/views/eio", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var MyOwnView = Ember.View.extend({
      templateName: 'eio',
        didInsertElement: function() {
          var ord = this.get('controller').get('ord');
          console.log('Lang value is: ',ord);
          console.log("first Object",ord[0]);
          console.log("Second Object",ord[1]);
          console.log("Json Object for First  Object",ord[0]);
          eval('jsonData0 =',ord[0].responseText);
          console.log("Json Object for Second  Object",ord[1]);
          eval('jsonData1 =',ord[1].responseText);
          
              $(document).ajaxSend(function(event, request, settings) {
          $('#busy-overlay').removeClass('hidden');
        });
        $(document).ajaxComplete(function(event, request, settings) {
          $('#busy-overlay').addClass('hidden');
        });
    
          if(ord !=='undefined'){	
            $(".collapse").collapse();
            $('#orderid').html(ord.io.id);
            $('#campaignName').html(ord.io.coCampaignName);
            $('#clientRef').html(ord.io.clientRefNo);
            //$('date').html(ord.io.)
            if(ord.io.status.statusDesc =='Presented'){
              $(".label").addClass('label-info');
            }
            if(ord.io.status.statusDesc =='Accepted'){
              $(".label").addClass('label-success');
            }
            if(ord.io.status.statusDesc =='Expired'){
              $(".label").addClass('label-warning');
            }
            if(ord.io.status.statusDesc =='Rejected'){
              $(".label").addClass('label-danger');
            }
            $('#status').html(ord.io.status.statusDesc);
            if(ord.io.status.statusDesc !== 'Presented'){
              $('#decision').hide();
            }
          }else{
            $('#OrderDetails').html('');
            $(".alert").alert('close');
          }
        }
    });
    
    __exports__["default"] = MyOwnView;
  });
//@ sourceMappingURL=app.js.map