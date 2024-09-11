import type { PluginOption } from 'vite'
// import vue from '@vitejs/plugin-vue'

import createComponents from './components'

export default function createVitePlugins(viteEnv, isBuild = false) {
  console.log(isBuild)

  const vitePlugins: PluginOption[] = [
    // vue(),
  ]
  vitePlugins.push(createComponents())
  return vitePlugins
}
