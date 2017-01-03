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
      ins.update(ins.endVal + 100);
    }
  }
});
