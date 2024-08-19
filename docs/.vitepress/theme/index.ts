import DefaultTheme from 'vitepress/theme'
import './style/index.scss'
import { ElementPlusContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 全局引入组件库（开发环境）
import QxsBusiness from '../../../packages/components/src/index'
import '../../../packages/theme-chalk/src/index.scss'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(QxsBusiness)
    app.use(ElementPlus)
    app.component('demo-preview', ElementPlusContainer)
  },
}
