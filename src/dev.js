import Vue from 'vue';
import ICountUp from './iCountUp.vue';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    ICountUp
  },
  data() {
    return {
      num: 0,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      }
    };
  },
  methods: {
    callback: function(ins) {
      // ins.update(ins.endVal + 100);
    }
  },
  mounted() {
    const that = this;
    setInterval(function() {
      that.num = that.num + 100;
    }, 3000);
  }
});
