<template>
  <span></span>
</template>

<style scoped>
</style>

<script>
  import CountUp from 'countup.js';

  export default {
    name: 'ICountUp',
    props: {
      start: {
        type: Number,
        required: false,
        default: 0
      },
      end: {
        type: Number,
        required: true
      },
      decimals: {
        type: Number,
        required: false,
        default: 0
      },
      duration: {
        type: Number,
        required: false,
        default: 2
      },
      options: {
        type: Object,
        required: false
      },
      callback: {
        type: Function,
        required: false,
        default: function() {}
      }
    },
    data() {
      return {
        instance: null
      };
    },
    computed: {
    },
    watch: {
      end: {
        handler: function(value) {
          const that = this;
          if (that.instance && that.instance.update) {
            that.instance.update(value);
          }
        },
        deep: false
      }
    },
    methods: {
      init() {
        const that = this;
        if (!that.instance) {
          const dom = that.$el;
          that.instance = new CountUp(
            dom,
            that.start,
            that.end,
            that.decimals,
            that.duration,
            that.options
          );
          that.instance.start(function() {
            that.callback(that.instance);
          });
        }
      },
      destroy() {
        const that = this;
        that.instance = null;
      }
    },
    beforeCreate() {
      // const that = this;
      // console.log('beforeCreate');
    },
    created() {
      // const that = this;
      // console.log('created');
    },
    beforeMount() {
      // const that = this;
      // console.log('beforeMount');
    },
    mounted() {
      const that = this;
      // console.log('mounted');
      that.init();
    },
    beforeUpdate() {
      // const that = this;
      // console.log('beforeUpdate');
    },
    updated() {
      // const that = this;
      // console.log('updated');
    },
    activated() {
      // const that = this;
      // console.log('activated');
    },
    deactivated() {
      // const that = this;
      // console.log('deactivated');
    },
    beforeDestroy() {
      const that = this;
      // console.log('beforeDestroy');
      that.destroy();
    },
    destroyed() {
      // const that = this;
      // console.log('destroyed');
    },
    start(callback) {
      const that = this;
      if (that.instance && that.instance.start) {
        that.instance.start(function() {
          callback && callback(that.instance);
        });
      }
    },
    pauseResume() {
      const that = this;
      if (that.instance && that.instance.pauseResume) {
        that.instance.pauseResume();
      }
    },
    reset() {
      const that = this;
      if (that.instance && that.instance.reset) {
        that.instance.reset();
      }
    },
    update(newEndVal) {
      const that = this;
      if (that.instance && that.instance.update) {
        that.instance.update(newEndVal);
      }
    }
  };
</script>
