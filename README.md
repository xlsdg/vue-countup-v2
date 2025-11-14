# Vue CountUp V2

[![npm version](https://img.shields.io/npm/v/vue-countup-v2.svg)](https://www.npmjs.com/package/vue-countup-v2)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> A Vue 3 component wrapper for [CountUp.js](https://github.com/inorganik/CountUp.js) with full TypeScript support.

## Features

- ⚡️ **Vue 3 Powered** - Built with Vue 3 Composition API
- 🔷 **TypeScript First** - Complete type definitions included
- 🎯 **Simple & Flexible** - Easy to use with sensible defaults
- 📦 **Lightweight** - Small bundle size with tree-shaking support
- 🎨 **Customizable** - Full access to CountUp.js options
- ♿️ **Accessible** - Implements accessibility best practices

## Version Notice

**Version 5.x is a major rewrite with breaking changes:**

- Vue 3.3+ required (Vue 2 is no longer supported)
- Migrated to TypeScript
- Uses Composition API
- Minimum Node.js version: 18

If you need Vue 2 support, please use [version 4.x](https://github.com/xlsdg/vue-countup-v2/tree/v4).

## Installation

```bash
# npm
npm install vue-countup-v2 countup.js

# pnpm
pnpm add vue-countup-v2 countup.js

# yarn
yarn add vue-countup-v2 countup.js

# bun
bun add vue-countup-v2 countup.js
```

## Quick Start

### Basic Usage

```vue
<script setup lang="ts">
import { VueCountUp } from 'vue-countup-v2'
</script>

<template>
  <VueCountUp :end-val="1000" />
</template>
```

### With Options

```vue
<script setup lang="ts">
import { VueCountUp } from 'vue-countup-v2'

const options = {
  duration: 2.5,
  decimalPlaces: 2,
  prefix: '$',
  suffix: ' USD',
  separator: ',',
}
</script>

<template>
  <VueCountUp :end-val="9999.99" :options="options" />
</template>
```

### Reactive Updates

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VueCountUp } from 'vue-countup-v2'

const count = ref(0)

const increment = () => {
  count.value += 100
}
</script>

<template>
  <div>
    <VueCountUp :end-val="count" />
    <button @click="increment">+100</button>
  </div>
</template>
```

### Manual Control

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VueCountUp } from 'vue-countup-v2'

const countUpRef = ref()

const start = () => countUpRef.value?.start()
const pause = () => countUpRef.value?.pauseResume()
const reset = () => countUpRef.value?.reset()
</script>

<template>
  <div>
    <VueCountUp ref="countUpRef" :end-val="5000" :delay="-1" />

    <button @click="start">Start</button>
    <button @click="pause">Pause/Resume</button>
    <button @click="reset">Reset</button>
  </div>
</template>
```

## API Reference

### Props

| Prop      | Type     | Required | Default | Description                                |
| --------- | -------- | -------- | ------- | ------------------------------------------ |
| `endVal`  | `number` | Yes      | -       | The target number to count to              |
| `delay`   | `number` | No       | `0`     | Delay in milliseconds before starting      |
| `options` | `object` | No       | `{}`    | CountUp.js configuration options           |

#### CountUp.js Options

| Option          | Type       | Default | Description                       |
| --------------- | ---------- | ------- | --------------------------------- |
| `startVal`      | `number`   | `0`     | Number to start from              |
| `duration`      | `number`   | `2`     | Animation duration in seconds     |
| `decimalPlaces` | `number`   | `0`     | Number of decimal places          |
| `useEasing`     | `boolean`  | `true`  | Enable easing animation           |
| `useGrouping`   | `boolean`  | `true`  | Use grouping (e.g., 1,000)        |
| `separator`     | `string`   | `','`   | Grouping separator                |
| `decimal`       | `string`   | `'.'`   | Decimal separator                 |
| `prefix`        | `string`   | `''`    | Text prepended to result          |
| `suffix`        | `string`   | `''`    | Text appended to result           |

See the [full options documentation](https://github.com/inorganik/CountUp.js#options) for more details.

### Methods

Access these methods via template ref:

- `start(callback?)` - Start or restart the animation
- `pauseResume()` - Toggle pause/resume
- `reset()` - Reset to start value
- `update(newEndVal)` - Update to a new end value
- `printValue(value)` - Print a value without animating

### Events

| Event   | Parameters                                    | Description                          |
| ------- | --------------------------------------------- | ------------------------------------ |
| `ready` | `(instance: CountUp, CountUpClass: CountUp)`  | Emitted when instance is initialized |

## TypeScript Support

Full TypeScript support is included:

```vue
<script setup lang="ts">
import { VueCountUp, type VueCountUpProps } from 'vue-countup-v2'
import type { CountUpOptions } from 'countup.js'

const options: CountUpOptions = {
  duration: 2,
  decimalPlaces: 2,
  prefix: '$',
}

const props: VueCountUpProps = {
  endVal: 1000,
  delay: 500,
  options,
}
</script>

<template>
  <VueCountUp v-bind="props" />
</template>
```

## Examples

### Currency Formatting

```vue
<VueCountUp
  :end-val="1234567.89"
  :options="{
    prefix: '$',
    decimalPlaces: 2,
    separator: ',',
  }"
/>
<!-- Output: $1,234,567.89 -->
```

### Percentage

```vue
<VueCountUp
  :end-val="85.5"
  :options="{
    suffix: '%',
    decimalPlaces: 1,
  }"
/>
<!-- Output: 85.5% -->
```

### Countdown Timer

```vue
<script setup lang="ts">
import { ref } from 'vue'

const timeLeft = ref(60)

setInterval(() => {
  if (timeLeft.value > 0) timeLeft.value--
}, 1000)
</script>

<template>
  <VueCountUp
    :end-val="timeLeft"
    :options="{ suffix: 's', duration: 1 }"
  />
</template>
```

## Documentation

For detailed documentation, examples, and API reference, visit:

- [Full Documentation](https://xlsdg.github.io/vue-countup-v2/)
- [CountUp.js Documentation](https://github.com/inorganik/CountUp.js)

## Migration from v4

Version 5 introduces breaking changes. See the [CHANGELOG](CHANGELOG.md) for detailed migration instructions.

Key changes:

- Vue 3.3+ required
- TypeScript rewrite
- Composition API
- New prop names (camelCase)
- New import syntax

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE) © [xLsDg](https://github.com/xlsdg)
