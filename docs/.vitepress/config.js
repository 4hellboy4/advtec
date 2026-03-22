import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'LovInIdeas API',
  description: 'API Documentation for LovInIdeas Gift Ideas Platform',
  base: '/advtec/',
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'API Reference', link: '/authentication/registration' },
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
        text: 'Authentication',
        items: [
          { text: 'Registration', link: '/authentication/registration' },
          { text: 'Login', link: '/authentication/login' },
          { text: 'JWT Tokens', link: '/authentication/tokens' }
        ]
      },
      {
        text: 'Ideas',
        items: [
          { text: 'Create', link: '/ideas/create-idea' },
          { text: 'Get', link: '/ideas/get-ideas' },
          { text: 'Search', link: '/ideas/search-ideas' },
          { text: 'Update', link: '/ideas/update-idea' }
        ]
      },
      {
        text: 'Social',
        items: [
          { text: 'Add Comment', link: '/comments/add-comment' },
          { text: 'Get Comments', link: '/comments/get-comments' },
          { text: 'Like', link: '/ratings/like-idea' },
          { text: 'Ratings', link: '/ratings/get-ratings' }
        ]
      },
      {
        text: 'Users',
        items: [
          { text: 'Profile', link: '/users/profile' },
          { text: 'Settings', link: '/users/settings' }
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