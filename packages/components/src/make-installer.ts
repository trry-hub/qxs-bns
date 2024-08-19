import type { Plugin } from 'vue'
import { version } from '../package.json'

function makeInstaller(components: {
  [key in number]: Plugin
}) {
  const install = (app: any) => {
    for (const n in components) {
      app.use((components as any)[n])
    }
  }
  return {
    version,
    install,
  }
}

export { makeInstaller }
