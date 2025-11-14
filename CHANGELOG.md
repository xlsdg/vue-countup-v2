# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.0.0] - 2025-01-XX

### 🚨 BREAKING CHANGES

#### Vue 3 Migration

- **Dropped Vue 2 support** - Project now requires Vue 3.3.0 or higher
- Migrated from Options API to Composition API with `<script setup>`
- Component now uses `ref` and `onMounted`/`onBeforeUnmount` lifecycle hooks

#### TypeScript Rewrite

- Complete rewrite in TypeScript with full type definitions
- All props, methods, and events are now fully typed
- Exported type interfaces: `VueCountUpProps`, `VueCountUpEmits`

#### Build System

- **Replaced Bili with Vite** for faster builds and better DX
- Changed build output format:
  - ES Module: `dist/countup.es.js`
  - UMD: `dist/countup.umd.js`
  - Type definitions: `dist/countup.d.ts`
- Added proper `exports` field in package.json for modern Node.js compatibility

#### Node.js Requirements

- **Minimum Node.js version is now 18.0.0** (was 8.0.0)
- Minimum npm version is now 9.0.0 (was 5.0.0)

#### Package Dependencies

- CountUp.js peer dependency changed from `latest` to `^2.0.0`
- Vue peer dependency changed from `latest` to `^3.3.0`

#### Import Changes

```diff
// Old (v4.x)
- import ICountUp from 'vue-countup-v2'

// New (v5.x)
+ import { VueCountUp } from 'vue-countup-v2'
+ import type { VueCountUpProps } from 'vue-countup-v2'
```

#### Component Usage

```diff
// Old (v4.x) - Vue 2
<template>
-  <ICountUp :endVal="1000" @ready="onReady" />
</template>

<script>
- export default {
-   data() {
-     return { endVal: 1000 }
-   }
- }
</script>

// New (v5.x) - Vue 3
<template>
+  <VueCountUp :end-val="1000" @ready="onReady" />
</template>

<script setup lang="ts">
+ const endVal = ref(1000)
</script>
```

### ✨ Added

#### Features

- **Full TypeScript support** with complete type definitions
- **Modern build system** using Vite for better performance
- **Comprehensive test suite** using Vitest
- **Complete documentation** site built with VitePress
- **GitHub Actions CI/CD** workflows for automated testing and releases
- **ESLint 9** with flat config format
- **Prettier 3** for code formatting
- **Husky 9** for git hooks

#### Developer Experience

- Hot module replacement (HMR) during development
- Faster build times with Vite
- Better error messages with TypeScript
- Auto-generated type definitions
- Improved IDE autocomplete support

#### Documentation

- New documentation website with VitePress
- Interactive examples and demos
- Comprehensive API reference
- Migration guide from v4 to v5
- TypeScript usage examples

#### Testing

- Unit tests with Vitest
- Component tests with @vue/test-utils
- Coverage reporting
- CI/CD integration

### 🔧 Changed

#### Component API

- Prop names now use kebab-case in templates: `endVal` → `end-val`
- Methods are now exposed via `defineExpose`
- Lifecycle hooks use Vue 3 Composition API

#### Development Workflow

- Switched to pnpm as recommended package manager
- Updated all development dependencies to latest versions
- Modernized ESLint configuration (flat config)
- Improved git commit message validation with commitlint

#### Build Output

- Source maps are now generated for all builds
- Better tree-shaking support
- Smaller bundle sizes
- Proper UMD global variable naming

### 🗑️ Removed

- Removed Vue 2 support
- Removed Bili build tool
- Removed babel-eslint (replaced with typescript-eslint)
- Removed old ESLint configuration format
- Removed JSDoc comments (replaced with TypeScript types)
- Removed `.vue` extension requirement for imports

### 📦 Dependencies

#### Runtime

- `vue`: ^3.4.27 (peer)
- `countup.js`: ^2.8.0 (peer)

#### Development

- `@vitejs/plugin-vue`: ^5.0.5
- `typescript`: ^5.4.5
- `vite`: ^5.2.12
- `vitest`: ^1.6.0
- `vitepress`: ^1.2.3
- `eslint`: ^9.4.0
- `prettier`: ^3.3.1
- `husky`: ^9.0.11

### 🔄 Migration Guide

#### 1. Update Dependencies

```bash
# Remove old version
npm uninstall vue-countup-v2

# Install new version with Vue 3
npm install vue@^3.3.0 vue-countup-v2@^5.0.0 countup.js@^2.0.0
```

#### 2. Update Imports

```typescript
// Before
import ICountUp from 'vue-countup-v2'

// After
import { VueCountUp } from 'vue-countup-v2'
import type { VueCountUpProps } from 'vue-countup-v2' // For TypeScript
```

#### 3. Update Component Usage

```vue
<!-- Before (Vue 2) -->
<ICountUp :endVal="1000" />

<!-- After (Vue 3) -->
<VueCountUp :end-val="1000" />
```

#### 4. Update Script Section

```vue
<!-- Before (Vue 2 Options API) -->
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<!-- After (Vue 3 Composition API) -->
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>
```

### 📝 Notes

- This is a **major version** with breaking changes
- Version 4.x will continue to be available for Vue 2 users
- Minimum Node.js version is now 18 (active LTS)
- Full documentation available at <https://xlsdg.github.io/vue-countup-v2/>

---

## [4.0.0] - 2021-03-XX

### Changed

- Updated dependencies
- Code refactoring

## [3.0.1] - 2020-XX-XX

### Fixed

- Constructor error fixes

## Earlier Versions

See [GitHub releases](https://github.com/xlsdg/vue-countup-v2/releases) for older versions.

[5.0.0]: https://github.com/xlsdg/vue-countup-v2/compare/v4.0.0...v5.0.0
[4.0.0]: https://github.com/xlsdg/vue-countup-v2/compare/v3.0.1...v4.0.0
[3.0.1]: https://github.com/xlsdg/vue-countup-v2/releases/tag/v3.0.1
