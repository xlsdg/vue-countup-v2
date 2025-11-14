# Methods

All methods can be accessed via template ref after the component is mounted.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VueCountUp } from 'vue-countup-v2'

const countUpRef = ref()

// Access methods after component is ready
const handleStart = () => {
  countUpRef.value?.start()
}
</script>

<template>
  <VueCountUp ref="countUpRef" :end-val="1000" />
</template>
```

## start()

```typescript
start(callback?: () => void): void
```

Start or restart the count animation.

**Parameters:**

- `callback` (optional): Function to call when animation completes

**Example:**

```vue
<script setup lang="ts">
import { ref } from 'vue'

const countUpRef = ref()

const handleStart = () => {
  countUpRef.value?.start(() => {
    console.log('Animation completed!')
  })
}
</script>

<template>
  <VueCountUp ref="countUpRef" :end-val="1000" :delay="-1" />
  <button @click="handleStart">Start</button>
</template>
```

## pauseResume()

```typescript
pauseResume(): void
```

Toggle between pause and resume states.

**Example:**

```vue
<script setup lang="ts">
import { ref } from 'vue'

const countUpRef = ref()

const handlePauseResume = () => {
  countUpRef.value?.pauseResume()
}
</script>

<template>
  <VueCountUp ref="countUpRef" :end-val="1000" />
  <button @click="handlePauseResume">Pause/Resume</button>
</template>
```

## reset()

```typescript
reset(): void
```

Reset the counter to the start value.

**Example:**

```vue
<script setup lang="ts">
import { ref } from 'vue'

const countUpRef = ref()

const handleReset = () => {
  countUpRef.value?.reset()
}
</script>

<template>
  <VueCountUp ref="countUpRef" :end-val="1000" />
  <button @click="handleReset">Reset</button>
</template>
```

## update()

```typescript
update(newEndVal: number): void
```

Update the end value and animate to the new value.

**Parameters:**

- `newEndVal`: The new target number

**Example:**

```vue
<script setup lang="ts">
import { ref } from 'vue'

const countUpRef = ref()

const updateValue = () => {
  countUpRef.value?.update(5000)
}
</script>

<template>
  <VueCountUp ref="countUpRef" :end-val="1000" />
  <button @click="updateValue">Update to 5000</button>
</template>
```

::: tip
The component also automatically calls `update()` internally when the `endVal` prop changes, so you don't always need to call it manually.
:::

## printValue()

```typescript
printValue(value: number): void
```

Print a value without animating.

**Parameters:**

- `value`: The number to display

**Example:**

```vue
<script setup lang="ts">
import { ref } from 'vue'

const countUpRef = ref()

const printStatic = () => {
  countUpRef.value?.printValue(9999)
}
</script>

<template>
  <VueCountUp ref="countUpRef" :end-val="1000" />
  <button @click="printStatic">Print 9999 (no animation)</button>
</template>
```

## Complete Example

Here's a complete example showing all methods:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VueCountUp } from 'vue-countup-v2'

const countUpRef = ref()
const newValue = ref(1000)

const start = () => {
  countUpRef.value?.start(() => {
    console.log('Animation completed!')
  })
}

const pauseResume = () => {
  countUpRef.value?.pauseResume()
}

const reset = () => {
  countUpRef.value?.reset()
}

const update = () => {
  countUpRef.value?.update(newValue.value)
}

const print = () => {
  countUpRef.value?.printValue(9999)
}
</script>

<template>
  <div>
    <VueCountUp ref="countUpRef" :end-val="1000" :delay="-1" />

    <div class="controls">
      <button @click="start">Start</button>
      <button @click="pauseResume">Pause/Resume</button>
      <button @click="reset">Reset</button>

      <input v-model.number="newValue" type="number" />
      <button @click="update">Update</button>

      <button @click="print">Print 9999</button>
    </div>
  </div>
</template>
```

## TypeScript Support

All methods are fully typed when using TypeScript:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { VueCountUp } from 'vue-countup-v2'

// Properly typed ref
const countUpRef = ref<InstanceType<typeof VueCountUp>>()

// TypeScript will provide autocomplete and type checking
const handleStart = () => {
  countUpRef.value?.start(() => {
    console.log('Done!')
  })
}
</script>
```
