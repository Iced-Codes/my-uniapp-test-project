<template>
  <view class="my-guess">
    <text class="title"> 猜你喜欢 </text>
    <view class="guess">
      <navigator
        class="guess-item"
        open-type="navigate"
        hover-class="navigator-hover"
        v-for="item in goodsLikeData"
        :key="item.id"
      >
        <image :src="item.picture" :title="item.desc" mode="scaleToFill" class="guess-pic" />
        <view class="name">{{ item.name }}</view>
        <view class="price">
          <text class="small">￥</text>
          <text>{{ item.price }}</text>
        </view>
      </navigator>
    </view>
    <view class="loading-text">{{ finish ? '没有更多数据了' : ' 正在加载。。。' }} </view>
  </view>
</template>

<script lang="ts" setup>
const goodsLikeData = ref<Item[]>([])
const parameter = ref({
  page: 1,
  pageSize: 10,
})
const finish = ref(false)
const getHomeGoodsGuessLikeData = () => {
  if (finish.value) {
    uni.showToast({
      title: '没有更多数据了',
      icon: 'none',
    })
    return false
  }
  getHomeGoodsGuessLike(parameter.value).then((res) => {
    if (res.code === '1') {
      goodsLikeData.value.push(...res.result.items)
      parameter.value.page += 1
      if (res.result.pages < parameter.value.page) {
        finish.value = true
      }
    }
  })
}
const resetData = () => {
  goodsLikeData.value = []
  parameter.value.page = 1
  finish.value = false
}
onMounted(() => {
  getHomeGoodsGuessLikeData()
})
defineExpose({
  getHomeGoodsGuessLikeData,
  resetData,
})
</script>

<style lang="scss" scoped>
.my-guess {
  padding: 10rpx;
  margin-top: 20px;
  .title {
    display: block;
    width: 100vw;
    text-align: center;
    font-size: 28rpx;
    font-weight: 700;
  }
  .guess {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 20rpx;
    .guess-item {
      background-color: #fff;
      margin-top: 10rpx;
      padding: 0 10rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      // align-items: center;
      padding: 10rpx;
      .guess-pic {
        display: block;
        width: 100%;
        height: 300rpx;
      }
      .name {
        height: 75rpx;
        margin: 10rpx 0;
        // font-size: 24rpx;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .price {
        display: flex;
        color: #ff3a3a;
        .small {
          font-size: 24rpx;
          color: #ff3a3a;
        }
      }
    }
  }
  .loading-text {
    text-align: center;
    font-size: 24rpx;
    color: #999;
    margin-top: 20rpx;
  }
}
</style>
