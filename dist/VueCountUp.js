(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory(require('countup.js')))
    : typeof define === 'function' && define.amd
    ? define(['countup.js'], factory)
    : (global.VueCountUp = factory(global.CountUp));
})(this, function(CountUp) {
  'use strict';

  CountUp = CountUp && CountUp.hasOwnProperty('default') ? CountUp['default'] : CountUp;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  /** Built-in value references. */
  var Symbol = root.Symbol;

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto.toString;

  /** Built-in value references. */
  var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
    } catch (e) {}

    var result = nativeObjectToString.call(value);
    {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$1.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag$1 = Symbol ? Symbol.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return symToStringTag$1 && symToStringTag$1 in Object(value) ? getRawTag(value) : objectToString(value);
  }

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  var ICountUp = {
    __countup__: CountUp,
    name: 'ICountUp',
    props: {
      endVal: {
        type: Number,
        required: true,
      },
      options: {
        type: Object,
        required: false,
      },
    },
    data: function data() {
      return {
        instance: null,
      };
    },
    // computed: {},
    watch: {
      endVal: {
        handler: function handler(value) {
          var that = this;

          if (that.instance && isFunction(that.instance.update)) {
            that.instance.update(value);
          }
        },
        deep: false,
      },
    },
    methods: {
      init: function init() {
        var that = this;

        if (that.instance) {
          return;
        }

        var dom = that.$el;
        var instance = new CountUp(dom, that.endVal, that.options);

        if (instance.error);
        else {
          instance.start(function() {
            return that.$emit('ready', instance, CountUp);
          });
          that.instance = instance;
        }
      },
      uninit: function uninit() {
        var that = this;
        that.instance = null;
      },
      printValue: function printValue(value) {
        var that = this;

        if (that.instance && isFunction(that.instance.printValue)) {
          return that.instance.printValue(value);
        }
      },
      start: function start(callback) {
        var that = this;

        if (that.instance && isFunction(that.instance.start) && isFunction(callback)) {
          return that.instance.start(callback);
        }
      },
      pauseResume: function pauseResume() {
        var that = this;

        if (that.instance && isFunction(that.instance.pauseResume)) {
          return that.instance.pauseResume();
        }
      },
      reset: function reset() {
        var that = this;

        if (that.instance && isFunction(that.instance.reset)) {
          return that.instance.reset();
        }
      },
      update: function update(newEndVal) {
        var that = this;

        if (that.instance && isFunction(that.instance.update)) {
          return that.instance.update(newEndVal);
        }
      },
    },
    // beforeCreate() {
    // const that = this;
    // console.log('beforeCreate');
    // },
    // created() {
    // const that = this;
    // console.log('created');
    // },
    // beforeMount() {
    // const that = this;
    // console.log('beforeMount');
    // },
    mounted: function mounted() {
      var that = this; // console.log('mounted');

      that.init();
    },
    // beforeUpdate() {
    // const that = this;
    // console.log('beforeUpdate');
    // },
    // updated() {
    // const that = this;
    // console.log('updated');
    // },
    // activated() {
    // const that = this;
    // console.log('activated');
    // },
    // deactivated() {
    // const that = this;
    // console.log('deactivated');
    // },
    beforeDestroy: function beforeDestroy() {
      var that = this; // console.log('beforeDestroy');

      that.uninit();
    },
    // destroyed() {
    // const that = this;
    // console.log('destroyed');
    // },
    render: function render(h) {
      // const that = this;
      return h('span', {});
    },
  };

  return ICountUp;
});
