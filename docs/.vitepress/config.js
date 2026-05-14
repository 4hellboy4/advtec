import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'LovInIdeas API',
  description: 'API Documentation for LovInIdeas Gift Ideas Platform',
  base: '/advtec/',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get Started', link: '/02-get-started/quick-start' },
      { text: 'Reference', link: '/04-reference/authentication' },
      { text: 'Support', link: '/06-support/faq' }
    ],

    sidebar: [
      {
        text: '1. Discover',
        collapsed: false,
        items: [
          { text: 'What is LovInIdeas', link: '/01-discover/overview' },
          { text: 'Use cases', link: '/01-discover/use-cases' },
          { text: 'Core concepts', link: '/01-discover/concepts' }
        ]
      },
      {
        text: '2. Get Started',
        collapsed: false,
        items: [
          { text: 'Quick Start', link: '/02-get-started/quick-start' },
          { text: 'Authentication setup', link: '/02-get-started/authentication-setup' },
          { text: 'Your first request', link: '/02-get-started/first-request' }
        ]
      },
      {
        text: '3. Build',
        collapsed: false,
        items: [
          { text: 'Manage ideas', link: '/03-build/manage-ideas' },
          { text: 'Search and discover', link: '/03-build/search-and-discover' },
          { text: 'Social interactions', link: '/03-build/social-interactions' }
        ]
      },
      {
        text: '4. Reference',
        collapsed: false,
        items: [
          { text: 'Authentication', link: '/04-reference/authentication' },
          { text: 'Ideas', link: '/04-reference/ideas' },
          { text: 'Comments', link: '/04-reference/comments' },
          { text: 'Ratings', link: '/04-reference/ratings' },
          { text: 'Users', link: '/04-reference/users' },
          { text: 'Errors', link: '/04-reference/errors' }
        ]
      },
      {
        text: '5. Advanced',
        collapsed: true,
        items: [
          { text: 'Rate limits', link: '/05-advanced/rate-limits' },
          { text: 'Pagination', link: '/05-advanced/pagination' },
          { text: 'Webhooks', link: '/05-advanced/webhooks' },
          { text: 'Best practices', link: '/05-advanced/best-practices' }
        ]
      },
      {
        text: '6. Support',
        collapsed: true,
        items: [
          { text: 'Troubleshooting', link: '/06-support/troubleshooting' },
          { text: 'FAQ', link: '/06-support/faq' },
          { text: 'Changelog', link: '/06-support/changelog' },
          { text: 'Contact', link: '/06-support/contact' }
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
