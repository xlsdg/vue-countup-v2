import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vue CountUp V2',
  description: 'A CountUp component for Vue 3 with TypeScript support',
  base: '/vue-countup-v2/',

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/installation' },
      { text: 'API', link: '/api/props' },
      { text: 'GitHub', link: 'https://github.com/xlsdg/vue-countup-v2' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Quick Start', link: '/guide/quick-start' },
          { text: 'Examples', link: '/guide/examples' },
        ],
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Props', link: '/api/props' },
          { text: 'Methods', link: '/api/methods' },
          { text: 'Events', link: '/api/events' },
          { text: 'TypeScript', link: '/api/typescript' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xlsdg/vue-countup-v2' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present xLsDg',
    },
  },
})
