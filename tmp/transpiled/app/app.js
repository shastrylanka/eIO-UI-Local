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