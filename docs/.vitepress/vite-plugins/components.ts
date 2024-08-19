import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default function createComponents() {
  return Components({
    // resolvers: [
    //   ElementPlusResolver({
    //     importStyle: false,
    //   }),
    // ],
    // dirs: ['packages/components/src'],
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    dts: '../typings/components.d.ts',
  })
}
