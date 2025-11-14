# Installation

## Prerequisites

- Node.js >= 18
- Vue >= 3.3.0

## Package Manager

Install `vue-countup-v2` and its peer dependency `countup.js`:

::: code-group

```bash [npm]
npm install vue-countup-v2 countup.js
```

```bash [pnpm]
pnpm add vue-countup-v2 countup.js
```

```bash [yarn]
yarn add vue-countup-v2 countup.js
```

```bash [bun]
bun add vue-countup-v2 countup.js
```

:::

## CDN

You can also use Vue CountUp V2 via CDN:

```html
<!-- Import Vue 3 -->
<script src="https://unpkg.com/vue@3"></script>

<!-- Import CountUp.js -->
<script src="https://unpkg.com/countup.js@2"></script>

<!-- Import Vue CountUp V2 -->
<script src="https://unpkg.com/vue-countup-v2@5"></script>
```

When using via CDN, the component is available as `window.VueCountUp`.

## Version Compatibility

| Vue CountUp V2 | Vue    | CountUp.js |
| -------------- | ------ | ---------- |
| 5.x            | ^3.3.0 | ^2.0.0     |
| 4.x            | ^2.6.0 | latest     |

::: warning Breaking Changes
Version 5.0.0 is a major rewrite with breaking changes:

- Vue 2 is no longer supported
- Minimum Node.js version is now 18
- Migrated to TypeScript
- Uses Composition API

If you're using Vue 2, please stick with version 4.x.
:::

## Next Steps

Once installed, head over to the [Quick Start](/guide/quick-start) guide to learn how to use Vue CountUp V2 in your project.
