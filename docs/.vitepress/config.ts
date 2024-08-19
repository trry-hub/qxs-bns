import process from 'node:process'
import { defineConfig, loadEnv } from 'vitepress'
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin'
import { sidebar } from './config/sidebar'
import createVitePlugins from './vite-plugins'

export default async ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    title: `qxs-bns`,
    description: 'qxs-bns',
    base: '/qxs-bns/',
    head: [
      ['link', { rel: 'icon', type: 'image/svg+xml', href: 'logo.svg' }],
    ],

    themeConfig: {
      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2023-present The Muse Catcher',
      },

      nav: [
        { text: '组件', link: '/guide/features', activeMatch: '/guide/' },
        {
          text: '链接',
          items: [
            { text: 'Github', link: 'https://github.com/trry-hub/qxs-bns' },
            {
              items: [
                {
                  text: 'vue',
                  link: 'https://cn.vuejs.org/',
                },
                {
                  text: 'vitepress',
                  link: 'https://vitepress.dev/',
                },
              ],
            },
          ],
        },
      ],
      sidebar,
    },
    vite: {
      plugins: createVitePlugins(env, command === 'build'),
    },
    markdown: {
      config(md) {
        md.use(containerPreview)
        md.use(componentPreview)
      },
    },
  })
}
