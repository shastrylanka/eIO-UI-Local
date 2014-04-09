import Serializer from 'appkit/serializers/application';

var Adapter = DS.RESTAdapter.extend({
  namespace: 'api/v1/',
  host: 'http://localhost:8080', 
  serializer : Serializer.create()
});

export default Adapter;


