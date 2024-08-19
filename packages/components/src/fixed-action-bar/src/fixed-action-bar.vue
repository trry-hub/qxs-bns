<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useAttrs } from 'vue'
import { useElementBounding, useElementSize, useParentElement } from '@vueuse/core'
import { useNamespace } from '@qxs-bns/hooks/use-namespace'

defineOptions({
  name: 'QxsFixedActionBar',
})

const props = defineProps({
  padding: {
    type: String,
    default: '8px',
  },
})

const ns = useNamespace('fixed-action-bar')
const attr = useAttrs()
const isBottom = ref(false)
const actionbar = ref<HTMLElement | null>(null)
const placeholderRef = ref<HTMLElement | null>(null)

const parentEl = useParentElement(placeholderRef)
const { height } = useElementSize(actionbar, undefined, { box: 'border-box' })
const { left: placeholderLeft } = useElementBounding(parentEl)
const { width: placeholderParentWidth } = useElementSize(parentEl, undefined, { box: 'border-box' })

function calculateScrollDetails() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  const scrollHeight = document.documentElement.scrollHeight

  isBottom.value = Math.ceil(scrollTop + windowHeight) >= scrollHeight
}

onMounted(() => {
  calculateScrollDetails()
  window.addEventListener('scroll', calculateScrollDetails)
})

onUnmounted(() => {
  window.removeEventListener('scroll', calculateScrollDetails)
})

// 计算属性用于动态计算actionbar的样式
const actionbarStyle = computed(() => ({
  width: `${placeholderParentWidth || 0}px`,
  left: `${placeholderLeft}px`,
  class: `${!isBottom.value ? ns.is('shadow') : ''} ${attr.class || ''}`,
  ...ns.cssVarBlock({
    'actionbar-padding': `${props.padding}`,
  }),
}))
</script>

<template>
  <div ref="placeholderRef" :style="`width: 100%; height: ${height}px`" />
  <div
    ref="actionbar"
    :style="actionbarStyle"
    :class="[actionbarStyle.class, ns.e('actionbar')]"
    data-fixed-calc-width
  >
    <slot />
  </div>
</template>
