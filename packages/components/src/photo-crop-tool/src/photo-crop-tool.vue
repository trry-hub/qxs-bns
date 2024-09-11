<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { PropType } from 'vue'
import { useNamespace } from '@qxs-bns/hooks'
import { useDraggable, useElementSize } from '@vueuse/core'
import { useCanvas } from './composables'

defineOptions({
  name: 'QxsPhotoCropTool',
})

const props = defineProps({
  imgFile: {
    type: Object as PropType<File>,
    default: () => (null),
  },
  aspectRatio: {
    type: String,
    default: () => ('16 / 9'),
  },
  defaultWidth: {
    type: Number,
    default: () => (320),
  },
  defaultHeight: {
    type: Number,
    default: () => (180),
  },
  /**
   * free 自由缩放
   * fixed 固定比例缩放
   */
  zoomType: {
    type: String,
    default: () => ('fixed'),
  },
})
let startX = 0
let startY = 0
let startWidth = 0
let startHeight = 0

const ns = useNamespace('photo-crop-tool')

const cropBoxRef = ref<HTMLElement | null>(null)
const containerBoxRef = ref<HTMLElement | null>(null)
const imgRef = ref<HTMLImageElement | null>(null)

const dargPoint = ref('')
const initialValue = ref({
  x: 0,
  y: 0,
})
const cropInfo = ref({
  width: props.defaultWidth,
  height: props.defaultHeight,
  x: 0,
  y: 0,
})

const { width, height } = useElementSize(cropBoxRef)
const { width: imgWidth } = useElementSize(imgRef)

const { x, y, style } = useDraggable(cropBoxRef, {
  containerElement: containerBoxRef,
  draggingElement: cropBoxRef,
  disabled: computed(() => !!dargPoint.value),
  exact: true,
  initialValue,
})

const imageUrl = computed(() => {
  // blob 转 base64
  if (!props.imgFile) {
    return ''
  }
  return URL.createObjectURL(props.imgFile)
})

const ratio = computed(() => {
  return (imgRef.value?.naturalWidth || 0) / imgWidth.value
})

const customStyle = computed(() => {
  const position = {
    left: 0,
    top: 0,
  }
  if (dargPoint.value === 'bottom-right') {
    position.left = cropInfo.value.x
    position.top = cropInfo.value.y
  }
  else if (dargPoint.value === 'top-left') {
    position.left = cropInfo.value.x - width.value
    position.top = cropInfo.value.y - height.value
  }
  else if (dargPoint.value === 'top-right') {
    position.top = cropInfo.value.y - height.value
    position.left = cropInfo.value.x
  }
  else if (dargPoint.value === 'bottom-left') {
    position.left = cropInfo.value.x - width.value
    position.top = cropInfo.value.y
  }
  return position
})

const sizeStyle = computed(() => {
  const { aspectRatio } = props

  const style: {
    'height'?: string
    'width': string
    'aspect-ratio'?: string
    'top': string
    'left': string
  } = {
    'width': `${cropInfo.value.width || props.defaultWidth}`,
    'height': `${cropInfo.value.height || props.defaultHeight}`,
    'aspect-ratio': aspectRatio,
    'top': `${customStyle.value.top}px`,
    'left': `${customStyle.value.left}px`,
  }
  if (props.zoomType === 'free') {
    delete style['aspect-ratio']
  }
  else if (props.zoomType === 'fixed') {
    delete style.height
  }
  return ns.cssVarBlock(style)
})

function zoom(pixel: number) {
  return pixel * ratio.value
}
async function crop(img: HTMLImageElement = imgRef.value!) {
  let backgroundColor = 'transparent'
  if (containerBoxRef.value) {
    backgroundColor = window.getComputedStyle(containerBoxRef.value).backgroundColor
  }
  const canvas = document.createElement('canvas')
  canvas.width = zoom(containerBoxRef.value?.clientWidth || 0)
  canvas.height = zoom(containerBoxRef.value?.clientHeight || 0)
  const { drawImage, cropCanvas, drawColor } = useCanvas(canvas)
  drawColor(0, 0, canvas.width, canvas.height, backgroundColor)
  drawImage(img, zoom(img.offsetLeft), zoom(img.offsetTop), img.naturalWidth, img.naturalHeight)
  return await cropCanvas(zoom(x.value), zoom(y.value), zoom(width.value), zoom(height.value))
}

function checkBoundaries(newWidth: number, newHeight: number): { width: number, height: number } {
  const maxWidth = containerBoxRef.value?.clientWidth || Infinity
  const maxHeight = containerBoxRef.value?.clientHeight || Infinity

  return {
    width: Math.min(Math.max(newWidth, 0), maxWidth),
    height: Math.min(Math.max(newHeight, 0), maxHeight),
  }
}

function mousemove(e: MouseEvent) {
  const deltaX = e.clientX - startX
  const deltaY = e.clientY - startY

  if (dargPoint.value === 'bottom-right') {
    if (props.zoomType === 'free') {
      const { width, height } = checkBoundaries(startWidth + deltaX, startHeight + deltaY)
      cropInfo.value.width = width
      cropInfo.value.height = height
    }
    else if (props.zoomType === 'fixed') {
      const aspectRatio = Number.parseFloat(props.aspectRatio.split(' / ')[0]) / Number.parseFloat(props.aspectRatio.split(' / ')[1])
      let newWidth = startWidth + deltaX
      let newHeight = newWidth / aspectRatio
      const { width, height } = checkBoundaries(newWidth, newHeight)
      if (height > (containerBoxRef.value?.clientHeight || Infinity)) {
        newHeight = containerBoxRef.value?.clientHeight || Infinity
        newWidth = newHeight * aspectRatio
      }
      cropInfo.value.width = width
      cropInfo.value.height = height
    }
  }
  else if (dargPoint.value === 'top-left') {
    if (props.zoomType === 'free') {
      const { width, height } = checkBoundaries(startWidth - deltaX, startHeight - deltaY)
      cropInfo.value.width = width
      cropInfo.value.height = height
    }
    else if (props.zoomType === 'fixed') {
      const aspectRatio = Number.parseFloat(props.aspectRatio.split(' / ')[0]) / Number.parseFloat(props.aspectRatio.split(' / ')[1])
      let newWidth = startWidth - deltaX
      let newHeight = newWidth / aspectRatio
      const { width, height } = checkBoundaries(newWidth, newHeight)
      if (height > (containerBoxRef.value?.clientHeight || Infinity)) {
        newHeight = containerBoxRef.value?.clientHeight || Infinity
        newWidth = newHeight * aspectRatio
      }
      cropInfo.value.width = width
      cropInfo.value.height = height
    }
    x.value = customStyle.value.left
    y.value = customStyle.value.top
  }
  else if (dargPoint.value === 'top-right') {
    if (props.zoomType === 'free') {
      const { width, height } = checkBoundaries(startWidth + deltaX, startHeight - deltaY)
      cropInfo.value.width = width
      cropInfo.value.height = height
    }
    else if (props.zoomType === 'fixed') {
      const aspectRatio = Number.parseFloat(props.aspectRatio.split(' / ')[0]) / Number.parseFloat(props.aspectRatio.split(' / ')[1])
      let newWidth = startWidth + deltaX
      let newHeight = newWidth / aspectRatio
      const { width, height } = checkBoundaries(newWidth, newHeight)
      if (height > (containerBoxRef.value?.clientHeight || Infinity)) {
        newHeight = containerBoxRef.value?.clientHeight || Infinity
        newWidth = newHeight * aspectRatio
      }
      cropInfo.value.width = width
      cropInfo.value.height = height
    }
    x.value = customStyle.value.left
    y.value = customStyle.value.top
  }
  else if (dargPoint.value === 'bottom-left') {
    if (props.zoomType === 'free') {
      const { width, height } = checkBoundaries(startWidth - deltaX, startHeight + deltaY)
      cropInfo.value.width = width
      cropInfo.value.height = height
    }
    else if (props.zoomType === 'fixed') {
      const aspectRatio = Number.parseFloat(props.aspectRatio.split(' / ')[0]) / Number.parseFloat(props.aspectRatio.split(' / ')[1])
      let newWidth = startWidth - deltaX
      let newHeight = newWidth / aspectRatio
      const { width, height } = checkBoundaries(newWidth, newHeight)
      if (height > (containerBoxRef.value?.clientHeight || Infinity)) {
        newHeight = containerBoxRef.value?.clientHeight || Infinity
        newWidth = newHeight * aspectRatio
      }
      cropInfo.value.width = width
      cropInfo.value.height = height
    }
    x.value = customStyle.value.left
    y.value = customStyle.value.top
  }
  e.preventDefault()
  e.stopPropagation()
}

function mousedown(e: MouseEvent, point: string) {
  dargPoint.value = point
  startX = e.clientX
  startY = e.clientY
  startWidth = cropInfo.value.width
  startHeight = cropInfo.value.height

  if (point === 'bottom-right') {
    cropInfo.value.x = x.value
    cropInfo.value.y = y.value
  }
  else if (point === 'top-left') {
    cropInfo.value.x = x.value + width.value
    cropInfo.value.y = y.value + height.value
  }
  else if (point === 'top-right') {
    cropInfo.value.x = x.value
    cropInfo.value.y = y.value + height.value
  }
  else if (point === 'bottom-left') {
    cropInfo.value.x = x.value + width.value
    cropInfo.value.y = y.value
  }
}

function mouseup() {
  dargPoint.value = ''
}

function resize() {
  cropInfo.value.width = props.defaultWidth
  cropInfo.value.height = props.defaultHeight
  x.value = 0
  y.value = 0
}

document.addEventListener('mouseup', mouseup)
document.addEventListener('mousemove', mousemove)

onMounted(() => {
  nextTick(() => {
    // 初始化位置
    initialValue.value.x = (containerBoxRef.value?.offsetWidth || 0) / 2 - cropInfo.value.width / 2
    initialValue.value.y = (containerBoxRef.value?.offsetHeight || 0) / 2 - cropInfo.value.height / 2
  })
})

onUnmounted(() => {
  if (imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value)
  }
  document.removeEventListener('mouseup', mouseup)
  document.removeEventListener('mousemove', mousemove)
})

defineExpose({
  crop,
  resize,
})
</script>

<template>
  <div
    ref="containerBoxRef"
    :class="[ns.e('img-box')]"
  >
    <img
      ref="imgRef"
      :class="[ns.e('image')]"
      :src="imageUrl"
    >
    <div
      ref="cropBoxRef"
      :class="[ns.e('crop-tool-box')]"
      :style="[sizeStyle, dargPoint ? `left: ${customStyle.left}px;top: ${customStyle.top}px` : style]"
    >
      <div :class="[ns.e('top-left')]" @mousedown="mousedown($event, 'top-left')" />
      <div :class="[ns.e('top-right')]" @mousedown="mousedown($event, 'top-right')" />
      <div :class="[ns.e('bottom-right')]" @mousedown="mousedown($event, 'bottom-right')" />
      <div :class="[ns.e('bottom-left')]" @mousedown="mousedown($event, 'bottom-left')" />
    </div>
  </div>
</template>
