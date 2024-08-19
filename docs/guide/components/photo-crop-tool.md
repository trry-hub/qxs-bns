---
sider_text="photo-crop-tool"
---

# photo-crop-tool

demo 是一个固定在底部的容器，常用于页面底部的按钮组。
已添加移动端 小白条适配

### 示例

#### 基础使用
<preview path="../../demo/photo-crop-tool/default.vue" title="基础使用" description="component description content"></preview>

#### js 调用方法
<preview path="../../demo/photo-crop-tool/promise.vue" title="使用js调用" description="使用promise"></preview>

### 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| imgFile | 图片文件 | File | - |
| aspectRatio | 宽高比 | string | 16 / 9 |
| defaultWidth | 默认宽度 | number | 320 |
| defaultHeight | 默认高度 | number | 180 |
| zoomType | 缩放类型 | string | fixed / free |

### 方法

| 方法    | 说明     | 参数 |
| ------- | -------- | ---- |
| crop | 剪切图片 | file：处理后的图片    |

### 插槽
| 插槽名 | 说明 |
| --- | --- |
| - | - |
