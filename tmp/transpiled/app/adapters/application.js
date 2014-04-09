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