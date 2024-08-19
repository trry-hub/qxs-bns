import fs from 'node:fs'
import process from 'node:process'
import '../../config/env.ts'
import { packagesPath, toPascalCase } from '../index.ts'

const pagesPath = packagesPath.page

export function createTemplate(compName: string) {
  const css = process.env.CSS_PREPROCESSOR
  const COMPONENT_NAME = process.env.COMPONENT_NAME ?? ''
  const name = toPascalCase(COMPONENT_NAME) + toPascalCase(compName)
  return `<script setup lang="ts">

</script>

<template>
  <div>
    <${name} />
  </div>
</template>

<style scoped lang="${css}">

</style>
`
}

export function createPage(commands: any[]) {
  for (let i = 0; i < commands.length; i++) {
    const template = createTemplate(commands[i])
    const path = `${pagesPath}/${commands[i]}`
    const target = `${path}.vue`

    fs.mkdir(path, {
      recursive: true,
    }, (err) => {
      if (!err) {
        fs.writeFile(target, template, (err) => {
          if (!err) {
            console.log('新测试组件生成完成，位置:', target)
          }
          else {
            console.log('新测试组件生成错误', err)
          }
        })
      }
      else {
        console.log('创建测试组件失败', err)
      }
    })
  }
}
