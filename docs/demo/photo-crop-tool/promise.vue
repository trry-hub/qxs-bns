<script setup lang="ts">
import { h, onBeforeUnmount, ref } from 'vue'
import type { UploadRawFile } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import { QxsPhotoCropTool } from '../../../packages/components/src'

const photoCropToolRef = ref()
const imgUrl = ref()

async function beforeUpload(file: UploadRawFile) {
  try {
    await ElMessageBox({
      message: () => h('div', {
        style: {
          width: '400px',
          height: '300px',
        },
      }, [
        h(QxsPhotoCropTool, {
          imgFile: file,
          ref: e => photoCropToolRef.value = e,
        }),
      ]),
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
    })
    const cropFile = await photoCropToolRef.value.crop()
    imgUrl.value = URL.createObjectURL(cropFile)
    return cropFile
  }
  catch (error) {
    console.log(error)
    return false
  }
}

// 在组件卸载前释放对象 URL
onBeforeUnmount(() => {
  if (imgUrl.value) {
    URL.revokeObjectURL(imgUrl.value)
  }
})
</script>

<template>
  <div>
    <el-upload
      class="upload-demo"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      :before-upload="beforeUpload"
    >
      <template #trigger>
        <el-button type="primary">
          select file
        </el-button>
      </template>
    </el-upload>
    <img :src="imgUrl" alt="">
  </div>
</template>
