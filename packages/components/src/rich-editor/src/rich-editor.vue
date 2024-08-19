<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, onMounted, ref } from 'vue'
import { useColorMode } from '@vueuse/core'
import tinymce from 'tinymce/tinymce'
import TinymceEditor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default/icons'
import 'tinymce/models/dom'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/image'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/table'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/code'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/nonbreaking'

import { useNamespace } from '@qxs-bns/hooks/use-namespace'

defineOptions({
  name: 'QxsRichEditor',
})

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  uploadUrl: {
    type: Object as PropType<{ url: string, method: string }>,
    default: () => ({
      method: 'POST',
      url: '/common/v1/upload-image',
    }),
  },
  classify: {
    type: Number,
    default: 116,
  },
  uploadHeader: {
    type: Object as PropType<HeadersInit>,
    default: () => (null),
  },
})

const emit = defineEmits(['update:modelValue'])

const ns = useNamespace('rich-editor')

const colorScheme = useColorMode()

const defaultSetting = ref({
  selector: 'textarea#tiny-mce-textarea',
  language_url: `tinymce/langs/zh-Hans.js`,
  license_key: 'gpl',
  language: 'zh-Hans',
  skin_url: (colorScheme.value === 'light' ? 'tinymce/skins/ui/oxide' : 'tinymce/skins/ui/oxide-dark'),
  content_css: (colorScheme.value === 'light' ? 'tinymce/skins/content/default/content.min.css' : 'tinymce/skins/content/dark/content.min.css'),
  min_height: 250,
  max_height: 600,
  plugins: 'autolink autoresize fullscreen image insertdatetime link lists media preview table wordcount code searchreplace nonbreaking',
  toolbar: 'undo redo | bold italic underline strikethrough | blocks | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor removeformat | link image media table insertdatetime searchreplace | preview code',
  branding: false,
  autoresize: true,
  menubar: false,
  nonbreaking_force_tab: true,
  toolbar_mode: 'sliding',
  insertdatetime_formats: [
    '%Y年%m月%d日',
    '%H点%M分%S秒',
    '%Y-%m-%d',
    '%H:%M:%S',
  ],
  // https://www.tiny.cloud/docs/tinymce/6/file-image-upload/#images_upload_handler
  images_upload_handler: async (blobInfo: any) => {
    try {
      // 获取文件
      const file: Blob = blobInfo.blob()
      const formData: FormData = new FormData()
      formData.append('image', file)

      // 发起请求
      const response = await fetch(`/proxy${props.uploadUrl.url}?bucketType=${props.classify}`, {
        method: props.uploadUrl.method,
        body: formData,
        headers: props.uploadHeader,
      })

      // 检查响应状态
      if (!response.ok) {
        throw new Error(`上传失败，状态码: ${response.status}`)
      }

      // 处理响应
      const { data } = await response.json() // 获取 JSON 响应

      // 检查响应数据
      if (!data || !data.normal) {
        throw new Error('上传失败，未收到有效响应')
      }

      const { normal } = data
      return normal
    }
    catch (error) {
      const errorMessage = error instanceof Error ? error.message : '上传出现错误'
      return errorMessage
    }
  },
})

const content = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

onMounted(() => {
  tinymce.init(defaultSetting)
})
</script>

<template>
  <div :class="[ns.e('tiny-mce')]">
    <TinymceEditor v-model="content" :init="defaultSetting" />
  </div>
</template>
