export function toPascalCase(str: string) {
  return str
    .replace(/^\w|[A-Z]|\b\w/g, match => match.toUpperCase())
    .replace(/\s+|_+|-+/g, '') // 去掉空格、下划线和连字符
}

export const packagesPath = {
  componentsPath: './packages/components/src',
  themePath: './packages/theme-chalk/src',
  docs: './docs/guide/components',
  page: './docs/demo',
}
