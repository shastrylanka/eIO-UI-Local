;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
var _ref;

Ember.Table = Ember.Namespace.create();

Ember.Table.VERSION = '0.0.2';

if ((_ref = Ember.libraries) != null) {
  _ref.register('Ember Table', Ember.Table.VERSION);
}

require('./utils/jquery_fix');

require('./utils/scrollbar_width_helper');

require('./utils/resize_handler');

require('./utils/style_bindings');

require('./utils/lazy_container_view');

require('./utils/utils');

require('./controllers');

require('./row_selection_mixin');

require('./views');

require('./ember-table-templates.js');

},{"./ember-table-templates.js":2,"./utils/jquery_fix":3,"./utils/scrollbar_width_helper":4,"./utils/resize_handler":5,"./utils/style_bindings":6,"./utils/lazy_container_view":7,"./utils/utils":8,"./controllers":9,"./row_selection_mixin":10,"./views":11}],2:[function(require,module,exports){
Ember.TEMPLATES["body-container"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashContexts, hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class='table-scrollable-wrapper'>\n  ");
  hashContexts = {'classNames': depth0,'contentBinding': depth0,'columnsBinding': depth0,'widthBinding': depth0,'numItemsShowingBinding': depth0,'scrollTopBinding': depth0,'startIndexBinding': depth0};
  hashTypes = {'classNames': "STRING",'contentBinding': "STRING",'columnsBinding': "STRING",'widthBinding': "STRING",'numItemsShowingBinding': "STRING",'scrollTopBinding': "STRING",'startIndexBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Table.LazyTableBlock", {hash:{
    'classNames': ("left-table-block"),
    'contentBinding': ("controller.bodyContent"),
    'columnsBinding': ("controller.fixedColumns"),
    'widthBinding': ("controller._fixedBlockWidth"),
    'numItemsShowingBinding': ("controller._numItemsShowing"),
    'scrollTopBinding': ("controller._scrollTop"),
    'startIndexBinding': ("controller._startIndex")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  ");
  hashContexts = {'classNames': depth0,'contentBinding': depth0,'columnsBinding': depth0,'scrollLeftBinding': depth0,'widthBinding': depth0,'numItemsShowingBinding': depth0,'scrollTopBinding': depth0,'startIndexBinding': depth0};
  hashTypes = {'classNames': "STRING",'contentBinding': "STRING",'columnsBinding': "STRING",'scrollLeftBinding': "STRING",'widthBinding': "STRING",'numItemsShowingBinding': "STRING",'scrollTopBinding': "STRING",'startIndexBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Table.LazyTableBlock", {hash:{
    'classNames': ("right-table-block"),
    'contentBinding': ("controller.bodyContent"),
    'columnsBinding': ("controller.tableColumns"),
    'scrollLeftBinding': ("controller._tableScrollLeft"),
    'widthBinding': ("controller._tableBlockWidth"),
    'numItemsShowingBinding': ("controller._numItemsShowing"),
    'scrollTopBinding': ("controller._scrollTop"),
    'startIndexBinding': ("controller._startIndex")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["footer-container"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashContexts, hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class='table-fixed-wrapper'>\n  ");
  hashContexts = {'classNames': depth0,'contentBinding': depth0,'columnsBinding': depth0,'widthBinding': depth0,'heightBinding': depth0};
  hashTypes = {'classNames': "STRING",'contentBinding': "STRING",'columnsBinding': "STRING",'widthBinding': "STRING",'heightBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Table.TableBlock", {hash:{
    'classNames': ("left-table-block"),
    'contentBinding': ("controller.footerContent"),
    'columnsBinding': ("controller.fixedColumns"),
    'widthBinding': ("controller._fixedBlockWidth"),
    'heightBinding': ("controller.footerHeight")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  ");
  hashContexts = {'classNames': depth0,'contentBinding': depth0,'columnsBinding': depth0,'scrollLeftBinding': depth0,'widthBinding': depth0,'heightBinding': depth0};
  hashTypes = {'classNames': "STRING",'contentBinding': "STRING",'columnsBinding': "STRING",'scrollLeftBinding': "STRING",'widthBinding': "STRING",'heightBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Table.TableBlock", {hash:{
    'classNames': ("right-table-block"),
    'contentBinding': ("controller.footerContent"),
    'columnsBinding': ("controller.tableColumns"),
    'scrollLeftBinding': ("controller._tableScrollLeft"),
    'widthBinding': ("controller._tableBlockWidth"),
    'heightBinding': ("controller.footerHeight")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["header-cell"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<span ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sortByColumn", "view.content", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n  ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.content.headerCellName", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</span>\n");
  return buffer;
  
});

Ember.TEMPLATES["header-container"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashContexts, hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class='table-fixed-wrapper'>\n  ");
  hashContexts = {'classNames': depth0,'columnsBinding': depth0,'widthBinding': depth0,'heightBinding': depth0};
  hashTypes = {'classNames': "STRING",'columnsBinding': "STRING",'widthBinding': "STRING",'heightBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Table.HeaderBlock", {hash:{
    'classNames': ("left-table-block"),
    'columnsBinding': ("controller.fixedColumns"),
    'widthBinding': ("controller._fixedBlockWidth"),
    'heightBinding': ("controller.headerHeight")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  ");
  hashContexts = {'classNames': depth0,'columnsBinding': depth0,'scrollLeftBinding': depth0,'widthBinding': depth0,'heightBinding': depth0};
  hashTypes = {'classNames': "STRING",'columnsBinding': "STRING",'scrollLeftBinding': "STRING",'widthBinding': "STRING",'heightBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Table.HeaderBlock", {hash:{
    'classNames': ("right-table-block"),
    'columnsBinding': ("controller.tableColumns"),
    'scrollLeftBinding': ("controller._tableScrollLeft"),
    'widthBinding': ("controller._tableBlockWidth"),
    'heightBinding': ("controller.headerHeight")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["header-row"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashContexts, hashTypes, escapeExpression=this.escapeExpression;


  hashContexts = {'contentBinding': depth0,'itemViewClassField': depth0,'widthBinding': depth0};
  hashTypes = {'contentBinding': "STRING",'itemViewClassField': "STRING",'widthBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.MultiItemViewCollectionView", {hash:{
    'contentBinding': ("view.content"),
    'itemViewClassField': ("headerCellViewClass"),
    'widthBinding': ("controller._tableColumnsWidth")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["table-row"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashContexts, hashTypes, escapeExpression=this.escapeExpression;


  hashContexts = {'rowBinding': depth0,'contentBinding': depth0,'itemViewClassField': depth0,'widthBinding': depth0};
  hashTypes = {'rowBinding': "STRING",'contentBinding': "STRING",'itemViewClassField': "STRING",'widthBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.MultiItemViewCollectionView", {hash:{
    'rowBinding': ("view.row"),
    'contentBinding': ("view.columns"),
    'itemViewClassField': ("tableCellViewClass"),
    'widthBinding': ("controller._tableColumnsWidth")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["tables-container"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n  ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Table.HeaderTableContainer", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n  ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Table.FooterTableContainer", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n");
  return buffer;
  }

  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "controller.hasHeader", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Table.BodyTableContainer", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "controller.hasFooter", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Table.ScrollContainer", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n");
  return buffer;
  
});
},{}],3:[function(require,module,exports){
/*
jQuery.browser shim that makes HT working with jQuery 1.8+
*/

if (!jQuery.browser) {
  (function() {
    var browser, matched, res;
    matched = void 0;
    browser = void 0;
    jQuery.uaMatch = function(ua) {
      var match;
      ua = ua.toLowerCase();
      match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
      return {
        browser: match[1] || "",
        version: match[2] || "0"
      };
    };
    matched = jQuery.uaMatch(navigator.userAgent);
    browser = {};
    if (matched.browser) {
      browser[matched.browser] = true;
      browser.version = matched.version;
    }
    if (browser.chrome) {
      browser.webkit = true;
    } else {
      if (browser.webkit) {
        browser.safari = true;
      }
    }
    res = jQuery.browser = browser;
    return res;
  })();
}

},{}],4:[function(require,module,exports){

(function($) {
  $.getScrollbarWidth = function() {
    var $div, $textarea1, $textarea2, scrollbarWidth;
    scrollbarWidth = 0;
    if (!scrollbarWidth) {
      if ($.browser.msie) {
        $textarea1 = $("<textarea cols=\"10\" rows=\"2\"></textarea>").css({
          position: "absolute",
          top: -1000,
          left: -1000
        }).appendTo("body");
        $textarea2 = $("<textarea cols=\"10\" rows=\"2\" style=\"overflow: hidden;\"></textarea>").css({
          position: "absolute",
          top: -1000,
          left: -1000
        }).appendTo("body");
        scrollbarWidth = $textarea1.width() - $textarea2.width();
        $textarea1.add($textarea2).remove();
      } else {
        $div = $("<div />").css({
          width: 100,
          height: 100,
          overflow: "auto",
          position: "absolute",
          top: -1000,
          left: -1000
        }).prependTo("body").append("<div />").find("div").css({
          width: "100%",
          height: 200
        });
        scrollbarWidth = 100 - $div.width();
        $div.parent().remove();
      }
    }
    return scrollbarWidth;
  };
  return $.getScrollbarWidth;
})(jQuery);

},{}],5:[function(require,module,exports){
var debounce;

Ember.ResizeHandler = Ember.Mixin.create({
  resizeEndDelay: 200,
  resizing: false,
  onResizeStart: Ember.K,
  onResizeEnd: Ember.K,
  onResize: Ember.K,
  debounceResizeEnd: Ember.computed(function() {
    var _this = this;
    return debounce(function(event) {
      if (_this.isDestroyed) {
        return;
      }
      _this.set('resizing', false);
      return typeof _this.onResizeEnd === "function" ? _this.onResizeEnd(event) : void 0;
    }, this.get('resizeEndDelay'));
  }).property('resizeEndDelay'),
  resizeHandler: Ember.computed(function() {
    return jQuery.proxy(this.handleWindowResize, this);
  }).property(),
  handleWindowResize: function(event) {
    if (!this.get('resizing')) {
      this.set('resizing', true);
      if (typeof this.onResizeStart === "function") {
        this.onResizeStart(event);
      }
    }
    if (typeof this.onResize === "function") {
      this.onResize(event);
    }
    return this.get('debounceResizeEnd')(event);
  },
  didInsertElement: function() {
    this._super();
    $(window).bind('resize', this.get("resizeHandler"));
  },
  willDestroyElement: function() {
    $(window).unbind('resize', this.get("resizeHandler"));
    return this._super();
  }
});

debounce = function(func, wait, immediate) {
  var result, timeout;
  timeout = result = null;
  return function() {
    var args, callNow, context, later;
    context = this;
    args = arguments;
    later = function() {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
      }
      return result;
    };
    callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
    }
    return result;
  };
};

},{}],6:[function(require,module,exports){

Ember.StyleBindingsMixin = Ember.Mixin.create({
  concatenatedProperties: ['styleBindings'],
  attributeBindings: ['style'],
  unitType: 'px',
  createStyleString: function(styleName, property) {
    var value;
    value = this.get(property);
    if (value === void 0) {
      return;
    }
    if (Ember.typeOf(value) === 'number') {
      value = value + this.get('unitType');
    }
    return "" + styleName + ":" + value + ";";
  },
  applyStyleBindings: function() {
    var lookup, properties, styleBindings, styleComputed, styles,
      _this = this;
    styleBindings = this.styleBindings;
    if (!styleBindings) {
      return;
    }
    lookup = {};
    styleBindings.forEach(function(binding) {
      var property, style, tmp;
      tmp = binding.split(':');
      property = tmp[0];
      style = tmp[1];
      lookup[style || property] = property;
    });
    styles = Ember.keys(lookup);
    properties = styles.map(function(style) {
      return lookup[style];
    });
    styleComputed = Ember.computed(function() {
      var styleString, styleTokens;
      styleTokens = styles.map(function(style) {
        return _this.createStyleString(style, lookup[style]);
      });
      styleString = styleTokens.join('');
      if (styleString.length !== 0) {
        return styleString;
      }
    });
    styleComputed.property.apply(styleComputed, properties);
    return Ember.defineProperty(this, 'style', styleComputed);
  },
  init: function() {
    this.applyStyleBindings();
    return this._super();
  }
});

},{}],7:[function(require,module,exports){

Ember.LazyContainerView = Ember.ContainerView.extend(Ember.StyleBindingsMixin, {
  classNames: 'lazy-list-container',
  styleBindings: ['height'],
  content: null,
  itemViewClass: null,
  rowHeight: null,
  scrollTop: null,
  startIndex: null,
  init: function() {
    this._super();
    return this.onNumChildViewsDidChange();
  },
  height: Ember.computed(function() {
    return this.get('content.length') * this.get('rowHeight');
  }).property('content.length', 'rowHeight'),
  numChildViews: Ember.computed(function() {
    return this.get('numItemsShowing') + 2;
  }).property('numItemsShowing'),
  onNumChildViewsDidChange: Ember.observer(function() {
    var itemViewClass, newNumViews, numViewsToInsert, oldNumViews, view, viewsToAdd, viewsToRemove, _i, _results;
    view = this;
    itemViewClass = Ember.get(this.get('itemViewClass'));
    newNumViews = this.get('numChildViews');
    if (!(itemViewClass && newNumViews)) {
      return;
    }
    oldNumViews = this.get('length');
    numViewsToInsert = newNumViews - oldNumViews;
    if (numViewsToInsert < 0) {
      viewsToRemove = this.slice(newNumViews, oldNumViews);
      return this.removeObjects(viewsToRemove);
    } else if (numViewsToInsert > 0) {
      viewsToAdd = (function() {
        _results = [];
        for (var _i = 0; 0 <= numViewsToInsert ? _i < numViewsToInsert : _i > numViewsToInsert; 0 <= numViewsToInsert ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).map(function() {
        return view.createChildView(itemViewClass);
      });
      return this.pushObjects(viewsToAdd);
    }
  }, 'numChildViews', 'itemViewClass'),
  viewportDidChange: Ember.observer(function() {
    var clength, content, numShownViews, startIndex;
    content = this.get('content') || [];
    clength = content.get('length');
    numShownViews = Math.min(this.get('length'), clength);
    startIndex = this.get('startIndex');
    if (startIndex + numShownViews >= clength) {
      startIndex = clength - numShownViews;
    }
    if (startIndex < 0) {
      startIndex = 0;
    }
    return this.forEach(function(childView, i) {
      var item, itemIndex;
      if (i >= numShownViews) {
        childView = this.objectAt(i);
        childView.set('content', null);
        return;
      }
      itemIndex = startIndex + i;
      childView = this.objectAt(itemIndex % numShownViews);
      item = content.objectAt(itemIndex);
      if (item !== childView.get('content')) {
        childView.teardownContent();
        childView.set('itemIndex', itemIndex);
        childView.set('content', item);
        return childView.prepareContent();
      }
    }, this);
  }, 'content.length', 'length', 'startIndex')
});

/**
 * Lazy Item View
 * @class
 * @alias Ember.LazyItemView
*/


Ember.LazyItemView = Ember.View.extend(Ember.StyleBindingsMixin, {
  itemIndex: null,
  prepareContent: Ember.K,
  teardownContent: Ember.K,
  rowHeightBinding: 'parentView.rowHeight',
  styleBindings: ['width', 'top', 'display'],
  top: Ember.computed(function() {
    return this.get('itemIndex') * this.get('rowHeight');
  }).property('itemIndex', 'rowHeight'),
  display: Ember.computed(function() {
    if (!this.get('content')) {
      return 'none';
    }
  }).property('content')
});

},{}],8:[function(require,module,exports){
/**
 * Multi Item View Collection View
 * @class
 * @alias Ember.Table.MultiItemViewCollectionView
*/

Ember.MultiItemViewCollectionView = Ember.CollectionView.extend({
  itemViewClassField: null,
  createChildView: function(view, attrs) {
    var itemViewClass, itemViewClassField;
    itemViewClassField = this.get('itemViewClassField');
    itemViewClass = attrs.content.get(itemViewClassField);
    if (typeof itemViewClass === 'string') {
      itemViewClass = Ember.get(Ember.lookup, itemViewClass);
    }
    return this._super(itemViewClass, attrs);
  }
});

Ember.MouseWheelHandlerMixin = Ember.Mixin.create({
  onMouseWheel: Ember.K,
  didInsertElement: function() {
    var _this = this;
    this._super();
    return this.$().bind('mousewheel', function(event, delta, deltaX, deltaY) {
      return Ember.run(_this, _this.onMouseWheel, event, delta, deltaX, deltaY);
    });
  },
  willDestroy: function() {
    var _ref;
    if ((_ref = this.$()) != null) {
      _ref.unbind('mousewheel');
    }
    return this._super();
  }
});

Ember.ScrollHandlerMixin = Ember.Mixin.create({
  onScroll: Ember.K,
  didInsertElement: function() {
    var _this = this;
    this._super();
    return this.$().bind('scroll', function(event) {
      return Ember.run(_this, _this.onScroll, event);
    });
  },
  willDestroy: function() {
    var _ref;
    if ((_ref = this.$()) != null) {
      _ref.unbind('scroll');
    }
    return this._super();
  }
});

Ember.TouchMoveHandlerMixin = Ember.Mixin.create({
  onTouchMove: Ember.K,
  didInsertElement: function() {
    var startX, startY,
      _this = this;
    this._super();
    startX = startY = 0;
    this.$().bind('touchstart', function(event) {
      startX = event.originalEvent.targetTouches[0].pageX;
      startY = event.originalEvent.targetTouches[0].pageY;
    });
    return this.$().bind('touchmove', function(event) {
      var deltaX, deltaY, newX, newY;
      newX = event.originalEvent.targetTouches[0].pageX;
      newY = event.originalEvent.targetTouches[0].pageY;
      deltaX = -(newX - startX);
      deltaY = -(newY - startY);
      Ember.run(_this, _this.onTouchMove, event, deltaX, deltaY);
      startX = newX;
      startY = newY;
    });
  },
  willDestroy: function() {
    var _ref;
    if ((_ref = this.$()) != null) {
      _ref.unbind('touchmove');
    }
    return this._super();
  }
});

},{}],9:[function(require,module,exports){
/**
 * Column Definition
 * @class
 * @alias Ember.Table.ColumnDefinition
*/

Ember.Table.ColumnDefinition = Ember.Object.extend({
  headerCellName: null,
  /**
  * Resize
  * @memberof Ember.Table.ColumnDefinition
  * @instance
  * @argument {number} pxWidth Width
  * @argument {number} tableWidth Table Width
  */

  resize: function(pxWidth, tableWidth) {
    var diff, newMaxWidth, newWidth, nextCol, oldWidth, percent;
    newMaxWidth = null;
    tableWidth = tableWidth || this.get("controller._tableContainerWidth");
    if (!this.get("controller.fluidTable")) {
      if (pxWidth) {
        this.set("columnWidth", pxWidth);
      }
      return null;
    }
    if (!tableWidth) {
      return;
    }
    percent = function(val) {
      if ("string" === typeof val) {
        return +(val.replace("%", ""));
      } else {
        return val * 100 / tableWidth;
      }
    };
    oldWidth = percent(this.get("columnWidth"));
    newWidth = 'number' === typeof pxWidth ? percent(pxWidth) : oldWidth;
    nextCol = this.get("_nextColumn");
    if (nextCol) {
      diff = oldWidth - newWidth + percent(nextCol.get("columnWidth"));
      nextCol.set("columnWidth", diff / 100 * tableWidth);
      newMaxWidth = (newWidth + diff) / 100 * tableWidth - 100;
    }
    this.set("columnWidth", newWidth / 100 * tableWidth);
    this.notifyPropertyChange("columnWidth");
    return newMaxWidth;
  },
  /**
  * Convert Columns to Width
  * @memberof Ember.Table.ColumnDefinition
  * @method
  * @instance
  * @private
  */

  _convertColumnToWidth: Ember.beforeObserver(function() {
    var tableWidth;
    if (!this.get("controller.fluidTable")) {
      return;
    }
    tableWidth = this.get("controller._tableContainerWidth");
    if (tableWidth) {
      return this.set("columnWidth", this.get("columnWidth") / tableWidth * 100 + "%");
    }
  }, "controller._tableContainerWidth"),
  /**
  * Resize to Table
  * @memberof Ember.Table.ColumnDefinition
  * @method
  * @instance
  * @private
  */

  _resizeToTable: Ember.observer(function() {
    return this.resize();
  }, "controller._tableContainerWidth"),
  /**
  * Column Width
  * @memberof Ember.Table.ColumnDefinition
  * @member {Integer} columnWidth
  * @todo Default column width should be shared with LESS file
  */

  columnWidth: 150,
  headerCellViewClass: 'Ember.Table.HeaderCell',
  tableCellViewClass: 'Ember.Table.TableCell',
  /**
  * Get Cell Content - This gives a formatted value e.g. $20,000,000
  * @memberof Ember.Table.ColumnDefinition
  * @instance
  * @argument row {Ember.Table.Row}
  * @todo More detailed doc needed!
  */

  getCellContent: function(row) {
    var path;
    path = this.get('contentPath');
    Ember.assert("You must either provide a contentPath or override " + "getCellContent in your column definition", path != null);
    return Ember.get(row, path);
  },
  /**
  * Set Cell Content
  * @memberof Ember.Table.ColumnDefinition
  * @instance
  */

  setCellContent: Ember.K
});

/**
 * Table Row
 * @class
 * @alias Ember.Table.Row
*/


Ember.Table.Row = Ember.ObjectProxy.extend({
  /**
  * Content of the row
  * @memberof Ember.Table.Row
  * @member content
  * @instance
  */

  content: null,
  /**
  * Is Hovering?
  * @memberof Ember.Table.Row
  * @member {Boolean} isHovering
  * @instance
  */

  isHovering: false,
  /**
  * Is Selected?
  * @memberof Ember.Table.Row
  * @member {Boolean} isSelected
  * @instance
  */

  isSelected: false,
  /**
  * Is Showing?
  * @memberof Ember.Table.Row
  * @member {Boolean} isShowing
  * @instance
  */

  isShowing: true,
  /**
  * Is Active?
  * @memberof Ember.Table.Row
  * @member {Boolean} isActive
  * @instance
  */

  isActive: false
});

/**
* Table Row Array Proxy
* @class
* @alias Ember.Table.RowArrayProxy
*/


Ember.Table.RowArrayProxy = Ember.ArrayProxy.extend({
  tableRowClass: null,
  content: null,
  rowContent: Ember.computed(function() {
    return Ember.A();
  }).property(),
  /**
  * Get Object At Index
  * @memberof Ember.Table.RowArrayProxy
  * @instance
  * @argument idx {Integer} Index of the object
  */

  objectAt: function(idx) {
    var item, row, tableRowClass;
    row = this.get('rowContent')[idx];
    if (row) {
      return row;
    }
    tableRowClass = this.get('tableRowClass');
    item = this.get('content').objectAt(idx);
    row = tableRowClass.create({
      content: item
    });
    this.get('rowContent')[idx] = row;
    return row;
  },
  /**
  * Content changed callback
  * @memberof Ember.Table.RowArrayProxy
  * @instance
  * @argument idx {Integer} Index of the object
  * @argument removed {Integer} Number of rows removed
  * @argument added {Integer} Number of rows added
  */

  arrayContentDidChange: function(idx, removed, added) {
    if (added < 0) {
      added = 0;
    }
    if (removed < 0) {
      removed = 0;
    }
    this.get('rowContent').replace(idx, removed, new Array(added));
    return this._super.apply(this, arguments);
  }
});

/**
* Frozen Table Controller
* @class
* @alias Ember.Table.TableController
*/


Ember.Table.TableController = Ember.Controller.extend({
  columns: null,
  numFixedColumns: 0,
  numFooterRow: 0,
  rowHeight: 30,
  headerHeight: 50,
  footerHeight: 30,
  hasHeader: true,
  hasFooter: true,
  tableRowViewClass: 'Ember.Table.TableRow',
  fluidTable: false,
  /**
  * Table Body Content - Array of Ember.Table.Row
  * @memberof Ember.Table.TableController
  * @instance
  */

  bodyContent: Ember.computed(function() {
    return Ember.Table.RowArrayProxy.create({
      tableRowClass: Ember.Table.Row,
      content: this.get('content')
    });
  }).property('content'),
  /**
  * Table Footer Content - Array of Ember.Table.Row
  * @memberof Ember.Table.TableController
  * @instance
  */

  footerContent: Ember.computed(function(key, value) {
    if (value) {
      return value;
    } else {
      return Ember.A();
    }
  }).property(),
  /**
  * Table Fixed Columns
  * @memberof Ember.Table.TableController
  * @instance
  * @todo Much more doc needed
  */

  fixedColumns: Ember.computed(function() {
    var columns, numFixedColumns;
    columns = this.get('columns');
    if (!columns) {
      return Ember.A();
    }
    numFixedColumns = this.get('numFixedColumns') || 0;
    return columns.slice(0, numFixedColumns);
  }).property('columns.@each', 'numFixedColumns'),
  /**
  * Table Columns
  * @memberof Ember.Table.TableController
  * @instance
  * @todo Much more doc needed
  */

  tableColumns: Ember.computed(function() {
    var columns, numFixedColumns;
    columns = this.get('columns');
    if (!columns) {
      return Ember.A();
    }
    numFixedColumns = this.get('numFixedColumns') || 0;
    columns = columns.slice(numFixedColumns, columns.get('length'));
    this.prepareTableColumns(columns);
    return columns;
  }).property('columns.@each', 'numFixedColumns'),
  /**
  * Prepare Table Columns
  * @memberof Ember.Table.TableController
  * @instance
  */

  prepareTableColumns: Ember.observer(function(tableColumns) {
    var col, columns, i, _i, _len, _results;
    columns = Ember.isArray(tableColumns) ? tableColumns : this.get("tableColumns");
    _results = [];
    for (i = _i = 0, _len = columns.length; _i < _len; i = ++_i) {
      col = columns[i];
      col.set("_nextColumn", columns.objectAt(i + 1));
      _results.push(col.set("controller", this));
    }
    return _results;
  }, "tableColumns.@each", "tableColumns"),
  actions: {
    sortByColumn: Ember.K
  },
  _tableScrollTop: 0,
  _tableScrollLeft: 0,
  _width: null,
  _height: null,
  _scrollbarSize: null,
  /**
  * Actual width of the fixed columns (frozen columns)
  * @memberof Ember.Table.TableController
  * @instance
  * @private
  */

  _fixedColumnsWidth: Ember.computed(function() {
    return this._getTotalWidth(this.get('fixedColumns'));
  }).property('fixedColumns.@each.columnWidth'),
  /**
  * Actual width of the table columns (non-frozen columns)
  * @memberof Ember.Table.TableController
  * @instance
  * @private
  */

  _tableColumnsWidth: Ember.computed(function() {
    if (this.get("fluidTable")) {
      return "100%";
    }
    return this._getTotalWidth(this.get('tableColumns'));
  }).property('tableColumns.@each.columnWidth', "fluidTable"),
  /**
  * Computed Row Width
  * @memberof Ember.Table.TableController
  * @instance
  * @private
  */

  _rowWidth: Ember.computed(function() {
    var columnsWidth, nonFixedTableWidth;
    columnsWidth = this.get('_tableColumnsWidth');
    nonFixedTableWidth = this.get('_tableContainerWidth') - this.get('_fixedColumnsWidth');
    if (columnsWidth < nonFixedTableWidth) {
      return nonFixedTableWidth;
    }
    return columnsWidth;
  }).property('_fixedColumnsWidth', '_tableColumnsWidth', '_tableContainerWidth'),
  /**
  * Computed Body Height
  * @memberof Ember.Table.TableController
  * @instance
  * @private
  */

  _bodyHeight: Ember.computed(function() {
    var bodyHeight, footerHeight, headerHeight, scrollbarSize;
    bodyHeight = this.get('_height');
    headerHeight = this.get('headerHeight');
    footerHeight = this.get('footerHeight');
    scrollbarSize = this.get('_scrollbarSize');
    if (this.get('_tableColumnsWidth') > this.get('_width') - this.get('_fixedColumnsWidth')) {
      bodyHeight -= scrollbarSize;
    }
    if (this.get('hasHeader')) {
      bodyHeight -= headerHeight;
    }
    if (this.get('hasFooter')) {
      bodyHeight -= footerHeight;
    }
    return bodyHeight;
  }).property('_height', 'headerHeight', 'footerHeight', '_scrollbarSize', 'hasHeader', 'hasFooter', '_tableColumnsWidth', '_width', '_fixedColumnsWidth'),
  /**
  * Computed Table Block Width
  * @memberof Ember.Table.TableController
  * @instance
  * @private
  */

  _tableBlockWidth: Ember.computed(function() {
    return this.get('_width') - this.get('_fixedColumnsWidth') - this.get('_scrollbarSize');
  }).property('_width', '_fixedColumnsWidth', '_scrollbarSize'),
  _fixedBlockWidthBinding: '_fixedColumnsWidth',
  /**
  * Computed Table Content Height
  * @memberof Ember.Table.TableController
  * @instance
  * @private
  */

  _tableContentHeight: Ember.computed(function() {
    return this.get('rowHeight') * this.get('bodyContent.length');
  }).property('rowHeight', 'bodyContent.length'),
  /**
  * Table Container Width
  * @memberof Ember.Table.TableController
  * @instance
  * @private
  */

  _tableContainerWidth: Ember.computed(function() {
    return this.get('_width') - this.get('_scrollbarSize');
  }).property('_width', '_scrollbarSize'),
  /**
  * Computed Scroll Container Width
  * @memberof Ember.Table.TableController
  * @instance
  * @private
  */

  _scrollContainerWidth: Ember.computed(function() {
    return this.get('_width') - this.get('_fixedColumnsWidth') - this.get('_scrollbarSize');
  }).property('_width', '_fixedColumnsWidth', '_scrollbarSize'),
  /**
  * Computed Scroll Container Height
  * @memberof Ember.Table.TableController
  * @instance
  * @private
  */

  _scrollContainerHeight: Ember.computed(function() {
    var containerHeight;
    containerHeight = this.get('_height') - this.get('headerHeight');
    return containerHeight;
  }).property('_height', 'headerHeight'),
  /**
  * Computed number of items showing
  * @memberof Ember.Table.TableController
  * @instance
  * @private
  */

  _numItemsShowing: Ember.computed(function() {
    var res;
    res = Math.floor(this.get('_bodyHeight') / this.get('rowHeight'));
    return res;
  }).property('_bodyHeight', 'rowHeight'),
  /**
  * Computed Start Index
  * @memberof Ember.Table.TableController
  * @instance
  * @raw
  */

  _startIndex: Ember.computed(function() {
    var index, numContent, numViews, rowHeight, scrollTop;
    numContent = this.get('bodyContent.length');
    numViews = this.get('_numItemsShowing');
    rowHeight = this.get('rowHeight');
    scrollTop = this.get('_tableScrollTop');
    index = Math.floor(scrollTop / rowHeight);
    if (index + numViews >= numContent) {
      index = numContent - numViews;
    }
    if (index < 0) {
      return 0;
    } else {
      return index;
    }
  }).property('bodyContent.length', '_numItemsShowing', 'rowHeight', '_tableScrollTop'),
  /**
  * Get Total Width
  * @memberof Ember.Table.TableController
  * @instance
  * @private
  * @argument columns Columns to calculate width for
  */

  _getTotalWidth: function(columns) {
    var widths;
    if (!columns) {
      return 0;
    }
    widths = columns.getEach('columnWidth') || [];
    return widths.reduce((function(total, w) {
      return total + w;
    }), 0);
  }
});

},{}],10:[function(require,module,exports){
var indexesOf;

indexesOf = Ember.EnumerableUtils.indexesOf;

Ember.Table.RowSelectionMixin = Ember.Mixin.create({
  attributeBindings: 'tabindex',
  content: Ember.computed.alias('controller.bodyContent'),
  rowHeight: Ember.computed.alias('controller.rowHeight'),
  numItemsShowing: Ember.computed.alias('controller._numItemsShowing'),
  startIndex: Ember.computed.alias('controller._startIndex'),
  scrollTop: Ember.computed.alias('controller._tableScrollTop'),
  tabindex: -1,
  KEY_EVENTS: {
    37: 'leftArrowPressed',
    38: 'upArrowPressed',
    39: 'rightArrowPressed',
    40: 'downArrowPressed'
  },
  _calculateSelectionIndices: function(value) {
    var content, indices, rows, selection;
    selection = this.get('selectionIndices');
    selection.clear();
    rows = this.get('content');
    if (rows) {
      content = rows.mapProperty('content');
      indices = indexesOf(content, value);
      selection.addObjects(indices);
    }
  },
  contentDidChange: Ember.observer(function() {
    return this._calculateSelectionIndices(this.get('selection'));
  }, 'content.@each.content'),
  selection: Ember.computed(function(key, value) {
    var rows, selection;
    rows = this.get('content') || [];
    selection = this.get('selectionIndices');
    value = value || [];
    if (arguments.length === 1) {
      value = selection.map(function(index) {
        return rows.objectAt(index).get('content');
      });
    } else {
      this._calculateSelectionIndices(value);
    }
    return value;
  }).property('selectionIndices.[]'),
  selectionIndices: Ember.computed(function() {
    var set;
    set = new Ember.Set();
    set.addEnumerableObserver(this);
    return set;
  }).property(),
  enumerableDidChange: Ember.K,
  enumerableWillChange: function(set, removing, adding) {
    var content;
    content = this.get('content');
    if (!content) {
      return;
    }
    if ('number' === typeof removing) {
      set.forEach(function(index) {
        var row;
        row = content.objectAt(index);
        if (row) {
          return row.set('isSelected', false);
        }
      });
    } else if (removing) {
      removing.forEach(function(index) {
        var row;
        row = content.objectAt(index);
        if (row) {
          return row.set('isSelected', false);
        }
      });
    }
    if (adding && 'number' !== typeof adding) {
      return adding.forEach(function(index) {
        var row;
        row = content.objectAt(index);
        if (row) {
          return row.set('isSelected', true);
        }
      });
    }
  },
  mouseDown: function(event) {
    var index, sel;
    index = this.getIndexForEvent(event);
    sel = this.get('selectionIndices');
    if (sel.contains(index) && sel.length === 1) {
      return sel.clear();
    }
    return this.setSelectionIndex(index);
  },
  keyDown: function(event) {
    var map, method, _ref;
    map = this.get('KEY_EVENTS');
    method = map[event.keyCode];
    if (method) {
      return (_ref = this.get(method)) != null ? _ref.apply(this, arguments) : void 0;
    }
  },
  upArrowPressed: function(event) {
    var index, sel;
    event.preventDefault();
    sel = this.get('selectionIndices.lastObject');
    index = event.ctrlKey || event.metaKey ? 0 : sel - 1;
    return this.setSelectionIndex(index);
  },
  downArrowPressed: function(event) {
    var clen, index, sel;
    event.preventDefault();
    sel = this.get('selectionIndices.lastObject');
    clen = this.get('content.length');
    index = event.ctrlKey || event.metaKey ? clen - 1 : sel + 1;
    return this.setSelectionIndex(index);
  },
  getIndexForEvent: function(event) {
    return this.getRowIndexFast(this.getRowForEvent(event));
  },
  getRowForEvent: function(event) {
    var $rowView, view;
    $rowView = $(event.target).parents('.table-row');
    view = Ember.View.views[$rowView.attr('id')];
    if (view) {
      return view.get('row');
    }
  },
  getRowIndexFast: function(row) {
    var index, numRows, startIndex, sublist;
    startIndex = this.get('startIndex');
    numRows = this.get('numItemsShowing') + 1;
    sublist = this.get('content').slice(startIndex, startIndex + numRows);
    index = sublist.indexOf(row);
    if (index < 0) {
      return index;
    } else {
      return index + startIndex;
    }
  },
  setSelectionIndex: function(index) {
    var sel;
    if (!this.ensureIndex(index)) {
      return;
    }
    sel = this.get('selectionIndices');
    this.get('selectionIndices').clear();
    return this.toggleSelectionIndex(index);
  },
  toggleSelectionIndex: function(index) {
    var sel;
    if (!this.ensureIndex(index)) {
      return;
    }
    sel = this.get('selectionIndices');
    if (sel.contains(index)) {
      sel.remove(index);
    } else {
      sel.add(index);
    }
    return this.ensureVisible(index);
  },
  ensureIndex: function(index) {
    var clen;
    clen = this.get('content.length');
    return index >= 0 && index < clen;
  },
  ensureVisible: function(index) {
    var endIndex, numRows, startIndex;
    startIndex = this.get('startIndex');
    numRows = this.get('numItemsShowing');
    endIndex = startIndex + numRows;
    if (index < startIndex) {
      return this.scrollToRowIndex(index);
    } else if (index >= endIndex) {
      return this.scrollToRowIndex(index - numRows + 1);
    }
  },
  scrollToRowIndex: function(index) {
    var rowHeight, scrollTop;
    rowHeight = this.get('rowHeight');
    scrollTop = index * rowHeight;
    return this.set('scrollTop', scrollTop);
  }
});

Ember.Table.RowMultiSelectionMixin = Ember.Mixin.create(Ember.Table.RowSelectionMixin, {
  selectionRange: void 0,
  enumerableDidChange: function(set, removing, adding) {
    if ('number' === typeof removing) {
      this.set('selectionRange', void 0);
    } else if (removing) {
      this.reduceSelectionRange(removing);
    }
    if (adding && 'number' !== typeof adding) {
      this.expandSelectionRange(adding);
    }
  },
  expandSelectionRange: function(indices) {
    var max, min, range;
    range = this.get('selectionRange');
    min = Math.min.apply(null, indices);
    max = Math.max.apply(null, indices);
    if (!range) {
      range = {
        min: min,
        max: max
      };
    }
    range = {
      min: Math.min(range.min, min),
      max: Math.max(range.max, max)
    };
    return this.set('selectionRange', range);
  },
  reduceSelectionRange: function(indices) {
    var max, min, range;
    indices = this.get('selectionIndices');
    min = Math.min.apply(null, indices);
    max = Math.max.apply(null, indices);
    range = {
      min: min,
      max: max
    };
    return this.set('selectionRange', range);
  },
  mouseDown: function(event) {
    var index, range, row;
    row = this.getRowForEvent(event);
    index = this.getRowIndexFast(row);
    if (event.ctrlKey || event.metaKey) {
      return this.toggleSelectionIndex(index);
    } else if (event.shiftKey) {
      range = this.get('selectionRange');
      if (range) {
        return this.setSelectionRange(range.min, index, index);
      }
    } else {
      return this._super(event);
    }
  },
  upArrowPressed: function(event) {
    var index, range;
    event.preventDefault();
    if (event.shiftKey) {
      range = this.get('selectionRange');
      index = range.min - 1;
      if (range) {
        return this.setSelectionRange(index, range.max, index);
      }
    } else {
      return this._super(event);
    }
  },
  downArrowPressed: function(event) {
    var index, range;
    event.preventDefault();
    if (event.shiftKey) {
      range = this.get('selectionRange');
      index = range.max + 1;
      if (range) {
        return this.setSelectionRange(range.min, index, index);
      }
    } else {
      return this._super(event);
    }
  },
  setSelectionRange: function(start, end, visibleIndex) {
    var beg, sel, _i, _results;
    if (!(this.ensureIndex(start) && this.ensureIndex(end))) {
      return;
    }
    beg = start < end ? start : end;
    end = start < end ? end : start;
    sel = this.get('selectionIndices');
    sel.clear();
    sel.addObjects((function() {
      _results = [];
      for (var _i = beg; beg <= end ? _i <= end : _i >= end; beg <= end ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this));
    return this.ensureVisible(visibleIndex);
  }
});

},{}],11:[function(require,module,exports){
/**
* Tables Container
* @class
* @alias Ember.Table.TablesContainer
*/

Ember.Table.TablesContainer = Ember.View.extend(Ember.ResizeHandler, {
  templateName: 'tables-container',
  classNames: 'tables-container',
  /**
  * Did insert element callback
  * @memberof Ember.Table.TablesContainer
  * @instance
  * @todo Contains (Peter) hack to detect if user is using lion and scroll
  */

  didInsertElement: function() {
    var isLion, scrollBarWidth;
    this._super();
    this.elementSizeDidChange();
    scrollBarWidth = $.getScrollbarWidth();
    isLion = (typeof navigator !== "undefined" && navigator !== null ? navigator.appVersion['10_7'] : void 0) !== -1 && scrollBarWidth === 0;
    if (isLion) {
      scrollBarWidth = 8;
    }
    this.set('controller._scrollbarSize', scrollBarWidth);
    this.set('controller._tableScrollTop', 0);
  },
  /**
  * On resize callback
  * @memberof Ember.Table.TablesContainer
  * @instance
  */

  onResize: function() {
    return this.elementSizeDidChange();
  },
  /**
  * Element size did change callback
  * @memberof Ember.Table.TablesContainer
  * @instance
  */

  elementSizeDidChange: function() {
    this.set('controller._width', this.$().width());
    return this.set('controller._height', this.$().height());
  }
});

/**
* Table Container
* @class
* @alias Ember.Table.TableContainer
* @mixes Ember.StyleBindingsMixin
*/


Ember.Table.TableContainer = Ember.View.extend(Ember.StyleBindingsMixin, {
  classNames: ['table-container'],
  styleBindings: ['height', 'width']
});

/**
* Table Block
* @class
* @alias Ember.Table.TableBlock
* @mixes Ember.StyleBindingsMixin
* @todo This should be a mixin
*/


Ember.Table.TableBlock = Ember.CollectionView.extend(Ember.StyleBindingsMixin, {
  classNames: ['table-block'],
  styleBindings: ['width', 'height'],
  itemViewClass: Ember.computed.alias('controller.tableRowViewClass'),
  columns: null,
  content: null,
  scrollLeft: null,
  /**
  * On scroll left did change callback
  * @memberof Ember.Table.TableBlock
  * @instance
  */

  onScrollLeftDidChange: Ember.observer(function() {
    return this.$().scrollLeft(this.get('scrollLeft'));
  }, 'scrollLeft')
});

/**
* Lazy Table Block
* @class
* @alias Ember.Table.LazyTableBlock
*/


Ember.Table.LazyTableBlock = Ember.LazyContainerView.extend({
  classNames: ['table-block'],
  styleBindings: ['width'],
  itemViewClass: Ember.computed.alias('controller.tableRowViewClass'),
  rowHeight: Ember.computed.alias('controller.rowHeight'),
  columns: null,
  content: null,
  scrollLeft: null,
  scrollTop: null,
  /**
  * On scroll left did change callback
  * @memberof Ember.Table.LazyTableBlock
  * @instance
  */

  onScrollLeftDidChange: Ember.observer(function() {
    return this.$().scrollLeft(this.get('scrollLeft'));
  }, 'scrollLeft')
});

/**
* Table Row
* @class
* @alias Ember.Table.TableRow
*/


Ember.Table.TableRow = Ember.LazyItemView.extend({
  templateName: 'table-row',
  classNames: 'table-row',
  classNameBindings: ['row.isActive:active', 'row.isSelected:selected'],
  styleBindings: ['width', 'height'],
  row: Ember.computed.alias('content'),
  columns: Ember.computed.alias('parentView.columns'),
  width: Ember.computed.alias('controller._rowWidth'),
  height: Ember.computed.alias('controller.rowHeight'),
  /**
  * Mouse enter callback
  * @memberof Ember.Table.TableRow
  * @instance
  * @param event jQuery event
  */

  mouseEnter: function(event) {
    var row;
    row = this.get('row');
    if (row) {
      return row.set('isActive', true);
    }
  },
  /**
  * Mouse leave callback
  * @memberof Ember.Table.TableRow
  * @instance
  * @param event jQuery event
  */

  mouseLeave: function(event) {
    var row;
    row = this.get('row');
    if (row) {
      return row.set('isActive', false);
    }
  },
  /**
  * Teardown content
  * @memberof Ember.Table.TableRow
  * @instance
  */

  teardownContent: function() {
    var row;
    row = this.get('row');
    if (row) {
      return row.set('isActive', false);
    }
  }
});

/**
* Table Cell
* @class
* @alias Ember.Table.TableCell
* @mixes Ember.StyleBindingsMixin
*/


Ember.Table.TableCell = Ember.View.extend(Ember.StyleBindingsMixin, {
  defaultTemplate: Ember.Handlebars.compile("<span class='content'>{{view.cellContent}}</span>"),
  classNames: ['table-cell'],
  styleBindings: ['width'],
  row: Ember.computed.alias('parentView.row'),
  column: Ember.computed.alias('content'),
  rowContent: Ember.computed.alias('row.content'),
  width: Ember.computed.alias('column.columnWidth'),
  /**
  * Computed Cell Content
  * @memberof Ember.Table.TableCell
  * @instance
  */

  cellContent: Ember.computed(function(key, value) {
    var column, row;
    row = this.get('rowContent');
    column = this.get('column');
    if (!(row && column)) {
      return;
    }
    if (arguments.length === 1) {
      value = column.getCellContent(row);
    } else {
      column.setCellContent(row, value);
    }
    return value;
  }).property('rowContent.isLoaded', 'column')
});

/**
* HeaderBlock
* @class
* @alias Ember.Table.HeaderBlock
* @augments Ember.Table.TableBlock
*/


Ember.Table.HeaderBlock = Ember.Table.TableBlock.extend({
  classNames: ['header-block'],
  itemViewClass: 'Ember.Table.HeaderRow',
  /**
  * Computed Content
  * @memberof Ember.Table.HeaderBlock
  * @instance
  */

  content: Ember.computed(function() {
    return [this.get('columns')];
  }).property('columns')
});

/**
* Header Row
* @class
* @alias Ember.Table.HeaderRow
* @mixes Ember.StyleBindingsMixin
*/


Ember.Table.HeaderRow = Ember.View.extend(Ember.StyleBindingsMixin, {
  templateName: 'header-row',
  classNames: ['table-row', 'header-row'],
  styleBindings: ['height', 'width'],
  columns: Ember.computed.alias('content'),
  height: Ember.computed.alias('controller.headerHeight'),
  width: Ember.computed.alias('controller._tableColumnsWidth'),
  /**
  * Options for jQuery UI sortable
  * @memberof Ember.Table.HeaderRow
  * @instance
  */

  sortableOption: Ember.computed(function() {
    return {
      axis: 'x',
      cursor: 'pointer',
      helper: 'clone',
      containment: 'parent',
      placeholder: 'ui-state-highlight',
      scroll: true,
      tolerance: 'pointer',
      update: jQuery.proxy(this.onColumnSort, this)
    };
  }).property(),
  /**
  * Did insert element callback
  * @memberof Ember.Table.HeaderRow
  * @instance
  */

  didInsertElement: function() {
    this._super();
    this.$('> div').sortable(this.get('sortableOption'));
  },
  /**
  * On column sort callback
  * @memberof Ember.Table.HeaderRow
  * @instance
  * @argument event jQuery event
  * @argument ui
  */

  onColumnSort: function(event, ui) {
    var column, columns, newIndex, view;
    newIndex = ui.item.index();
    view = Ember.View.views[ui.item.attr('id')];
    columns = this.get('columns');
    column = view.get('column');
    columns.removeObject(column);
    return columns.insertAt(newIndex, column);
  }
});

/**
* Header Cell
* @class
* @alias Ember.Table.HeaderCell
* @mixes Ember.StyleBindingsMixin
*/


Ember.Table.HeaderCell = Ember.View.extend(Ember.StyleBindingsMixin, {
  templateName: 'header-cell',
  classNames: ['table-cell', 'header-cell'],
  styleBindings: ['width', 'height'],
  column: Ember.computed.alias('content'),
  width: Ember.computed.alias('column.columnWidth'),
  height: Ember.computed.alias('controller.headerHeight'),
  /**
  * jQuery UI resizable option
  * @memberof Ember.Table.HeaderCell
  * @instance
  */

  resizableOption: Ember.computed(function() {
    return {
      handles: 'e',
      minHeight: 40,
      minWidth: this.get("column.minWidth") || 100,
      maxWidth: this.get("column.maxWidth") || 500,
      resize: jQuery.proxy(this.onColumnResize, this),
      stop: jQuery.proxy(this.onColumnResize, this)
    };
  }).property(),
  /**
  * Did insert element callback
  * @memberof Ember.Table.HeaderCell
  * @instance
  */

  didInsertElement: function() {
    var fluid;
    fluid = this.get("controller.fluidTable");
    if (!fluid || (fluid && this.get("column._nextColumn"))) {
      this.$().resizable(this.get('resizableOption'));
      this._resizableWidget = this.$().resizable('widget');
    }
  },
  /**
  * On column resize callback
  * @memberof Ember.Table.HeaderCell
  * @instance
  * @argument event jQuery event
  */

  onColumnResize: function(event, ui) {
    var max;
    max = this.get("column").resize(ui.size.width);
    if (max) {
      return this.$().resizable("option", "maxWidth", max);
    }
  }
});

/**
* Header Table Container
* @class
* @alias Ember.Table.HeaderTableContainer
* @augments Ember.Table.TableContainer
* @mixes Ember.MouseWheelHandlerMixin
* @mixes Ember.TouchMoveHandlerMixin
*/


Ember.Table.HeaderTableContainer = Ember.Table.TableContainer.extend(Ember.MouseWheelHandlerMixin, Ember.TouchMoveHandlerMixin, {
  templateName: 'header-container',
  classNames: ['table-container', 'fixed-table-container', 'header-container'],
  height: Ember.computed.alias('controller.headerHeight'),
  width: Ember.computed.alias('controller._tableContainerWidth'),
  scrollLeft: Ember.computed.alias('controller._tableScrollLeft'),
  /**
  * On mouse wheel callback - handle and stop propagation
  * @memberof Ember.Table.HeaderTableContainer
  * @instance
  * @argument event jQuery event
  * @argument delta
  * @argument deltaX {Integer}
  * @argument deltaY {Integer}
  */

  onMouseWheel: function(event, delta, deltaX, deltaY) {
    var scrollLeft;
    scrollLeft = this.$('.right-table-block').scrollLeft() + deltaX * 50;
    this.set('scrollLeft', scrollLeft);
    return event.preventDefault();
  },
  /**
  * On touch move callback - handle and stop propagation
  * @memberof Ember.Table.HeaderTableContainer
  * @instance
  * @argument event jQuery event
  * @argument deltaX
  * @argument deltaY
  */

  onTouchMove: function(event, deltaX, deltaY) {
    var scrollLeft;
    scrollLeft = this.$('.right-table-block').scrollLeft() + deltaX;
    this.set('scrollLeft', scrollLeft);
    return event.preventDefault();
  }
});

/**
* Body Table Container
* @class
* @alias Ember.Table.BodyTableContainer
* @mixes Ember.MouseWheelHandlerMixin
* @mixes Ember.TouchMoveHandlerMixin
* @mixes Ember.ScrollHandlerMixin
*/


Ember.Table.BodyTableContainer = Ember.Table.TableContainer.extend(Ember.MouseWheelHandlerMixin, Ember.TouchMoveHandlerMixin, Ember.ScrollHandlerMixin, {
  templateName: 'body-container',
  classNames: ['table-container', 'body-container'],
  height: Ember.computed.alias('controller._bodyHeight'),
  width: Ember.computed.alias('controller._width'),
  scrollTop: Ember.computed.alias('controller._tableScrollTop'),
  scrollLeft: Ember.computed.alias('controller._tableScrollLeft'),
  /**
  * On scroll top did change observer
  * @memberof Ember.Table.BodyTableContainer
  * @instance
  */

  onScrollTopDidChange: Ember.observer(function() {
    return this.$().scrollTop(this.get('scrollTop'));
  }, 'scrollTop'),
  /**
  * On scroll callback
  * @memberof Ember.Table.BodyTableContainer
  * @instance
  * @argument event jQuery event
  */

  onScroll: function(event) {
    this.set('scrollTop', event.target.scrollTop);
    return event.preventDefault();
  },
  /**
  * On mouse wheel callback callback
  * @memberof Ember.Table.BodyTableContainer
  * @instance
  * @argument event jQuery event
  * @argument delta
  * @argument deltaX {Integer}
  * @argument deltaY {Integer}
  */

  onMouseWheel: function(event, delta, deltaX, deltaY) {
    var scrollLeft;
    if ((Math.abs(deltaX) > Math.abs(deltaY)) === false) {
      return;
    }
    scrollLeft = this.$('.right-table-block').scrollLeft() + deltaX * 50;
    this.set('scrollLeft', scrollLeft);
    return event.preventDefault();
  },
  /**
  * On touch move callback
  * @memberof Ember.Table.BodyTableContainer
  * @instance
  * @argument event jQuery event
  * @argument deltaX {Integer}
  * @argument deltaY {Integer}
  */

  onTouchMove: function(event, deltaX, deltaY) {
    var scrollLeft;
    if ((Math.abs(deltaX) > Math.abs(deltaY)) === false) {
      return;
    }
    scrollLeft = this.$('.right-table-block').scrollLeft() + deltaX;
    this.set('scrollLeft', scrollLeft);
    return event.preventDefault();
  }
});

/**
* Footer Table Container
* @class
* @alias Ember.Table.FooterTableContainer
* @mixes Ember.MouseWheelHandlerMixin
* @mixes Ember.TouchMoveHandlerMixin
*/


Ember.Table.FooterTableContainer = Ember.Table.TableContainer.extend(Ember.MouseWheelHandlerMixin, Ember.TouchMoveHandlerMixin, {
  templateName: 'footer-container',
  classNames: ['table-container', 'fixed-table-container', 'footer-container'],
  styleBindings: ['top'],
  height: Ember.computed.alias('controller.footerHeight'),
  width: Ember.computed.alias('controller._tableContainerWidth'),
  scrollLeft: Ember.computed.alias('controller._tableScrollLeft'),
  top: Ember.computed(function() {
    var bodyHeight, contentHeight, headerHeight;
    headerHeight = this.get('controller.headerHeight');
    contentHeight = this.get('controller._tableContentHeight') + headerHeight;
    bodyHeight = this.get('controller._bodyHeight') + headerHeight;
    if (contentHeight < bodyHeight) {
      return contentHeight;
    } else {
      return bodyHeight;
    }
  }).property('controller._bodyHeight', 'controller.headerHeight', 'controller._tableContentHeight'),
  onMouseWheel: function(event, delta, deltaX, deltaY) {
    var scrollLeft;
    scrollLeft = this.$('.right-table-block').scrollLeft() + deltaX * 50;
    this.set('scrollLeft', scrollLeft);
    return event.preventDefault();
  },
  onTouchMove: function(event, deltaX, deltaY) {
    var scrollLeft;
    scrollLeft = this.$('.right-table-block').scrollLeft() + deltaX;
    this.set('scrollLeft', scrollLeft);
    return event.preventDefault();
  }
});

/**
* Scroll Container
* @class
* @alias Ember.Table.ScrollContainer
* @mixes Ember.StyleBindingsMixin
* @mixes Ember.ScrollHandlerMixin
*/


Ember.Table.ScrollContainer = Ember.View.extend(Ember.StyleBindingsMixin, Ember.ScrollHandlerMixin, {
  template: Ember.Handlebars.compile("{{view Ember.Table.ScrollPanel}}"),
  classNames: 'scroll-container',
  styleBindings: ['top', 'left', 'width', 'height'],
  width: Ember.computed.alias('controller._scrollContainerWidth'),
  height: Ember.computed.alias('controller._scrollContainerHeight'),
  top: Ember.computed.alias('controller.headerHeight'),
  left: Ember.computed.alias('controller._fixedColumnsWidth'),
  scrollTop: Ember.computed.alias('controller._tableScrollTop'),
  scrollLeft: Ember.computed.alias('controller._tableScrollLeft'),
  /**
  * On scroll callback
  * @memberof Ember.Table.ScrollContainer
  * @instance
  * @argument event jQuery event
  */

  onScroll: function(event) {
    this.set('scrollLeft', event.target.scrollLeft);
    return event.preventDefault();
  },
  /**
  * On scroll left did change observer
  * @memberof Ember.Table.ScrollContainer
  * @instance
  */

  onScrollLeftDidChange: Ember.observer(function() {
    return this.$().scrollLeft(this.get('scrollLeft'));
  }, 'scrollLeft')
});

/**
* ScrollPanel
* @class
* @alias Ember.Table.ScrollPanel
* @mixes Ember.StyleBindingsMixin
*/


Ember.Table.ScrollPanel = Ember.View.extend(Ember.StyleBindingsMixin, {
  classNames: ['scroll-panel'],
  styleBindings: ['width', 'height'],
  width: Ember.computed.alias('controller._tableColumnsWidth'),
  height: Ember.computed.alias('controller._tableContentHeight')
});

},{}]},{},[1])
;