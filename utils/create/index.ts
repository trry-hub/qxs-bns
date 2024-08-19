import process from 'node:process'
import chalk from 'chalk'
import { packagesPath } from '../index.ts'
import { createComponent } from '../createComponent/create.ts'
import { createPage } from '../createTestVue/createPage.ts'
import { createVitepressComp } from '../createVitepressComp/create.ts'

const componentsPath = packagesPath.componentsPath

function create() {
  const commands = process.argv.splice(2)

  if (commands.length === 0) {
    console.log(chalk.red('缺少必要参数'))
    return
  }
  for (const item of commands) {
    createComponent(componentsPath, item)
    createVitepressComp(item)
  }
  createPage(commands)
}

create()
