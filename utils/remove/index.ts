import fs from 'node:fs'
import process from 'node:process'
import path from 'node:path'
import chalk from 'chalk'
import { packagesPath } from '..'

const componentsPaths = [
  `${packagesPath.themePath}/$_$.scss`,
  `${packagesPath.componentsPath}/$_$`,
  `${packagesPath.page}/$_$`,
  `${packagesPath.docs}/$_$.md`,
]

function deletePath(pathToDelete: string) {
  try {
    if (fs.lstatSync(pathToDelete).isDirectory()) {
      // 是文件夹
      fs.rmSync(pathToDelete, { recursive: true, force: true })
      console.log(`文件夹 ${pathToDelete} 及其内容已被成功删除`)
    }
    else {
      // 是文件
      fs.unlinkSync(pathToDelete)
      console.log(`文件 ${pathToDelete} 已被成功删除`)
    }
  }
  catch (err) {
    console.error(`删除 ${pathToDelete} 失败:`, err)
  }
}

function updateScssFile(command: string) {
  const filePath = path.join(`${packagesPath.themePath}/index.scss`)
  try {
    // 读取文件内容
    const data = fs.readFileSync(filePath, 'utf8')
    // 替换文本
    const oldText = `@use './${command}.scss';`
    const updatedData = data.replace(oldText, '').trim()
    console.log('oldText: ', oldText)
    console.log('updatedData: ', updatedData)

    // 写入更新后的内容回文件
    fs.writeFileSync(filePath, updatedData, 'utf8')
    console.log('SCSS 文件已成功更新')
  }
  catch (err) {
    console.error('更新 SCSS 文件失败:', err)
  }
}
function updateComponentsFile(command: string) {
  const filePath = path.join('./packages/components/src/components.ts')
  try {
    // 读取文件内容
    const data = fs.readFileSync(filePath, 'utf8')
    // 替换文本
    const oldText = `export * from './${command}/index';`
    const updatedData = data.replace(oldText, '')

    // 写入更新后的内容回文件
    fs.writeFileSync(filePath, updatedData, 'utf8')
    console.log('components.ts 文件已成功更新')
  }
  catch (err) {
    console.error('更新 components.ts 文件失败:', err)
  }
}

function remove() {
  const commands = process.argv.slice(2)

  if (commands.length === 0) {
    console.log(chalk.red('缺少必要参数'))
    return
  }

  for (const command of commands) {
    let found = false

    for (const prefix of componentsPaths) {
      const targetPath = prefix.replace('$_$', command)
      if (fs.existsSync(targetPath)) {
        found = true
        deletePath(targetPath)
      }
    }

    if (!found) {
      console.log(chalk.red(`${command} 不存在`))
    }
    // 删除 scss 内容
    updateScssFile(command)
    updateComponentsFile(command)
  }
}

remove()
