import fs from 'node:fs/promises' // 使用 promises API
import { resolve } from 'node:path'
import { rootPath } from './path'

const stayFile = ['package.json', 'README.md']

export async function delPath(path: string) {
  try {
    const files = await fs.readdir(path)

    // 使用 for...of 循环处理文件和目录
    for (const file of files) {
      const currentPath = resolve(path, file)
      const stats = await fs.stat(currentPath)

      if (stats.isDirectory()) {
        // 递归删除子目录
        if (file !== 'node_modules') {
          await delPath(currentPath)
        }
      }
      else {
        // 删除文件
        if (!stayFile.includes(file)) {
          await fs.unlink(currentPath)
        }
      }
    }

    // 在删除目录之前，确保它是空的
    if (path !== `${rootPath}/dist`) {
      await fs.rm(path, { recursive: true })
    }
  }
  catch (error) {
    console.error(`Error processing path ${path}:`, error)
  }
}
