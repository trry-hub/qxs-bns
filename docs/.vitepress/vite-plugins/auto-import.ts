import autoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default function createAutoImport() {
  return [
    autoImport({
      imports: [
        'vue',
      ],
      resolvers: [ElementPlusResolver()],
      dts: '../typings/auto-imports.d.ts',
    }),
  ]
}
