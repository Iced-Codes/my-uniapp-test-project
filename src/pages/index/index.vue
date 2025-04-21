<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import CostornNavBar from './components/CostornNavBar.vue'
import CatgoryPanel from './components/CatgoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import PageSkeleton from './components/PageSkeleton.vue'
import type { GuessTemplateTypes } from '@/components/components.d.ts'
import {
  getHomeBanner,
  getHomeCategoryMutli,
  getHomeHotMutli,
  getHomeGoodsGuessLike,
} from '@/services/index'

const bannerList = ref<HomeBanner[]>([])
const getHomeBannerList = () => {
  getHomeBanner().then((res) => {
    if (res.code === '1') {
      bannerList.value = res.result
    }
  })
}
/**获取前台分类 */
const mutilList = ref<HomeCategoryMutli[]>([])
const getHomeCategoryMutliple = () => {
  getHomeCategoryMutli().then((res) => {
    if (res.code === '1') {
      mutilList.value = res.result
    }
  })
}
/**获取热门分类 */
const hotList = ref<HomeHotMutli[]>([])
const getHomeHotMutliData = async () => {
  const res = await getHomeHotMutli()
  hotList.value = res.result
  //   .then( ( res ) => {
  //   if (res.code === '1') {

  //   }
  // })
}
const myGuessRef = ref<GuessTemplateTypes | null>(null)
/**触底事件 */
const onScrolltolower = () => {
  if (myGuessRef.value) {
    myGuessRef.value.getHomeGoodsGuessLikeData()
  }
}
const isTriggered = ref(false)
/**下拉刷新事件 */
const onRefresherrefresh = () => {
  isTriggered.value = true
  myGuessRef.value?.resetData()
  Promise.all([
    getHomeBannerList(),
    getHomeCategoryMutliple(),
    getHomeHotMutliData(),
    myGuessRef.value?.getHomeGoodsGuessLikeData(),
  ]).then(() => {
    isTriggered.value = false
  })
}
const isLoading = ref(false)
onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerList(), getHomeCategoryMutliple(), getHomeHotMutliData()])
  isLoading.value = false
})
</script>

<template>
  <CostornNavBar />
  <scroll-view
    refresher-enabled
    @refresherrefresh="onRefresherrefresh"
    :refresher-triggered="isTriggered"
    scroll-y
    style="flex: 1"
    @scrolltolower="onScrolltolower"
  >
    <PageSkeleton v-if="isLoading" />
    <template v-else>
      <my-swiper :list="bannerList" />
      <CatgoryPanel :list="mutilList" />
      <HotPanel :list="hotList" />
      <my-guess ref="myGuessRef" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}
</style>
