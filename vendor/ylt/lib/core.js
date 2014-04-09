var YLT;

if ('undefined' === typeof YLT) {
  YLT = Ember.Namespace.create({
    VERSION: '0.0.16'
  });

  if ('undefined' !== typeof window) {
    window.YLT = YLT;
  }

  if (Ember.libraries) {
    Ember.libraries.registerCoreLibrary('Yahoo Table', YLT.VERSION);
  }
}

export default YLT;
