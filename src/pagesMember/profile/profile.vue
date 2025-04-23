<script setup lang="ts">
import { getMemberProfile } from '@/services/profile'
import { onLoad } from '@dcloudio/uni-app'
import { useMemberStore } from '@/stores'
const memberStore = useMemberStore()
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const profile = ref<any>({})
const getProfileData = async () => {
  const res = await getMemberProfile()
  if (res.code === '1') {
    profile.value = res.result
  }
}
onLoad(() => {
  getProfileData()
})

const onClickAvatar = () => {
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    success: async (success) => {
      const { tempFilePath } = success.tempFiles[0]
      uni.uploadFile({
        url: '/member/profile/avatar',
        fileType: 'image',
        filePath: tempFilePath,
        name: 'file',
        success: ({ data, statusCode }) => {
          console.log('🚀 ~ success: ~ data:', data)
        },
      })
    },
  })
}
//性别筛选框change事件

const onRadioChange: UniHelper.RadioGroupOnChange = (checked) => {
  profile.value.gender = checked.detail.value
}
//生日change事件
const onDateChange: UniHelper.DatePickerOnChange = (e) => {
  profile.value.birthday = e.detail.value
}
//城市change事件
const onRegionChange: UniHelper.RegionPickerOnChange = (e) => {
  profile.value.fullLocation = e.detail.value.join(' ')
}
//获取城市数据
//提交事件
const onSubmit = async () => {
  const formData = {
    nickname: profile.value.nickname,
    gender: profile.value.gender,
    birthday: profile.value.birthday,
    provinceCode: profile.value.fullLocation.split(' ')[0],
    cityCode: profile.value.fullLocation.split(' ')[1],
    countyCode: profile.value.fullLocation.split(' ')[2],
    profession: profile.value.profession,
  }
  console.log('🚀 ~ onSubmit ~ formData:', formData)
  const res: any = await putMemberProfile(formData)
  if (res.code === '1') {
    memberStore.profile.nickname = res.result.nickname
    uni.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 2000,
    })
  } else {
    uni.showToast({
      title: '保存失败',
      icon: 'none',
      duration: 2000,
    })
  }
  const t = setTimeout(() => {
    uni.navigateBack({
      delta: 1,
    })
    clearTimeout(t)
  }, 500)
}
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <navigator open-type="navigateBack" class="back icon-left" hover-class="none"></navigator>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <view class="avatar">
      <view class="avatar-content" @click="onClickAvatar">
        <image class="image" :src="profile?.avatar" mode="aspectFill" />
        <text class="text">点击修改头像</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account">{{ profile.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input class="input" type="text" placeholder="请填写昵称" v-model="profile.nickname" />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="onRadioChange">
            <label class="radio">
              <radio value="男" color="#27ba9b" :checked="profile.gender === '男'" />
              男
            </label>
            <label class="radio">
              <radio value="女" color="#27ba9b" :checked="profile.gender === '女'" />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <picker
            class="picker"
            mode="date"
            start="1900-01-01"
            :end="new Date()"
            :value="profile.birthday"
            @change="onDateChange"
          >
            <view v-if="profile.birthday">{{ profile.birthday }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">城市</text>
          <picker
            class="picker"
            mode="region"
            :value="profile.fullLocation?.split(' ')"
            @change="onRegionChange"
          >
            <view v-if="profile.fullLocation">{{ profile.fullLocation }}</view>
            <view class="placeholder" v-else>请选择城市</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">职业</text>
          <input class="input" type="text" placeholder="请填写职业" v-model="profile.profession" />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button class="form-button" @click="onSubmit">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 导航栏
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>
