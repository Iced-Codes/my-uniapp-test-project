<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image :src="hotData?.bannerPicture"></image>
    </view>
    <!-- 推荐选项 -->
    <view class="tabs">
      <text
        v-for="item in hotData?.subTypes"
        :key="item.id"
        class="text"
        :class="{ active: item.id === activeTab }"
        @click="activeTab = item.id"
        >{{ item.title }}</text
      >
    </view>
    <!-- 推荐列表 -->
    <scroll-view
      v-for="e in hotData?.subTypes"
      :key="e.id"
      v-show="activeTab === e.id"
      scroll-y
      class="scroll-view"
      @refresherrefresh="onRefresherrefresh"
      refresher-triggered
      @scrolltolower="onScrolltolower"
    >
      <view class="goods">
        <navigator
          hover-class="none"
          class="navigator"
          v-for="goods in hotData?.subTypes.find((item:any) => item.id === activeTab).goodsItems?.items"
          :key="goods.id"
          :url="`/pages/goods/goods?id=${goods.id}`"
        >
          <image class="thumb" :src="goods.picture"></image>
          <view class="name ellipsis">{{ goods.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goods.price }}</text>
          </view>
        </navigator>
      </view>
      <view class="loading-text">{{ isLoad ? '没有更多数据了' : '正在加载...' }}</view>
    </scroll-view>
  </view>
</template>
<script lang="ts" setup>
import { getHotApi } from '@/services/hot'
import { onLoad } from '@dcloudio/uni-app'
const { type } = defineProps<{
  type: string
}>()

//选择tab
const activeTab = ref(0)
const urlMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/onestop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
]
const findUrl = urlMap.find((item) => item.type === type)
//更改头部标题
uni.setNavigationBarTitle({
  title: findUrl?.title || '热门推荐',
})
/**获取hot数据 */
const hotData = ref<any>()
const hotList = ref<any>([])
const parameter = ref<{
  page: number
  pageSize: number
  type: string
  subType?: number | null
}>({
  page: 1,
  pageSize: 10,
  type: type,
  // subType: null,
})
const getHotData = async () => {
  const res: any = await getHotApi(findUrl!.url, parameter.value)
  if (res.code === '1') {
    hotData.value = res.result
    activeTab.value = res.result.subTypes[0].id
  } else {
    uni.showToast({
      title: '获取数据失败',
      icon: 'none',
    })
    return
  }
}
//滚动条刷新
const onRefresherrefresh = () => {
  parameter.value.page = 1
  getHotData()
}
//滚动条加载更多
const isLoad = ref(false)
const onScrolltolower = async () => {
  const p = hotData.value.subTypes.find((item: any) => item.id === activeTab.value)
  p.goodsItems.page++
  parameter.value.subType = activeTab.value
  //如果超过最大页数，提示没有更多数据
  if (p.goodsItems.page > p.goodsItems.pages) {
    isLoad.value = true
    uni.showToast({
      title: '没有更多数据了',
      icon: 'none',
    })
    return
  }
  const res: any = await getHotApi(findUrl!.url, {
    subType: activeTab.value,
    page: p.goodsItems.page,
    pageSize: p.goodsItems.pageSize,
  })
  if (res.code === '1') {
    hotData.value.subTypes.forEach((e: any) => {
      if (e.id === activeTab.value) {
        // e.goodsItems.page = res.result.subTypes[0].goodsItems.page
        e.goodsItems.items.push(
          ...res.result.subTypes[
            hotData.value.subTypes.findIndex((v: any) => v.id === activeTab.value)
          ].goodsItems.items,
        )
      }
    })
  } else {
    uni.showToast({
      title: '获取数据失败',
      icon: 'none',
    })
    return
  }
}
//省名周期 加载页面时
onLoad(() => {
  getHotData()
})
</script>
<style lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}
.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}
.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}
.scroll-view {
  flex: 1;
}
.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;
  .text {
    margin: 0 20rpx;
    position: relative;
  }
  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;
  .navigator {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }
  .thumb {
    width: 305rpx;
    height: 305rpx;
  }
  .name {
    height: 88rpx;
    font-size: 26rpx;
  }
  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }
  .symbol {
    font-size: 70%;
  }
  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>
