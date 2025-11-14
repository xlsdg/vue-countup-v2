# TypeScript

Vue CountUp V2 is written in TypeScript and provides complete type definitions out of the box.

## Type Imports

```typescript
import { VueCountUp } from 'vue-countup-v2'
import type { VueCountUpProps, VueCountUpEmits } from 'vue-countup-v2'
import type { CountUp, CountUpOptions } from 'countup.js'
```

## Props Types

### VueCountUpProps

The interface for component props:

```typescript
interface VueCountUpProps {
  /**
   * Delay in milliseconds before starting the animation
   * @default 0
   */
  delay?: number

  /**
   * The target value to count to
   */
  endVal: number

  /**
   * CountUp.js options
   */
  options?: CountUpOptions
}
```

**Usage:**

```vue
<script setup lang="ts">
import type { VueCountUpProps } from 'vue-countup-v2'

const props: VueCountUpProps = {
  endVal: 1000,
  delay: 500,
  options: {
    duration: 2,
    decimalPlaces: 2,
  },
}
</script>

<template>
  <VueCountUp v-bind="props" />
</template>
```

## Events Types

### VueCountUpEmits

The interface for component events:

```typescript
interface VueCountUpEmits {
  (e: 'ready', instance: CountUp, CountUpClass: typeof CountUp): void
}
```

**Usage:**

```vue
<script setup lang="ts">
import type { CountUp } from 'countup.js'

const onReady = (instance: CountUp, CountUpClass: typeof CountUp) => {
  console.log('Ready!', instance)
}
</script>

<template>
  <VueCountUp :end-val="1000" @ready="onReady" />
</template>
```

## Component Instance Type

Get the type of the component instance for refs:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VueCountUp } from 'vue-countup-v2'

// Method 1: Using InstanceType
const countUpRef1 = ref<InstanceType<typeof VueCountUp>>()

// Method 2: Using ComponentPublicInstance
import type { ComponentPublicInstance } from 'vue'
const countUpRef2 = ref<ComponentPublicInstance<typeof VueCountUp>>()

// Now TypeScript knows about the exposed methods
const handleStart = () => {
  countUpRef1.value?.start()
  countUpRef1.value?.pauseResume()
  countUpRef1.value?.reset()
}
</script>

<template>
  <VueCountUp ref="countUpRef1" :end-val="1000" />
</template>
```

## CountUp.js Types

Import types from CountUp.js for options and instance:

```typescript
import type { CountUp, CountUpOptions } from 'countup.js'
```

### CountUpOptions

```typescript
interface CountUpOptions {
  startVal?: number
  duration?: number
  decimalPlaces?: number
  useEasing?: boolean
  useGrouping?: boolean
  separator?: string
  decimal?: string
  prefix?: string
  suffix?: string
  numerals?: string[]
  formattingFn?: (n: number) => string
  easingFn?: (t: number, b: number, c: number, d: number) => number
  // ... and more
}
```

**Usage:**

```vue
<script setup lang="ts">
import type { CountUpOptions } from 'countup.js'

const options: CountUpOptions = {
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

## Generic Component Usage

Use with generic components and defineComponent:

```vue
<script setup lang="ts">
import { defineComponent } from 'vue'
import { VueCountUp } from 'vue-countup-v2'
import type { VueCountUpProps } from 'vue-countup-v2'

// Define a wrapper component
const CounterWrapper = defineComponent({
  name: 'CounterWrapper',
  setup() {
    const props: VueCountUpProps = {
      endVal: 1000,
      delay: 0,
      options: {
        duration: 2,
      },
    }

    return { props }
  },
})
</script>
```

## Composable with Types

Create a typed composable for common counter logic:

```typescript
// useCounter.ts
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import type { CountUp, CountUpOptions } from 'countup.js'
import type { VueCountUpProps } from 'vue-countup-v2'

export function useCounter(initialValue: number) {
  const count = ref(initialValue)
  const countUpRef = ref<InstanceType<typeof import('vue-countup-v2').VueCountUp>>()

  const props = computed<VueCountUpProps>(() => ({
    endVal: count.value,
    delay: 0,
    options: {
      duration: 2,
      separator: ',',
    },
  }))

  const increment = () => {
    count.value += 100
  }

  const decrement = () => {
    count.value = Math.max(0, count.value - 100)
  }

  const reset = () => {
    countUpRef.value?.reset()
  }

  return {
    count,
    countUpRef,
    props,
    increment,
    decrement,
    reset,
  }
}
```

**Usage:**

```vue
<script setup lang="ts">
import { VueCountUp } from 'vue-countup-v2'
import { useCounter } from './useCounter'

const { count, countUpRef, props, increment, decrement, reset } = useCounter(0)
</script>

<template>
  <div>
    <VueCountUp ref="countUpRef" v-bind="props" />

    <div class="controls">
      <button @click="increment">+100</button>
      <button @click="decrement">-100</button>
      <button @click="reset">Reset</button>
    </div>
  </div>
</template>
```

## Prop Validators with Types

Use TypeScript for runtime prop validation:

```vue
<script setup lang="ts">
import { computed } from 'vue'
import type { VueCountUpProps } from 'vue-countup-v2'

interface Props {
  value: number
  currency?: string
}

const props = defineProps<Props>()

// Convert to VueCountUpProps with validation
const countUpProps = computed<VueCountUpProps>(() => {
  if (props.value < 0) {
    console.warn('Value should be non-negative')
  }

  return {
    endVal: Math.abs(props.value),
    options: {
      prefix: props.currency || '$',
      decimalPlaces: 2,
      separator: ',',
    },
  }
})
</script>

<template>
  <VueCountUp v-bind="countUpProps" />
</template>
```

## Type Guards

Create type guards for safer code:

```typescript
import type { CountUp } from 'countup.js'

function isCountUpInstance(value: unknown): value is CountUp {
  return (
    value !== null &&
    typeof value === 'object' &&
    'start' in value &&
    'pauseResume' in value &&
    'reset' in value &&
    'update' in value
  )
}

// Usage
const instance = getCountUpInstance()

if (isCountUpInstance(instance)) {
  // TypeScript knows instance is CountUp
  instance.start()
}
```

## Best Practices

1. **Always import types separately** using `type` keyword:

   ```typescript
   import { VueCountUp } from 'vue-countup-v2' // runtime
   import type { VueCountUpProps } from 'vue-countup-v2' // type-only
   ```

2. **Use proper ref typing** for component refs:

   ```typescript
   const countUpRef = ref<InstanceType<typeof VueCountUp>>()
   ```

3. **Leverage CountUp.js types** for options:

   ```typescript
   import type { CountUpOptions } from 'countup.js'

   const options: CountUpOptions = {
     /* ... */
   }
   ```

4. **Enable strict mode** in tsconfig.json for better type safety:

   ```json
   {
     "compilerOptions": {
       "strict": true
     }
   }
   ```
