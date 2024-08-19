import process from 'node:process'
import { toPascalCase } from '../index'

export function createIndexTemplate(compName: string) {
  const prefix = toPascalCase(process.env.COMPONENT_NAME ?? '')
  const originName = compName
  compName = compName[0].toUpperCase() + compName.slice(1)
  const name = `${prefix}${toPascalCase(compName)}`
  return `import component from './src/${originName}.vue'
import { withInstall } from '../../../utils/withInstall'
  
const ${name} = withInstall(component)
  
export {
  ${name}
}
  
export default ${name}`
}

export function createVueTemplate(compName: string) {
  const prefix = toPascalCase(process.env.COMPONENT_NAME ?? '')
  const name = `${prefix}${toPascalCase(compName)}`
  return `<script setup lang="ts">
defineOptions({
  name: '${name}'
})
</script>
  
<template>
  <div>
    ${name}
  </div>
</template>`
}

export function createStyleTemplate(compName: string) {
  return `import '../../base/style'
import '../../../../theme-chalk/src/${compName}.scss'`
}

// 创建主题样式
export function createThemeTemplate(compName: string) {
  return `${compName}`
}
