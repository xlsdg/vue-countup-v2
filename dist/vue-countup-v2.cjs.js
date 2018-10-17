'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var CountUp = _interopDefault(require('countup.js'));

var index = {
  name: 'ICountUp',
  props: {
    startVal: {
      type: Number,
      default: 0
    },
    endVal: {
      type: Number,
      required: true
    },
    decimals: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 2
    },
    options: Object
  },
  data: function data() {
    return {
      instance: null
    };
  },
  watch: {
    endVal: function endVal(newEndVal) {
      this.instance.update(newEndVal);
    }
  },
  mounted: function mounted() {
    var _this = this;

    if (this.instance) return;
    this.instance = new CountUp(this.$el, this.startVal, this.endVal, this.decimals, this.duration, this.options);
    if (this.instance.error) throw new Error(this.instance.error);
    this.instance.start(function () {
      return _this.$emit('ready', instance);
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.instance = null;
  },
  render: function render(createElement) {
    return createElement('span', {});
  }
};

module.exports = index;
