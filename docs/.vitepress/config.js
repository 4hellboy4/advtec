import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'LovInIdeas API',
  description: 'API Documentation for LovInIdeas Gift Ideas Platform',
  
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
          { text: 'User Registration', link: '/authentication/registration' },
          { text: 'User Login', link: '/authentication/login' },
          { text: 'JWT Tokens', link: '/authentication/tokens' }
        ]
      },
      {
        text: 'Ideas Management',
        items: [
          { text: 'Create Idea', link: '/ideas/create-idea' },
          { text: 'Get Ideas', link: '/ideas/get-ideas' },
          { text: 'Search Ideas', link: '/ideas/search-ideas' },
          { text: 'Update Idea', link: '/ideas/update-idea' }
        ]
      },
      {
        text: 'Social Features',
        items: [
          { text: 'Add Comment', link: '/comments/add-comment' },
          { text: 'Get Comments', link: '/comments/get-comments' },
          { text: 'Like Idea', link: '/ratings/like-idea' },
          { text: 'Get Ratings', link: '/ratings/get-ratings' }
        ]
      },
      {
        text: 'User Management',
        items: [
          { text: 'User Profile', link: '/users/profile' },
          { text: 'User Settings', link: '/users/settings' }
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