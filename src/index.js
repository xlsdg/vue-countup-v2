import CountUp from 'countup.js';

export default {
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
  data () {
    return {
      instance: null
    };
  },
  watch: {
    endVal (newEndVal) {
      this.instance.update(newEndVal);
    }
  },
  mounted () {
    if (this.instance)
      return;

    this.instance = new CountUp(
      this.$el,
      this.startVal,
      this.endVal,
      this.decimals,
      this.duration,
      this.options
    );

    if (this.instance.error)
      throw new Error(this.instance.error);

    this.instance.start(() => this.$emit('ready', instance));
  },
  beforeDestroy () {
    this.instance = null;
  },
  render (createElement) {
    return createElement('span', {});
  }
};
