<script setup lang="ts">

</script>

<template>
  <div class="box">
    <div class="container">
      layout
    </div>
    <QxsFixedActionBar class="custom-action-bar">
      test 这个是内容
    </QxsFixedActionBar>
  </div>
</template>

<style scoped lang="scss">
.box {
  .container {
    background-color: #ddd;
  }

  :deep(.custom-action-bar) {
    background-color: #ff6700;
  }
}
</style>
