<script setup lang="ts">
import { useMemberStore } from '@/stores'
import { http } from '@/utils/https'

const memberStore = useMemberStore()
const getRequest = () => {
  http({
    url: '',
    method: 'GET',
  }).then((res) => {
    console.log(res)
  })
}
</script>

<template>
  <view class="my">
    <view>会员信息：{{ memberStore.profile }}</view>
    <button
      @tap="
        memberStore.setProfile({
          nickname: '黑马先锋',
          token: '123',
        })
      "
      size="mini"
      plain
      type="primary"
    >
      保存用户信息
    </button>
    <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
    <button @tap="getRequest" size="mini" plain type="warn">请求测试</button>
  </view>
</template>

<style lang="scss">
//
</style>
