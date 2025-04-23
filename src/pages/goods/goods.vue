<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import GoodsPicture from './components/GoodsPicture.vue'
import AddressPanel from '../goods/components/AddressPanel.vue'
import { postMemberCart } from '@/services/cart'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const props = defineProps<{
  id: string
}>()
//获取商品详情数据
const localdata = ref({})
const goodsDetail = ref<any>({})
const getData = async () => {
  const res: any = await getGoods({ id: props.id })
  goodsDetail.value = res.result
  localdata.value = {
    _id: res.result.id,
    name: res.result.name,
    goods_thumb: res.result.mainPictures[0],
    spec_list: res.result.specs.map((item: any) => ({
      name: item.name,
      list: item.values,
    })),
    sku_list: res.result.skus.map((item: any) => ({
      _id: item.id,
      goods_id: res.result.id,
      goods_name: res.result.name,
      image: item.picture,
      price: item.price * 100,
      stock: item.inventory + 100,
      sku_name_arr: item.specs.map((i: any) => i.valueName),
    })),
  }
}
//轮播图change事件
const swiperCurrentPage = ref(1)
const onSwiperChange: UniHelper.SwiperOnChange = (e) => {
  const { current } = e.detail
  swiperCurrentPage.value = current + 1
}
// 点击图片事件
const onTapImage = (v: string) => {
  uni.previewImage({
    current: v,
    urls: goodsDetail.value.mainPictures,
  })
}

// 弹出层相关
const popup = ref()
const popupType = ref<'picture' | 'address'>('picture')
const showPopup = (v: 'picture' | 'address') => {
  popupType.value = v
  popup.value?.open()
}
onLoad(() => {
  getData()
})

const isShowSKU = ref(false)
enum SKUMode {
  ADD_CART = 2,
  BUY_NOW = 3,
  SELECT = 1,
}
const mode = ref<SKUMode>(1)
const onOpenSkuPopup = (val: any) => {
  isShowSKU.value = true
  mode.value = val
}

const skuRef = ref()
const selectText = computed(() => {
  return skuRef.value?.selectArr?.join(' ').trim() || '请选择商品规格'
})
//添加购物车
const onAddCart = async (sku: any) => {
  await postMemberCart({ skuId: sku._id, count: sku.buy_num })
  uni.showToast({
    title: '加入购物车成功',
    icon: 'none',
  })
  isShowSKU.value = false
}
//立即购买
const onBuyNow = (e: any) => {
  console.log('🚀 ~ onBuyNow ~ e:', e)
  uni.navigateTo({ url: `/pagesOrder/create/create?skuId=${e._id}&count=${e.buy_num}` })
}
</script>

<template>
  <vk-data-goods-sku-popup
    v-model="isShowSKU"
    :localdata="localdata"
    :mode="mode"
    add-cart-background-color="#ffa868"
    buy-now-background-color="#27ba9b"
    :avtive-color="{
      color: '#27ba9b',
      backgroundColor: '#e9f8f5',
      borderColor: '#27ba9b',
      borderWidth: '1rpx',
    }"
    @add-cart="onAddCart"
    @buy-now="onBuyNow"
    ref="skuRef"
  />
  <scroll-view scroll-y class="viewport">
    <!-- 基本信息 -->
    <view class="goods">
      <!-- 商品主图 -->
      <view class="preview">
        <swiper circular @change="onSwiperChange" :indicator-dots="true" :autoplay="true">
          <swiper-item v-for="item in goodsDetail.mainPictures" :key="item">
            <image @tap="onTapImage(item)" mode="aspectFill" :src="item" />
          </swiper-item>
        </swiper>
        <view class="indicator">
          <text class="current">{{ swiperCurrentPage }}</text>
          <text class="split">/</text>
          <text class="total">{{ goodsDetail?.mainPictures?.length }}</text>
        </view>
      </view>

      <!-- 商品简介 -->
      <view class="meta">
        <view class="price">
          <text class="symbol">¥</text>
          <text class="number">{{ goodsDetail.price }}</text>
        </view>
        <view class="name ellipsis">{{ goodsDetail.name }} </view>
        <view class="desc"> {{ goodsDetail.desc }} </view>
      </view>

      <!-- 操作面板 -->
      <view class="action">
        <view class="item arrow">
          <text class="label">选择</text>
          <text class="text ellipsis" @click="onOpenSkuPopup(SKUMode.SELECT)">
            {{ selectText }}
          </text>
        </view>
        <view class="item arrow" @click="showPopup('address')">
          <text class="label">送至</text>
          <text class="text ellipsis"> 请选择收获地址 </text>
        </view>
        <view class="item arrow" @click="showPopup('picture')">
          <text class="label">服务</text>
          <text class="text ellipsis"> 无忧退 快速退款 免费包邮 </text>
        </view>
      </view>
    </view>

    <!-- 商品详情 -->
    <view class="detail panel">
      <view class="title">
        <text>详情</text>
      </view>
      <view class="content">
        <view class="properties">
          <!-- 属性详情 -->
          <view class="item" v-for="go in goodsDetail?.details?.properties" :key="go.name">
            <text class="label">{{ go.name }}</text>
            <text class="value">{{ go.value }}</text>
          </view>
        </view>
        <!-- 图片详情 -->
        <image
          v-for="item in goodsDetail?.details?.pictures"
          :key="item"
          mode="widthFix"
          :src="item"
        ></image>
      </view>
    </view>

    <!-- 同类推荐 -->
    <view class="similar panel">
      <view class="title">
        <text>同类推荐</text>
      </view>
      <view class="content">
        <navigator
          v-for="item in goodsDetail?.similarProducts"
          :key="item.id"
          class="goods"
          hover-class="none"
          :url="`/pages/goods/goods?id=${item.id}`"
        >
          <image class="image" mode="aspectFill" :src="item.picture"></image>
          <view class="name ellipsis">{{ item.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ item.price }}</text>
          </view>
        </navigator>
      </view>
    </view>
  </scroll-view>

  <!-- 用户操作 -->
  <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
    <view class="icons">
      <button class="icons-button"><text class="icon-heart"></text>收藏</button>
      <button class="icons-button" open-type="contact">
        <text class="icon-handset"></text>客服
      </button>
      <navigator class="icons-button" url="/pages/cart/cart2" open-type="navigate">
        <text class="icon-cart"></text>购物车
      </navigator>
    </view>
    <view class="buttons">
      <view class="addcart" @click="onOpenSkuPopup(SKUMode.ADD_CART)"> 加入购物车 </view>
      <view class="buynow" @click="onOpenSkuPopup(SKUMode.BUY_NOW)"> 立即购买 </view>
    </view>
  </view>

  <!-- 弹出层 -->

  <uni-popup ref="popup" type="bottom" background-color="#fff">
    <GoodsPicture @close="popup?.close()" v-show="popupType === 'picture'" />
    <AddressPanel @close="popup?.close()" v-show="popupType === 'address'" />
  </uni-popup>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.viewport {
  background-color: #f4f4f4;
}

.panel {
  margin-top: 20rpx;
  background-color: #fff;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90rpx;
    line-height: 1;
    padding: 30rpx 60rpx 30rpx 6rpx;
    position: relative;
    text {
      padding-left: 10rpx;
      font-size: 28rpx;
      color: #333;
      font-weight: 600;
      border-left: 4rpx solid #27ba9b;
    }
    navigator {
      font-size: 24rpx;
      color: #666;
    }
  }
}

.arrow {
  &::after {
    position: absolute;
    top: 50%;
    right: 30rpx;
    content: '\e6c2';
    color: #ccc;
    font-family: 'erabbit' !important;
    font-size: 32rpx;
    transform: translateY(-50%);
  }
}

/* 商品信息 */
.goods {
  background-color: #fff;
  .preview {
    height: 750rpx;
    position: relative;
    .image {
      width: 750rpx;
      height: 750rpx;
    }
    .indicator {
      height: 40rpx;
      padding: 0 24rpx;
      line-height: 40rpx;
      border-radius: 30rpx;
      color: #fff;
      font-family: Arial, Helvetica, sans-serif;
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      bottom: 30rpx;
      right: 30rpx;
      .current {
        font-size: 26rpx;
      }
      .split {
        font-size: 24rpx;
        margin: 0 1rpx 0 2rpx;
      }
      .total {
        font-size: 24rpx;
      }
    }
  }
  .meta {
    position: relative;
    border-bottom: 1rpx solid #eaeaea;
    .price {
      height: 130rpx;
      padding: 25rpx 30rpx 0;
      color: #fff;
      font-size: 34rpx;
      box-sizing: border-box;
      background-color: #35c8a9;
    }
    .number {
      font-size: 56rpx;
    }
    .brand {
      width: 160rpx;
      height: 80rpx;
      overflow: hidden;
      position: absolute;
      top: 26rpx;
      right: 30rpx;
    }
    .name {
      max-height: 88rpx;
      line-height: 1.4;
      margin: 20rpx;
      font-size: 32rpx;
      color: #333;
    }
    .desc {
      line-height: 1;
      padding: 0 20rpx 30rpx;
      font-size: 24rpx;
      color: #cf4444;
    }
  }
  .action {
    padding-left: 20rpx;
    .item {
      height: 90rpx;
      padding-right: 60rpx;
      border-bottom: 1rpx solid #eaeaea;
      font-size: 26rpx;
      color: #333;
      position: relative;
      display: flex;
      align-items: center;
      &:last-child {
        border-bottom: 0 none;
      }
    }
    .label {
      width: 60rpx;
      color: #898b94;
      margin: 0 16rpx 0 10rpx;
    }
    .text {
      flex: 1;
      -webkit-line-clamp: 1;
    }
  }
}

/* 商品详情 */
.detail {
  padding-left: 20rpx;
  .content {
    margin-left: -20rpx;
    .image {
      width: 100%;
    }
  }
  .properties {
    padding: 0 20rpx;
    margin-bottom: 30rpx;
    .item {
      display: flex;
      line-height: 2;
      padding: 10rpx;
      font-size: 26rpx;
      color: #333;
      border-bottom: 1rpx dashed #ccc;
    }
    .label {
      width: 200rpx;
    }
    .value {
      flex: 1;
    }
  }
}

/* 同类推荐 */
.similar {
  .content {
    padding: 0 20rpx 200rpx;
    background-color: #f4f4f4;
    display: flex;
    flex-wrap: wrap;
    .goods {
      width: 340rpx;
      padding: 24rpx 20rpx 20rpx;
      margin: 20rpx 7rpx;
      border-radius: 10rpx;
      background-color: #fff;
    }
    .image {
      width: 300rpx;
      height: 260rpx;
    }
    .name {
      height: 80rpx;
      margin: 10rpx 0;
      font-size: 26rpx;
      color: #262626;
    }
    .price {
      line-height: 1;
      font-size: 20rpx;
      color: #cf4444;
    }
    .number {
      font-size: 26rpx;
      margin-left: 2rpx;
    }
  }
  navigator {
    &:nth-child(even) {
      margin-right: 0;
    }
  }
}

/* 底部工具栏 */
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: #fff;
  height: 100rpx;
  padding: 0 20rpx var(--window-bottom);
  border-top: 1rpx solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;
  .buttons {
    display: flex;
    & > view {
      width: 220rpx;
      text-align: center;
      line-height: 72rpx;
      font-size: 26rpx;
      color: #fff;
      border-radius: 72rpx;
    }
    .addcart {
      background-color: #ffa868;
    }
    .buynow,
    .payment {
      background-color: #27ba9b;
      margin-left: 20rpx;
    }
  }
  .icons {
    padding-right: 10rpx;
    display: flex;
    align-items: center;
    flex: 1;
    .icons-button {
      flex: 1;
      text-align: center;
      line-height: 1.4;
      padding: 0;
      margin: 0;
      border-radius: 0;
      font-size: 20rpx;
      color: #333;
      background-color: #fff;
      &::after {
        border: none;
      }
    }
    text {
      display: block;
      font-size: 34rpx;
    }
  }
}
</style>
