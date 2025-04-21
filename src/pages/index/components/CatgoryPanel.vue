<template>
  <view class="category-main">
    <navigator
      open-type="navigate"
      hover-class="none"
      v-for="item in list"
      :key="item.id"
      class="category-item"
    >
      <image :src="item.icon" mode="scaleToFill" class="category-img" />
      <text class="category-text">{{ item.name }}</text>
    </navigator>
  </view>
</template>

<script setup lang="ts">
const { list = [] } = defineProps<{
  list: HomeCategoryMutli[]
}>()
</script>

<style scoped lang="scss">
.category-main {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  .category-item {
    margin-top: 10rpx;
    padding: 0 10rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10rpx;
    text-align: center;
    .category-img {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      margin-bottom: 10rpx;
    }
    .category-text {
      font-size: 24rpx;
      color: #333;
    }
  }
}
</style>
