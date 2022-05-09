<script lang="ts" setup></script>
<template>
  <el-skeleton animated>
    <template #template>
        <div class="container">
          <el-skeleton-item
            variant="rect"
            style="width: 200px; height: 200px"
          />
          <el-skeleton
            :rows="5"
            variant="caption"
            style="flex:1"
          ></el-skeleton>
        </div>
    </template>
  </el-skeleton>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
   margin: 20px;
   gap: 25px;
   width: 100%;
}
</style>
