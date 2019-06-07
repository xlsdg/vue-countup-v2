<template>
  <span />
</template>

<script>
  import { CountUp } from 'countup.js';

  const typeOf = type => object => Object.prototype.toString.call(object) === `[object ${type}]`;

  // const isString = typeOf('String');
  // const isObject = typeOf('Object');
  const isFunction = typeOf('Function');

  export default {
    __countup__: CountUp,
    name: 'VueCountUp',
    props: {
      delay: {
        type: Number,
        required: false,
        default: 0,
      },
      endVal: {
        type: Number,
        required: true,
      },
      options: {
        type: Object,
        required: false,
      },
    },
    data() {
      return {
        instance: null,
      };
    },
    // computed: {},
    watch: {
      endVal: {
        handler(value) {
          const that = this;

          if (that.instance && isFunction(that.instance.update)) {
            that.instance.update(value);
          }
        },
        deep: false
      }
    },
    methods: {
      create() {
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
          return;
        }

        that.instance = instance;

        if (that.delay < 0) {
          that.$emit('ready', instance, CountUp);
          return;
        }

        setTimeout(() => instance.start(() => that.$emit('ready', instance, CountUp)), that.delay);
      },
      destroy() {
        const that = this;
        that.instance = null;
      },
      printValue(value) {
        const that = this;

        if (that.instance && isFunction(that.instance.printValue)) {
          return that.instance.printValue(value);
        }
      },
      start(callback) {
        const that = this;

        if (that.instance && isFunction(that.instance.start)) {
          return that.instance.start(callback);
        }
      },
      pauseResume() {
        const that = this;

        if (that.instance && isFunction(that.instance.pauseResume)) {
          return that.instance.pauseResume();
        }
      },
      reset() {
        const that = this;

        if (that.instance && isFunction(that.instance.reset)) {
          return that.instance.reset();
        }
      },
      update(newEndVal) {
        const that = this;

        if (that.instance && isFunction(that.instance.update)) {
          return that.instance.update(newEndVal);
        }
      }
    },
    // beforeCreate() {
    //   const that = this;
    //   console.log('beforeCreate');
    // },
    // created() {
    //   const that = this;
    //   console.log('created');
    // },
    // beforeMount() {
    //   const that = this;
    //   console.log('beforeMount');
    // },
    mounted() {
      const that = this;
      // console.log('mounted');
      that.create();
    },
    // beforeUpdate() {
    //   const that = this;
    //   console.log('beforeUpdate');
    // },
    // updated() {
    //   const that = this;
    //   console.log('updated');
    // },
    // activated() {
    //   const that = this;
    //   console.log('activated');
    // },
    // deactivated() {
    //   const that = this;
    //   console.log('deactivated');
    // },
    beforeDestroy() {
      const that = this;
      // console.log('beforeDestroy');
      that.destroy();
    },
    // destroyed() {
    //   const that = this;
    //   console.log('destroyed');
    // },
    // errorCaptured(err, vm, info) {
    //   const that = this;
    //   console.log('errorCaptured');
    //   return true;
    // },
  };
</script>

<style lang="less" scoped>
</style>
