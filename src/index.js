import _isFunction from 'lodash-es/isFunction';
import { CountUp } from 'countup.js';

const ICountUp = {
  __countup__: CountUp,
  name: 'ICountUp',
  props: {
    startOnMount: {
      type: Boolean,
      required: false,
      default: true
    },
    endVal: {
      type: Number,
      required: true
    },
    options: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      instance: null
    };
  },
  // computed: {},
  watch: {
    endVal: {
      handler: function(value) {
        const that = this;

        if (that.instance && _isFunction(that.instance.update)) {
          that.instance.update(value);
        }
      },
      deep: false
    }
  },
  methods: {
    init() {
      const that = this;
      if (that.instance) {
        return;
      }

      const dom = that.$el;
      const instance = new CountUp(
        dom,
        that.endVal,
        that.options
      );

      if (instance.error) {
        // error
      } else {
        this.startOnMount
          ? instance.start(() => that.$emit('ready', instance, CountUp))
          : that.$emit('ready', instance, CountUp);
        that.instance = instance;
      }
    },
    uninit() {
      const that = this;
      that.instance = null;
    },
    printValue(value) {
      const that = this;

      if (that.instance && _isFunction(that.instance.printValue)) {
        return that.instance.printValue(value);
      }
    },
    start(callback) {
      const that = this;

      if (that.instance && _isFunction(that.instance.start) && _isFunction(callback)) {
        return that.instance.start(callback);
      }
    },
    pauseResume() {
      const that = this;

      if (that.instance && _isFunction(that.instance.pauseResume)) {
        return that.instance.pauseResume();
      }
    },
    reset() {
      const that = this;

      if (that.instance && _isFunction(that.instance.reset)) {
        return that.instance.reset();
      }
    },
    update(newEndVal) {
      const that = this;

      if (that.instance && _isFunction(that.instance.update)) {
        return that.instance.update(newEndVal);
      }
    }
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
  mounted() {
    const that = this;
    // console.log('mounted');
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
  beforeDestroy() {
    const that = this;
    // console.log('beforeDestroy');
    that.uninit();
  },
  // destroyed() {
    // const that = this;
    // console.log('destroyed');
  // },
  render(h) {
    // const that = this;
    return h('span', {});
  }
};

export default ICountUp;
