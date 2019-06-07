# vue-countup-v2

> Vue.js component wrap for CountUp.js

## Installation

```bash
$ npm install --save countup.js vue-countup-v2
```

## Usage

``` vue
<template>
  <div class="iCountUp">
    <ICountUp
      :delay="delay"
      :endVal="endVal"
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
        delay: 1000,
        endVal: 120500,
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

* `delay` **[Number]**

  Optional;

* `endVal` **[Number]**

  Required; The value you want to arrive at.

* `options` **[Object]**

  Optional; Formatting/easing options object.

See more [countUp.js](https://github.com/inorganik/countUp.js)

## Static Methods

* `start`
* `pauseResume`
* `reset`
* `update`

Learn more [countUp.js](https://github.com/inorganik/countUp.js)

## License

MIT
