import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { dest, parallel, series, src } from 'gulp'
import gulpSass from 'gulp-sass'
import autoPrefixer from 'gulp-autoprefixer'
import sassLang from 'sass'
import { name } from '../../package.json'
import { delPath } from './del'
import run from './run'
import '../../config/env.ts'

const distPath = path.resolve(__dirname, '../../dist')
const componentPath = path.resolve(__dirname, '../../packages/components')
const themePath = path.resolve(__dirname, '../../packages/theme-chalk')

export function removeDist() {
  return delPath(distPath)
}

const sass = gulpSass(sassLang)

function cssType() {
  const CSS_PREPROCESSOR = process.env.CSS_PREPROCESSOR ?? 'scss'
  if (CSS_PREPROCESSOR === 'scss') {
    return sass
  }
  return sass
}
function createPackageJson(outputPath: string) {
  // 确保输出目录存在
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true })
  }

  const packageJson = {
    name,
    version: '0.0.0-dev.1',
    description: 'A Component Library for Vue 3',
    keywords: [
      'vue',
      'component',
      'library',
      'ui',
      'vue3',
    ],
    homepage: 'https://your-homepage-url.com/',
    bugs: {
      url: 'https://github.com/your-repo/issues',
    },
    license: 'MIT',
    main: 'lib/index.js',
    module: 'es/index.js',
    types: 'es/index.d.ts',
    exports: {
      '.': {
        types: './es/index.d.ts',
        import: './es/index.js',
        require: './lib/index.js',
      },
      './es': {
        types: './es/index.d.ts',
        import: './es/index.js',
      },
      './lib': {
        types: './lib/index.d.ts',
        require: './lib/index.js',
      },
      './*': './*',
    },
    repository: {
      type: 'git',
      url: 'git+https://github.com/your-repo.git',
    },
    publishConfig: {
      access: 'public',
    },
    sideEffects: [
      'dist/*',
    ],
    peerDependencies: {
      vue: '^3.2.0',
    },
    dependencies: {
      // 在此添加组件的依赖
    },
    devDependencies: {
      // 在此添加开发依赖
    },
  }

  const packageJsonPath = path.join(outputPath, 'package.json')

  // 检查文件是否存在，如果存在，删除它
  if (fs.existsSync(packageJsonPath)) {
    fs.unlinkSync(packageJsonPath)
  }

  // 创建新的 package.json 文件
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
}

export function buildStyle() {
  return src(`${themePath}/src/**`)
    .pipe(cssType()())
    .pipe(autoPrefixer())
    .pipe(dest(`${distPath}/lib`))
    .pipe(dest(`${distPath}/es`))
}

export async function buildComponent() {
  run('pnpm run build', componentPath)
}

export default series(
  async () => removeDist(),
  parallel(
    async () => buildStyle(),
    async () => buildComponent(),
    async () => createPackageJson(distPath),
  ),
)
