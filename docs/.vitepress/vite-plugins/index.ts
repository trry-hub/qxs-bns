import type { PluginOption } from 'vite'
// import vue from '@vitejs/plugin-vue'

import createAutoImport from './auto-import'
import createComponents from './components'

export default function createVitePlugins(viteEnv, isBuild = false) {
  console.log(isBuild)

  const vitePlugins: (PluginOption | PluginOption[])[] = [
  ]
  vitePlugins.push(...createAutoImport())
  vitePlugins.push(createComponents())
  return vitePlugins
}
