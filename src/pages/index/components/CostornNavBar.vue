<template>
  <view>
    <view class="header-container" :style="`padding-top: ${safeAreaInsets?.top}px`">
      <image src="../../../static/images/logo.png" class="logo-img" />
      <text class="logo-text"> | 新鲜 · 亲民 · 快捷</text>
    </view>
    <view class="search-bar">
      <text class="search"> 搜索商品</text>
      <text class="search-icon"></text>
    </view>
  </view>
</template>

<script setup lang="ts">
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<style scoped lang="scss">
.header-container {
  padding-top: 60rpx;
  padding-bottom: 20rpx;
  background-color: #01ab9b;
  padding-left: 30rpx;
  display: flex;
  align-items: center;
  min-height: 66rpx;
}
.logo-img {
  width: 166rpx;
  height: 39rpx;
  margin-right: 20rpx;
}
.logo-text {
  color: #fff;
  font-size: 24rpx;
  font-weight: 400;
}
.search-bar {
  background-color: #01ab9b;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80rpx;
}
.search {
  background-color: rgba($color: #fff, $alpha: 0.3);
  font-size: 28rpx;
  color: #999;
  margin-bottom: 20rpx;
  border-radius: 80rpx;
  padding-left: 30rpx;
  width: 80%;
  height: 60rpx;
  line-height: 60rpx;
  border: #fff 1px solid;
}
.search-icon {
  width: 40rpx;
  height: 40rpx;

  background-size: cover;
}
</style>
