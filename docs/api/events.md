# Events

## ready

Emitted when the CountUp instance has been created and is ready to use.

**Signature:**

```typescript
(instance: CountUp, CountUpClass: typeof CountUp) => void
```

**Parameters:**

- `instance`: The created CountUp instance
- `CountUpClass`: The CountUp class constructor

**Example:**

```vue
<script setup lang="ts">
import type { CountUp } from 'countup.js'

const onReady = (instance: CountUp, CountUpClass: typeof CountUp) => {
  console.log('CountUp instance:', instance)
  console.log('CountUp class:', CountUpClass)
  console.log('Current value:', instance.frameVal)
}
</script>

<template>
  <VueCountUp :end-val="1000" @ready="onReady" />
</template>
```

## Use Cases

### Access Instance Properties

```vue
<script setup lang="ts">
import type { CountUp } from 'countup.js'

const onReady = (instance: CountUp) => {
  console.log('Start value:', instance.startVal)
  console.log('End value:', instance.endVal)
  console.log('Duration:', instance.duration)
  console.log('Options:', instance.options)
}
</script>

<template>
  <VueCountUp :end-val="5000" @ready="onReady" />
</template>
```

### Store Instance for Later Use

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CountUp } from 'countup.js'

const countUpInstance = ref<CountUp>()

const onReady = (instance: CountUp) => {
  countUpInstance.value = instance
}

const manualUpdate = () => {
  if (countUpInstance.value) {
    countUpInstance.value.update(10000)
  }
}
</script>

<template>
  <div>
    <VueCountUp :end-val="1000" @ready="onReady" />
    <button @click="manualUpdate">Update to 10000</button>
  </div>
</template>
```

### Custom Initialization Logic

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CountUp } from 'countup.js'

const isReady = ref(false)

const onReady = (instance: CountUp) => {
  isReady.value = true

  // Perform custom initialization
  console.log('Counter initialized with end value:', instance.endVal)

  // You can even call methods on the instance
  setTimeout(() => {
    instance.pauseResume()
  }, 1000)
}
</script>

<template>
  <div>
    <p v-if="!isReady">Loading...</p>
    <VueCountUp :end-val="5000" @ready="onReady" />
  </div>
</template>
```

### Using with Animation Callback

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CountUp } from 'countup.js'

const status = ref('Not started')

const onReady = (instance: CountUp) => {
  status.value = 'Ready'

  // Start with callback
  instance.start(() => {
    status.value = 'Completed'
  })
}
</script>

<template>
  <div>
    <VueCountUp :end-val="1000" :delay="-1" @ready="onReady" />
    <p>Status: {{ status }}</p>
  </div>
</template>
```

## TypeScript Support

The event is fully typed when using TypeScript:

```vue
<script setup lang="ts">
import type { CountUp } from 'countup.js'

// TypeScript will provide proper type checking
const onReady = (instance: CountUp, CountUpClass: typeof CountUp) => {
  // instance is typed as CountUp
  // CountUpClass is typed as typeof CountUp

  // TypeScript autocomplete works here
  instance.start()
  instance.pauseResume()
  instance.reset()
}
</script>

<template>
  <VueCountUp :end-val="1000" @ready="onReady" />
</template>
```

## Event Timing

The `ready` event is emitted at different times depending on the `delay` prop:

### With Default or Positive Delay

```vue
<!-- Emitted after animation starts -->
<VueCountUp :end-val="1000" :delay="0" @ready="onReady" />
<VueCountUp :end-val="1000" :delay="1000" @ready="onReady" />
```

The event fires **after** the animation begins.

### With Negative Delay

```vue
<!-- Emitted immediately, before animation -->
<VueCountUp :end-val="1000" :delay="-1" @ready="onReady" />
```

The event fires **immediately** without starting the animation, giving you full control.

## Notes

::: warning
The `ready` event is only emitted once per component mount. If you need to react to updates, consider watching the `endVal` prop or using component methods.
:::

::: tip
For manual control over the animation, set `:delay="-1"` and use the `ready` event to access the instance:

```vue
<VueCountUp :end-val="1000" :delay="-1" @ready="onReady" />
```

This prevents auto-start and gives you complete control.
:::
