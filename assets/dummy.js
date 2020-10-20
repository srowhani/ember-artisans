'use strict';



;define("dummy/app", ["exports", "ember-load-initializers", "dummy/config/environment", "dummy/resolver"], function (_exports, _emberLoadInitializers, _environment, _resolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
  var _default = App;
  _exports.default = _default;
});
;define("dummy/components/db-item", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: 'tr',
    queries: Ember.computed.alias('db.queries'),
    topFiveQueries: Ember.computed('queries', function () {
      var queries = this.get('queries') || [];
      var topFiveQueries = queries.slice(0, 5);

      while (topFiveQueries.length < 5) {
        topFiveQueries.push({
          query: ''
        });
      }

      return topFiveQueries.map(function (query, index) {
        return {
          key: String(index),
          query: query.query,
          elapsed: query.elapsed ? formatElapsed(query.elapsed) : '',
          className: elapsedClass(query.elapsed)
        };
      });
    }),
    countClassName: Ember.computed('queries', function () {
      var queries = this.get('queries') || [];
      var countClassName = 'label';

      if (queries.length >= 20) {
        countClassName += ' label-important';
      } else if (queries.length >= 10) {
        countClassName += ' label-warning';
      } else {
        countClassName += ' label-success';
      }

      return countClassName;
    })
  });

  _exports.default = _default;

  function elapsedClass(elapsed) {
    if (elapsed >= 10.0) {
      return 'elapsed warn_long';
    } else if (elapsed >= 1.0) {
      return 'elapsed warn';
    } else {
      return 'elapsed short';
    }
  }

  var _base = String.prototype;

  _base.lpad = _base.lpad || function (padding, toLength) {
    return padding.repeat((toLength - this.length) / padding.length).concat(this);
  };

  function formatElapsed(value) {
    var str = parseFloat(value).toFixed(2);

    if (value > 60) {
      var minutes = Math.floor(value / 60);
      var comps = (value % 60).toFixed(2).split('.');
      var seconds = comps[0].lpad('0', 2);
      str = "".concat(minutes, ":").concat(seconds, ".").concat(comps[1]);
    }

    return str;
  }
});
;define("dummy/components/vertical-collection", ["exports", "@html-next/vertical-collection/components/vertical-collection/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _component.default;
    }
  });
});
;define("dummy/components/x-toggle-label", ["exports", "ember-toggle/components/x-toggle-label/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _component.default;
    }
  });
});
;define("dummy/components/x-toggle-switch", ["exports", "ember-toggle/components/x-toggle-switch/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _component.default;
    }
  });
});
;define("dummy/components/x-toggle", ["exports", "ember-toggle/components/x-toggle/component", "dummy/config/environment"], function (_exports, _component, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var config = _environment.default['ember-toggle'] || {};

  var _default = _component.default.extend({
    /* eslint-disable ember/avoid-leaking-state-in-ember-objects */
    theme: config.defaultTheme || 'default',
    defaultOffLabel: config.defaultOffLabel || 'Off::off',
    defaultOnLabel: config.defaultOnLabel || 'On::on',
    showLabels: config.defaultShowLabels || false,
    size: config.defaultSize || 'medium'
  });

  _exports.default = _default;
});
;define("dummy/controllers/application", ["exports", "dummy/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Controller.extend({
    packageVersion: _environment.default.version
  });

  _exports.default = _default;
});
;define("dummy/controllers/demo", ["exports", "ember-concurrency", "ember-artisans"], function (_exports, _emberConcurrency, _emberArtisans) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _class, _descriptor, _temp;

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  var DemoController = (_dec = (0, _emberConcurrency.task)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!this.useWorker) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", this.testWorker.calculatePrimes());

          case 2:
            return _context.abrupt("return", this.calculatePrimes());

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })).restartable(), (_class = (_temp = /*#__PURE__*/function (_EmberController) {
    _inherits(DemoController, _EmberController);

    var _super = _createSuper(DemoController);

    function DemoController() {
      var _this;

      _classCallCheck(this, DemoController);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty(_assertThisInitialized(_this), "testWorker", (0, _emberArtisans.createWorker)('/ember-artisans/assets/workers/test-worker.js'));

      _initializerDefineProperty(_assertThisInitialized(_this), "generateNoise", _descriptor, _assertThisInitialized(_this));

      return _this;
    }

    _createClass(DemoController, [{
      key: "calculatePrimes",
      value: function calculatePrimes() {
        var iterations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
        var multiplier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000000000;
        var primes = [];

        for (var i = 0; i < iterations; i++) {
          var candidate = i * (multiplier * Math.random());
          var isPrime = true;

          for (var c = 2; c <= Math.sqrt(candidate); ++c) {
            if (candidate % c === 0) {
              // not prime
              isPrime = false;
              break;
            }
          }

          if (isPrime) {
            primes.push(candidate);
          }
        }

        return primes;
      }
    }]);

    return DemoController;
  }(Ember.Controller), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "generateNoise", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class));
  _exports.default = DemoController;
});
;define("dummy/ember-artisans/tests/addon.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | addon');
  QUnit.test('addon/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'addon/index.js should pass ESLint\n\n');
  });
  QUnit.test('addon/services/artisans.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'addon/services/artisans.js should pass ESLint\n\n');
  });
});
;define("dummy/ember-artisans/tests/app.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | app');
  QUnit.test('app/services/artisans.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app/services/artisans.js should pass ESLint\n\n');
  });
});
;define("dummy/ember-artisans/tests/templates.template.lint-test", [], function () {
  "use strict";
});
;define("dummy/ember-gestures/recognizers/pan", ["exports", "ember-gestures/recognizers/pan"], function (_exports, _pan) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _pan.default;
  _exports.default = _default;
});
;define("dummy/ember-gestures/recognizers/pinch", ["exports", "ember-gestures/recognizers/pinch"], function (_exports, _pinch) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _pinch.default;
  _exports.default = _default;
});
;define("dummy/ember-gestures/recognizers/press", ["exports", "ember-gestures/recognizers/press"], function (_exports, _press) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _press.default;
  _exports.default = _default;
});
;define("dummy/ember-gestures/recognizers/rotate", ["exports", "ember-gestures/recognizers/rotate"], function (_exports, _rotate) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _rotate.default;
  _exports.default = _default;
});
;define("dummy/ember-gestures/recognizers/swipe", ["exports", "ember-gestures/recognizers/swipe"], function (_exports, _swipe) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _swipe.default;
  _exports.default = _default;
});
;define("dummy/ember-gestures/recognizers/tap", ["exports", "ember-gestures/recognizers/tap"], function (_exports, _tap) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _tap.default;
    }
  });
});
;define("dummy/ember-gestures/recognizers/vertical-pan", ["exports", "ember-gestures/recognizers/vertical-pan"], function (_exports, _verticalPan) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _verticalPan.default;
    }
  });
});
;define("dummy/ember-gestures/recognizers/vertical-swipe", ["exports", "ember-gestures/recognizers/vertical-swipe"], function (_exports, _verticalSwipe) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _verticalSwipe.default;
    }
  });
});
;define("dummy/event_dispatcher", ["exports", "ember-gestures/event_dispatcher", "dummy/config/environment"], function (_exports, _event_dispatcher, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var assign = Ember.assign || Ember.merge;
  var gestures = assign({}, {
    emberUseCapture: false,
    removeTracking: false,
    useFastPaths: false
  });
  gestures = assign(gestures, _environment.default.gestures);

  var _default = _event_dispatcher.default.extend({
    useCapture: gestures.emberUseCapture,
    removeTracking: gestures.removeTracking,
    useFastPaths: gestures.useFastPaths
  });

  _exports.default = _default;
});
;define("dummy/helpers/cancel-all", ["exports", "ember-concurrency/helpers/cancel-all"], function (_exports, _cancelAll) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _cancelAll.default;
    }
  });
});
;define("dummy/helpers/perform", ["exports", "ember-concurrency/helpers/perform"], function (_exports, _perform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _perform.default;
    }
  });
});
;define("dummy/helpers/task", ["exports", "ember-concurrency/helpers/task"], function (_exports, _task) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _task.default;
    }
  });
});
;define("dummy/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'container-debug-adapter',
    initialize: function initialize() {
      var app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
  _exports.default = _default;
});
;define("dummy/initializers/debug", ["exports", "@html-next/vertical-collection/-debug"], function (_exports, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'vertical-collection-debug',
    initialize: function initialize() {}
  };
  _exports.default = _default;
});
;define("dummy/initializers/ember-concurrency", ["exports", "ember-concurrency/initializers/ember-concurrency"], function (_exports, _emberConcurrency) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _emberConcurrency.default;
    }
  });
});
;define("dummy/initializers/export-application-global", ["exports", "dummy/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize() {
    var application = arguments[1] || arguments[0];

    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;

      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;
        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);

            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  var _default = {
    name: 'export-application-global',
    initialize: initialize
  };
  _exports.default = _default;
});
;define("dummy/instance-initializers/ember-gestures", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'ember-gestures',
    initialize: function initialize(instance) {
      if (typeof instance.lookup === "function") {
        instance.lookup('service:-gestures');
      } else {
        // This can be removed when we no-longer support ember 1.12 and 1.13
        Ember.getOwner(instance).lookup('service:-gestures');
      }
    }
  };
  _exports.default = _default;
});
;define("dummy/modifiers/recognize-gesture", ["exports", "ember-gestures/modifiers/recognize-gesture"], function (_exports, _recognizeGesture) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _recognizeGesture.default;
    }
  });
});
;define("dummy/resolver", ["exports", "ember-resolver"], function (_exports, _emberResolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _emberResolver.default;
  _exports.default = _default;
});
;define("dummy/router", ["exports", "dummy/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });
  Router.map(function () {
    this.route('demo', {
      path: '/'
    });
  });
  var _default = Router;
  _exports.default = _default;
});
;define("dummy/routes/demo", ["exports", "dummy/utils/get-data"], function (_exports, _getData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _temp;

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  var DemoRoute = (_class = (_temp = /*#__PURE__*/function (_EmberRoute) {
    _inherits(DemoRoute, _EmberRoute);

    var _super = _createSuper(DemoRoute);

    function DemoRoute() {
      var _this;

      _classCallCheck(this, DemoRoute);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty(_assertThisInitialized(_this), "numRows", 100);

      _defineProperty(_assertThisInitialized(_this), "_nextLoad", null);

      return _this;
    }

    _createClass(DemoRoute, [{
      key: "model",
      value: function model() {
        return (0, _getData.getData)(this.numRows);
      }
    }, {
      key: "afterModel",
      value: function afterModel() {
        Ember.run.later(this, this.loadSamples, 100);
      }
    }, {
      key: "loadSamples",
      value: function loadSamples() {
        this.controller.set('model', (0, _getData.getData)(this.numRows));
        this._nextLoad = Ember.run.next(this, this.loadSamples);
      }
    }, {
      key: "willTransition",
      value: function willTransition() {
        Ember.run.cancel(this._nextLoad);
        this.controller.set('model', null);
      }
    }]);

    return DemoRoute;
  }(Ember.Route), _temp), (_applyDecoratedDescriptor(_class.prototype, "willTransition", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "willTransition"), _class.prototype)), _class);
  _exports.default = DemoRoute;
});
;define("dummy/services/-gestures", ["exports", "dummy/config/environment", "ember-gestures/services/-gestures"], function (_exports, _environment, _gestures) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var assign = Ember.assign || Ember.merge;
  var gestures = assign({}, {
    useCapture: false
  });
  gestures = assign(gestures, _environment.default.gestures);

  var _default = _gestures.default.extend({
    useCapture: gestures.useCapture
  });

  _exports.default = _default;
});
;define("dummy/services/artisans", ["exports", "ember-artisans/services/artisans"], function (_exports, _artisans) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _artisans.default;
    }
  });
});
;define("dummy/templates/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "EXDINdwi",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\",true],[10,\"class\",\"flex flex-column\"],[8],[0,\"\\n  \"],[7,\"article\",true],[10,\"class\",\"pb4 bb b--black-10\"],[8],[0,\"\\n    \"],[7,\"div\",true],[10,\"class\",\"ph3 ph5-ns\"],[8],[0,\"\\n      \"],[7,\"div\",true],[10,\"class\",\"cf mw9 center tc-m\"],[8],[0,\"\\n        \"],[7,\"div\",true],[10,\"class\",\"fl w-100 overflow-auto v-top\"],[8],[0,\"\\n          \"],[9],[0,\"\\n          \"],[7,\"div\",true],[10,\"class\",\"pb3 pb4-ns pt4 pt5-ns mt4 black-70 fl-l w-50-l\"],[8],[0,\"\\n            \"],[7,\"h1\",true],[10,\"class\",\"f4 fw6 f1-ns lh-title measure mt0\"],[8],[0,\"\\n              Ember Artisans.\\n            \"],[9],[0,\"\\n            \"],[7,\"p\",true],[10,\"class\",\"f5 f4-ns fw4 b measure dib-m lh-copy\"],[8],[0,\"\\n              An abstraction layer around using web-workers in Ember.js\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n          \"],[7,\"div\",true],[10,\"class\",\"fl-l flex flex-row items-end justify-end flex-center w-50-l tl tc-ns pt3 pt4-m pt6-l\"],[8],[0,\"\\n            \"],[7,\"a\",true],[10,\"class\",\"flex flex-row items-center f6 f5-ns fw6 dib ba b--black-20 bg-blue white ph3 ph4-ns pv2 pv3-ns br2 grow no-underline\"],[10,\"href\",\"https://github.com/srowhani/ember-artisans\"],[8],[0,\"\\n              \"],[7,\"svg\",true],[10,\"class\",\"dib h2 w2\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"fill-rule\",\"evenodd\"],[10,\"clip-rule\",\"evenodd\"],[10,\"stroke-linejoin\",\"round\"],[10,\"stroke-miterlimit\",\"1.414\"],[8],[7,\"path\",true],[10,\"d\",\"M8 0C3.58 0 0 3.582 0 8c0 3.535 2.292 6.533 5.47 7.59.4.075.547-.172.547-.385 0-.19-.007-.693-.01-1.36-2.226.483-2.695-1.073-2.695-1.073-.364-.924-.89-1.17-.89-1.17-.725-.496.056-.486.056-.486.803.056 1.225.824 1.225.824.714 1.223 1.873.87 2.33.665.072-.517.278-.87.507-1.07-1.777-.2-3.644-.888-3.644-3.953 0-.873.31-1.587.823-2.147-.083-.202-.358-1.015.077-2.117 0 0 .672-.215 2.2.82.638-.178 1.323-.266 2.003-.27.68.004 1.364.092 2.003.27 1.527-1.035 2.198-.82 2.198-.82.437 1.102.163 1.915.08 2.117.513.56.823 1.274.823 2.147 0 3.073-1.87 3.75-3.653 3.947.287.246.543.735.543 1.48 0 1.07-.01 1.933-.01 2.195 0 .215.144.463.55.385C13.71 14.53 16 11.534 16 8c0-4.418-3.582-8-8-8\"],[8],[9],[9],[0,\"\\n              \"],[7,\"span\",true],[10,\"class\",\"pl2\"],[8],[0,\"\\n                Github \"],[7,\"code\",true],[10,\"class\",\"f6 fw4 di\"],[8],[1,[22,\"packageVersion\"],false],[9],[0,\"\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[1,[22,\"outlet\"],false],[0,\"\\n\"],[9]],\"hasEval\":false}",
    "meta": {
      "moduleName": "dummy/templates/application.hbs"
    }
  });

  _exports.default = _default;
});
;define("dummy/templates/components/db-item", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "6XunV2tu",
    "block": "{\"symbols\":[\"query\",\"@db\"],\"statements\":[[7,\"td\",true],[10,\"class\",\"pv2 w-10 ph-2 dbname\"],[8],[0,\"\\n  \"],[1,[23,2,[\"id\"]],false],[0,\"\\n\"],[9],[0,\"\\n\"],[7,\"td\",true],[10,\"class\",\"pv2 w-10 ph-2 query-count\"],[8],[0,\"\\n  \"],[7,\"span\",true],[11,\"class\",[29,[[22,\"countClassName\"]]]],[8],[0,\"\\n    \"],[1,[24,[\"queries\",\"length\"]],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[4,\"each\",[[24,[\"topFiveQueries\"]]],[[\"key\"],[\"@index\"]],{\"statements\":[[0,\"  \"],[7,\"td\",true],[10,\"class\",\"pv2 w-10 ph-2\"],[8],[1,[23,1,[\"elapsed\"]],false],[9],[0,\"\\n\"]],\"parameters\":[1]},null]],\"hasEval\":false}",
    "meta": {
      "moduleName": "dummy/templates/components/db-item.hbs"
    }
  });

  _exports.default = _default;
});
;define("dummy/templates/demo", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "hzm8OsPM",
    "block": "{\"symbols\":[\"db\"],\"statements\":[[7,\"div\",true],[10,\"class\",\"pt6 pb6 flex flex-column items-center justify-center bb b--black-10 f4 bg-washed-green dark-green\"],[8],[0,\"\\n  \"],[1,[28,\"x-toggle\",null,[[\"class\",\"value\",\"theme\",\"onToggle\",\"onLabel\",\"offLabel\",\"showLabels\"],[\"mb5\",[28,\"readonly\",[[24,[\"useWorker\"]]],null],\"material\",[28,\"action\",[[23,0,[]],[28,\"mut\",[[24,[\"useWorker\"]]],null]],null],\"Worker Thread\",\"Main Thread\",true]]],false],[0,\"\\n  \"],[7,\"a\",false],[12,\"class\",[28,\"concat\",[\"f6 link dim br1 ph3 pv2 dib white \",[28,\"if\",[[24,[\"generateNoise\",\"isRunning\"]],\"bg-mid-gray cursor-not-allowed\",\"bg-dark-green\"],null]],null]],[12,\"href\",\"#0\"],[3,\"action\",[[23,0,[]],[28,\"unless\",[[24,[\"generateNoise\",\"isRunning\"]],[28,\"perform\",[[24,[\"generateNoise\"]]],null]],null]]],[8],[0,\"\\n    Generate Noise\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[7,\"div\",true],[10,\"class\",\"table-wrapper\"],[8],[0,\"\\n  \"],[7,\"table\",true],[10,\"class\",\"w-100\"],[8],[0,\"\\n    \"],[7,\"tbody\",true],[8],[0,\"\\n\"],[4,\"vertical-collection\",[[24,[\"model\",\"databases\"]]],[[\"containerSelector\",\"key\",\"estimateHeight\",\"staticHeight\",\"bufferSize\"],[\".table-wrapper\",\"id\",37,true,5]],{\"statements\":[[0,\"        \"],[1,[28,\"db-item\",null,[[\"class\",\"db\"],[\"striped--light-gray\",[23,1,[]]]]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}",
    "meta": {
      "moduleName": "dummy/templates/demo.hbs"
    }
  });

  _exports.default = _default;
});
;define("dummy/utils/get-data", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getData = getData;

  /* eslint camelcase: 0 */
  var DEFAULT_ROWS = 20;

  function getData() {
    var ROWS = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_ROWS;
    // generate some dummy data
    var data = {
      start_at: new Date().getTime() / 1000,
      databases: []
    };

    for (var i = 1; i <= ROWS; i++) {
      data.databases.push({
        id: "cluster".concat(i),
        queries: []
      });
      data.databases.push({
        id: "cluster".concat(i, "slave"),
        queries: []
      });
    }

    data.databases.forEach(function (info) {
      var r = Math.floor(Math.random() * 10 + 1);

      for (var _i = 0; _i < r; _i++) {
        var q = {
          canvas_action: null,
          canvas_context_id: null,
          canvas_controller: null,
          canvas_hostname: null,
          canvas_job_tag: null,
          canvas_pid: null,
          elapsed: Math.random() * 15,
          query: 'SELECT blah FROM something',
          waiting: Math.random() < 0.5
        };

        if (Math.random() < 0.2) {
          q.query = '<IDLE> in transaction';
        }

        if (Math.random() < 0.1) {
          q.query = 'vacuum';
        }

        info.queries.push(q);
      }

      info.queries = info.queries.sort(function (a, b) {
        return b.elapsed - a.elapsed;
      });
    });
    return data;
  }
});
;

;define('dummy/config/environment', [], function() {
  var prefix = 'dummy';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("dummy/app")["default"].create({});
          }
        
//# sourceMappingURL=dummy.map
