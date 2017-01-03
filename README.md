# vue-countup-v2

> Vue.js(v2.x+) component wrap for countUp.js(v1.x+)


## Installation

``` bash
$ npm install --save vue-countup-v2
```


## Usage

``` vue
<template>
  <div class="iCountUp">
    <i-count-up
      :start="0"
      :end="120500"
      :decimals="0"
      :duration="2.5"
      :options="options"
      :callback="callback"
    ></i-count-up>
  </div>
</template>

<script type="text/babel">
  import ICountUp from 'vue-countup-v2';
  export default {
    name: 'view',
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

* `start` **[Number]**

  Optional; `0` by defualt. The value you want to begin at.

* `end` **[Number]**

  Required; The value you want to arrive at.

* `decimals` **[Number]**

  Optional; `0` by defualt. Number of decimal places in number.

* `duration` **[Number]**

  Optional; `2` by defualt. Duration in seconds.

* `options` **[Object]**

  Optional; Formatting/easing options object.

* `callback` **[Function]**

  Optional; Some method to call on complete.

See more [countUp.js](https://github.com/inorganik/countUp.js)


## Static Methods

* `start`
* `pauseResume`
* `reset`
* `update`

Learn more [countUp.js](https://github.com/inorganik/countUp.js)


## Development

``` bash
$ git clone https://github.com/xlsdg/vue-countup-v2.git vue-countup
$ cd vue-countup && npm i && npm run dev
```

Then open `http://localhost:8080/` to see the demo.

# License

MIT
