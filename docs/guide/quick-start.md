# Quick Start

## Basic Usage

Import and use the component in your Vue 3 application:

```vue
<script setup lang="ts">
import { VueCountUp } from 'vue-countup-v2'
</script>

<template>
  <div>
    <h1>Total Sales</h1>
    <VueCountUp :end-val="12345" />
  </div>
</template>
```

## With Options

Customize the animation using CountUp.js options:

```vue
<script setup lang="ts">
import { VueCountUp } from 'vue-countup-v2'

const options = {
  duration: 3,
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

Result: **$9,999.99 USD**

## With Delay

Add a delay before the animation starts:

```vue
<script setup lang="ts">
import { VueCountUp } from 'vue-countup-v2'
</script>

<template>
  <!-- Wait 1000ms before starting -->
  <VueCountUp :end-val="5000" :delay="1000" />
</template>
```

## Reactive Updates

The component automatically updates when `endVal` changes:

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

## Using Component Methods

Access component methods via template ref:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VueCountUp } from 'vue-countup-v2'

const countUpRef = ref()

const handleStart = () => {
  countUpRef.value?.start()
}

const handleReset = () => {
  countUpRef.value?.reset()
}

const handlePauseResume = () => {
  countUpRef.value?.pauseResume()
}
</script>

<template>
  <div>
    <VueCountUp ref="countUpRef" :end-val="10000" :delay="-1" />

    <div>
      <button @click="handleStart">Start</button>
      <button @click="handlePauseResume">Pause/Resume</button>
      <button @click="handleReset">Reset</button>
    </div>
  </div>
</template>
```

::: tip
Set `:delay="-1"` to prevent auto-start, allowing you to manually control the animation.
:::

## Listening to Events

Handle the `ready` event when the CountUp instance is initialized:

```vue
<script setup lang="ts">
import type { CountUp } from 'countup.js'

const onReady = (instance: CountUp) => {
  console.log('CountUp is ready!', instance)
}
</script>

<template>
  <VueCountUp :end-val="1000" @ready="onReady" />
</template>
```

## TypeScript Support

Vue CountUp V2 is written in TypeScript and provides full type definitions:

```vue
<script setup lang="ts">
import { VueCountUp, type VueCountUpProps } from 'vue-countup-v2'
import type { CountUpOptions } from 'countup.js'

// Fully typed props
const props: VueCountUpProps = {
  endVal: 5000,
  delay: 500,
  options: {
    duration: 2,
    decimalPlaces: 0,
  } as CountUpOptions,
}
</script>

<template>
  <VueCountUp v-bind="props" />
</template>
```

## Next Steps

- Explore more [Examples](/guide/examples)
- Check out the full [API Reference](/api/props)
- Learn about [TypeScript types](/api/typescript)
