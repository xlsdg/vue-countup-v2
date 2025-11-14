---
layout: home

hero:
  name: Vue CountUp V2
  text: Animated Number Counter
  tagline: A CountUp component for Vue 3 with full TypeScript support
  actions:
    - theme: brand
      text: Get Started
      link: /guide/installation
    - theme: alt
      text: View on GitHub
      link: https://github.com/xlsdg/vue-countup-v2

features:
  - icon: ⚡️
    title: Vue 3 Powered
    details: Built with Vue 3 Composition API for optimal performance and modern development experience.

  - icon: 🔷
    title: TypeScript First
    details: Written in TypeScript with complete type definitions for enhanced developer experience.

  - icon: 🎯
    title: Simple & Flexible
    details: Easy to use with sensible defaults, yet highly customizable through CountUp.js options.

  - icon: 📦
    title: Lightweight
    details: Small bundle size with tree-shaking support. Zero dependencies except Vue and CountUp.js.

  - icon: 🎨
    title: Customizable
    details: Full access to CountUp.js options for formatting, duration, decimals, and more.

  - icon: ♿️
    title: Accessible
    details: Implements best practices for accessibility with proper ARIA attributes.
---

## Quick Example

```vue
<script setup lang="ts">
import { VueCountUp } from 'vue-countup-v2'
</script>

<template>
  <VueCountUp :end-val="1000" :duration="2.5" />
</template>
```

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
