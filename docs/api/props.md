# Props

## endVal

- **Type:** `number`
- **Required:** `true`
- **Description:** The target number to count to

```vue
<VueCountUp :end-val="1000" />
```

The component will automatically update and animate to the new value when `endVal` changes.

## delay

- **Type:** `number`
- **Default:** `0`
- **Description:** Delay in milliseconds before starting the animation

```vue
<!-- Start immediately (default) -->
<VueCountUp :end-val="1000" :delay="0" />

<!-- Wait 1 second before starting -->
<VueCountUp :end-val="1000" :delay="1000" />

<!-- Negative value prevents auto-start -->
<VueCountUp :end-val="1000" :delay="-1" />
```

::: tip
Use a negative value (e.g., `-1`) to prevent the animation from auto-starting. You can then manually control the animation using the component's methods.
:::

## options

- **Type:** `CountUpOptions`
- **Required:** `false`
- **Description:** Configuration options passed to CountUp.js

```vue
<script setup lang="ts">
import type { CountUpOptions } from 'countup.js'

const options: CountUpOptions = {
  startVal: 0,
  duration: 2.5,
  decimalPlaces: 2,
  useEasing: true,
  useGrouping: true,
  separator: ',',
  decimal: '.',
  prefix: '$',
  suffix: '',
  numerals: [],
  // ... and more
}
</script>

<template>
  <VueCountUp :end-val="9999.99" :options="options" />
</template>
```

### Available CountUp.js Options

| Option          | Type       | Default | Description                                    |
| --------------- | ---------- | ------- | ---------------------------------------------- |
| `startVal`      | `number`   | `0`     | Number to start from                           |
| `duration`      | `number`   | `2`     | Animation duration in seconds                  |
| `decimalPlaces` | `number`   | `0`     | Number of decimal places to show               |
| `useEasing`     | `boolean`  | `true`  | Enable easing animation                        |
| `useGrouping`   | `boolean`  | `true`  | Use grouping (e.g., 1,000 vs 1000)             |
| `separator`     | `string`   | `','`   | Grouping separator                             |
| `decimal`       | `string`   | `'.'`   | Decimal separator                              |
| `prefix`        | `string`   | `''`    | Text prepended to result                       |
| `suffix`        | `string`   | `''`    | Text appended to result                        |
| `numerals`      | `string[]` | `[]`    | Custom numeral glyphs (e.g., Arabic numerals)  |
| `formattingFn`  | `Function` | `null`  | Custom function to format the number           |
| `easingFn`      | `Function` | `null`  | Custom easing function for animation           |
| `plugin`        | `Function` | `null`  | Plugin function for additional functionality   |

::: info
For a complete list of options and detailed documentation, refer to the [CountUp.js documentation](https://github.com/inorganik/CountUp.js#options).
:::

## Examples

### Currency Format

```vue
<VueCountUp
  :end-val="1234.56"
  :options="{
    prefix: '$',
    decimalPlaces: 2,
    separator: ',',
  }"
/>
<!-- Output: $1,234.56 -->
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

### Custom Duration

```vue
<VueCountUp
  :end-val="10000"
  :options="{
    duration: 5,
    useEasing: true,
  }"
/>
<!-- Animates over 5 seconds -->
```

### No Grouping

```vue
<VueCountUp
  :end-val="1000000"
  :options="{
    useGrouping: false,
  }"
/>
<!-- Output: 1000000 instead of 1,000,000 -->
```
