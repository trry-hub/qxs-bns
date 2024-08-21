<script setup lang="ts">
import type { UploadFile } from 'element-plus'

const imgFile = ref<File | null>(null)

const photoCropToolRef = ref()
const imgUrl = ref()

function beforeUpload(file: UploadFile) {
  imgFile.value = file.raw!
}

async function crop() {
  const file = await photoCropToolRef.value.crop()
  imgUrl.value = URL.createObjectURL(file)
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
      :auto-upload="false"
      :on-change="beforeUpload"
    >
      <template #trigger>
        <el-button type="primary">
          select file
        </el-button>
      </template>
    </el-upload>
    <div style="width: 400px;height: 300px;">
      <QxsPhotoCropTool ref="photoCropToolRef" :img-file="imgFile" />
    </div>
    <el-button @click="crop">
      裁剪
    </el-button>
    <img :src="imgUrl" alt="">
  </div>
</template>
