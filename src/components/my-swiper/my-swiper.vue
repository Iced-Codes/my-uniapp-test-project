<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
  <view>
    <view class="uni-margin-wrap">
      <swiper
        class="swiper"
        circular
        @change="onSwiperChange"
        autoplay
        :interval="3000"
        :duration="500"
      >
        <swiper-item v-for="(item, index) in background" :key="index">
          <view class="swiper-item uni-bg-red" :style="{ backgroundColor: item }">
            {{ index + 1 }}
          </view>
        </swiper-item>
      </swiper>

      <view class="block-strip">
        <text
          v-for="(item, index) in background"
          :key="item"
          class="strip"
          :style="{ backgroundColor: active === index ? '#fff' : '#fff5' }"
          @click="active = index"
        ></text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const background = ref(['#f55', '#5f5', '#55f'])
const active = ref(0)
/**
 *  swiper自动滑动事件
 * @param e swiper事件
 */
const onSwiperChange = (e: any) => {
  active.value = e.detail.current
}
</script>

<style lang="scss" scoped>
.uni-margin-wrap {
  width: 690rpx;
  width: 100%;
  position: relative;
}
.swiper {
  height: 300rpx;
}
.swiper-item {
  display: block;
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
}
.swiper-list {
  margin-top: 40rpx;
  margin-bottom: 0;
}
.uni-common-mt {
  margin-top: 60rpx;
  position: relative;
}
.info {
  position: absolute;
  right: 20rpx;
}
.uni-padding-wrap {
  width: 550rpx;
  padding: 0 100rpx;
}
.block-strip {
  display: flex;
  justify-content: center;
  margin-bottom: 20rpx;
  position: absolute;
  bottom: 30rpx;
  left: 50%;
  transform: translateX(-50%);
  .strip {
    display: inline-block;
    width: 20rpx;
    height: 20rpx;
    margin-right: 10rpx;
    border-radius: 50%;
    background-color: #fff5;
  }
}
</style>
