# Examples

## Currency Formatting

Display amounts with currency symbols and thousand separators:

```vue
<script setup lang="ts">
import { VueCountUp } from 'vue-countup-v2'

const options = {
  prefix: '$',
  suffix: '',
  separator: ',',
  decimal: '.',
  decimalPlaces: 2,
}
</script>

<template>
  <VueCountUp :end-val="1234567.89" :options="options" />
  <!-- Output: $1,234,567.89 -->
</template>
```

## Percentage

Show percentage values with custom formatting:

```vue
<script setup lang="ts">
import { VueCountUp } from 'vue-countup-v2'

const options = {
  suffix: '%',
  decimalPlaces: 1,
  duration: 2,
}
</script>

<template>
  <VueCountUp :end-val="85.5" :options="options" />
  <!-- Output: 85.5% -->
</template>
```

## Large Numbers

Format large numbers with abbreviated suffixes:

```vue
<script setup lang="ts">
import { VueCountUp } from 'vue-countup-v2'

const options = {
  suffix: 'M',
  decimalPlaces: 2,
  separator: ',',
}
</script>

<template>
  <VueCountUp :end-val="42.5" :options="options" />
  <!-- Output: 42.50M -->
</template>
```

## Countdown Timer

Use negative numbers for countdown animations:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VueCountUp } from 'vue-countup-v2'

const timeLeft = ref(60)

setInterval(() => {
  if (timeLeft.value > 0) {
    timeLeft.value--
  }
}, 1000)

const options = {
  suffix: 's',
  duration: 1,
}
</script>

<template>
  <VueCountUp :end-val="timeLeft" :options="options" />
</template>
```

## Loading Statistics

Simulate loading progress with incremental updates:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { VueCountUp } from 'vue-countup-v2'

const progress = ref(0)

onMounted(() => {
  const interval = setInterval(() => {
    progress.value += Math.random() * 10
    if (progress.value >= 100) {
      progress.value = 100
      clearInterval(interval)
    }
  }, 500)
})

const options = {
  suffix: '%',
  decimalPlaces: 0,
  duration: 0.5,
}
</script>

<template>
  <div>
    <h3>Loading...</h3>
    <VueCountUp :end-val="progress" :options="options" />
  </div>
</template>
```

## Custom Easings

Use different easing functions for unique animations:

```vue
<script setup lang="ts">
import { VueCountUp } from 'vue-countup-v2'

const options = {
  duration: 3,
  useEasing: true,
  useGrouping: true,
  separator: ',',
  // You can also use custom easing functions
  // easingFn: (t, b, c, d) => c * (t /= d) * t + b
}
</script>

<template>
  <VueCountUp :end-val="100000" :options="options" />
</template>
```

## Combining Multiple Counters

Create a dashboard with multiple counters:

```vue
<script setup lang="ts">
import { VueCountUp } from 'vue-countup-v2'

const stats = [
  { label: 'Total Users', value: 45230, prefix: '', suffix: '' },
  { label: 'Revenue', value: 892456.5, prefix: '$', suffix: '' },
  { label: 'Growth', value: 23.4, prefix: '', suffix: '%' },
]
</script>

<template>
  <div class="dashboard">
    <div v-for="stat in stats" :key="stat.label" class="stat-card">
      <h3>{{ stat.label }}</h3>
      <VueCountUp
        :end-val="stat.value"
        :options="{
          prefix: stat.prefix,
          suffix: stat.suffix,
          decimalPlaces: stat.suffix === '%' ? 1 : 0,
          separator: ',',
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  gap: 20px;
}

.stat-card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
```

## Manual Control

Full control over animation lifecycle:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VueCountUp } from 'vue-countup-v2'
import type { CountUp } from 'countup.js'

const countUpRef = ref()
const status = ref('Not started')

const onReady = (instance: CountUp) => {
  console.log('Instance ready:', instance)
  status.value = 'Ready'
}

const start = () => {
  countUpRef.value?.start(() => {
    status.value = 'Completed'
  })
}

const pauseResume = () => {
  countUpRef.value?.pauseResume()
  status.value = status.value === 'Paused' ? 'Running' : 'Paused'
}

const reset = () => {
  countUpRef.value?.reset()
  status.value = 'Reset'
}

const update = (value: number) => {
  countUpRef.value?.update(value)
}
</script>

<template>
  <div>
    <VueCountUp
      ref="countUpRef"
      :end-val="5000"
      :delay="-1"
      @ready="onReady"
    />

    <p>Status: {{ status }}</p>

    <div class="controls">
      <button @click="start">Start</button>
      <button @click="pauseResume">Pause/Resume</button>
      <button @click="reset">Reset</button>
      <button @click="update(10000)">Update to 10000</button>
    </div>
  </div>
</template>
```
