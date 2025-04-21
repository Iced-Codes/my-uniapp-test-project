<template>
  <view class="category-main">
    <view v-for="item in list" :key="item.id" class="category-item">
      <view class="category-title">
        <text class="hot-h1">{{ item.title }}</text>
        <text class="hot-h2">{{ item.alt }}</text>
      </view>
      <navigator
        :url="`/pages/hot/hot?type=${item.type}`"
        open-type="navigate"
        hover-class="navigator-hover"
        class="hot-imgs"
      >
        <image v-for="pic in item.pictures" :key="pic" class="hot-img" :src="pic" />
      </navigator>
    </view>
  </view>
</template>

<script setup lang="ts">
const { list = [] } = defineProps<{
  list: HomeHotMutli[]
}>()
</script>

<style scoped lang="scss">
.category-main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 1rpx;
  padding: 0 20rpx;
  .category-item {
    background-color: #fff;
    // margin-top: 10rpx;
    padding: 0 10rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10rpx;
    text-align: center;

    .category-title {
      margin-bottom: 10rpx;
      display: flex;

      align-items: center;
      padding: 10rpx 50rpx;
      width: 100%;
    }
    .hot-h1 {
      font-size: 28rpx;
      color: #333;
      font-weight: 700;
      margin-right: 20rpx;
    }
    .hot-h2 {
      font-size: 20rpx;
      color: #666;
    }
    .hot-imgs {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
    .hot-img {
      width: 160rpx;
      height: 200rpx;
      margin-bottom: 10rpx;
    }
  }
}
</style>
