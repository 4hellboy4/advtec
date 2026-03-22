import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'LovInIdeas API',
  description: 'API Documentation for LovInIdeas Gift Ideas Platform',
  base: '/advtec/',
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'API Reference', link: '/authentication' },
      { text: 'Examples', link: '/examples/quick-start' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'API Overview', link: '/' },
          { text: 'Quick Start', link: '/examples/quick-start' }
        ]
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Authentication', link: '/authentication' },
          { text: 'Gift Ideas', link: '/ideas' },
          { text: 'Comments', link: '/comments' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/4hellboy4/dev-sec-ops-test' }
    ],

    footer: {
      message: 'LovInIdeas API Documentation',
      copyright: 'Copyright © 2026'
    }
  }
})