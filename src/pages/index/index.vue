<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import CostornNavBar from './components/CostornNavBar.vue'
import { getHomeBanner } from '@/services/index'
const bannerList = ref<HomeBanner[]>([])
const getHomeBannerList = () => {
  getHomeBanner().then((res) => {
    if (res.code === '1') {
      console.log('🚀 ~ getHomeBanner ~ res:', res)
      bannerList.value = res.result
    }
  })
}
onLoad(() => {
  getHomeBannerList()
})
</script>

<template>
  <view class="index">
    <CostornNavBar />
    <my-swiper :list="bannerList" />

    <uni-card
      title="基础卡片"
      sub-title="副标题"
      extra="额外信息"
      thumbnail="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
    >
      <text>这是一个带头像和双标题的基础卡片，此示例展示了一个完整的卡片。</text>
    </uni-card>
  </view>
</template>

<style lang="scss">
//
</style>
