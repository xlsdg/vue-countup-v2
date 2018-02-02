# vue-countup-v2

> Vue.js(v2.x+) component wrap for CountUp.js(v1.x+)


## Installation

``` bash
$ npm install --save countup.js vue-countup-v2
```


## Usage

``` vue
<template>
  <div class="iCountUp">
    <ICountUp
      :startVal="startVal"
      :endVal="endVal"
      :decimals="decimals"
      :duration="duration"
      :options="options"
      @ready="onReady"
    />
  </div>
</template>

<script type="text/babel">
  import ICountUp from 'vue-countup-v2';
  export default {
    name: 'demo',
    components: {
      ICountUp
    },
    data() {
      return {
        startVal: 0,
        endVal: 120500,
        decimals: 0,
        duration: 2.5,
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
      onReady: function(instance, CountUp) {
        const that = this;
        instance.update(that.endVal + 100);
      }
    }
  };
</script>

<style scoped>
  .iCountUp {
    font-size: 12em;
    margin: 0;
    color: #4d63bc;
  }
</style>
```

## Properties

* `startVal` **[Number]**

  Optional; `0` by defualt. The value you want to begin at.

* `endVal` **[Number]**

  Required; The value you want to arrive at.

* `decimals` **[Number]**

  Optional; `0` by defualt. Number of decimal places in number.

* `duration` **[Number]**

  Optional; `2` by defualt. Duration in seconds.

* `options` **[Object]**

  Optional; Formatting/easing options object.

See more [countUp.js](https://github.com/inorganik/countUp.js)


## Static Methods

* `start`
* `pauseResume`
* `reset`
* `update`

Learn more [countUp.js](https://github.com/inorganik/countUp.js)


# License

MIT
