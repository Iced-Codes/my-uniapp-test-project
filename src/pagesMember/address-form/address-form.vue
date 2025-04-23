<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
const rules: any = {
  receiver: {
    rules: [{ required: true, errorMessage: '请填写收货人姓名' }],
  },
  contact: {
    rules: [
      { required: true, errorMessage: '请填写收货人手机号码' },
      { pattern: /^1[3-9]\d{9}$/, errorMessage: '请填写正确的手机号码' },
    ],
  },
  fullLocation: {
    rules: [{ required: true, errorMessage: '请选择省/市/区(县)' }],
  },
  address: {
    rules: [{ required: true, min: 5, max: 100, errorMessage: '详细地址长度在5-100个字符之间' }],
  },
}

// 表单数据
const form = ref({
  receiver: '', // 收货人
  contact: '', // 联系方式
  fullLocation: '', // 省市区(前端展示)
  provinceCode: '', // 省份编码(后端参数)
  cityCode: '', // 城市编码(后端参数)
  countyCode: '', // 区/县编码(后端参数)
  address: '', // 详细地址
  isDefault: 0, // 默认地址，1为是，0为否
})
const { id } = defineProps<{
  id: number // 地址ID
}>()
uni.setNavigationBarTitle({ title: id ? '修改地址' : '新建地址' })
const getDetailData = async () => {
  const res = await getMemberAddress(id)
  console.log('🚀 ~ getDetailData ~ res:', res)
  Object.assign(form.value, res.result)
}

onLoad(() => {
  if (id) {
    getDetailData()
  }
})

const onRegionChange: UniHelper.RegionPickerOnChange = (e) => {
  form.value.fullLocation = e.detail.value.join(' ')
  const [provinceCode, cityCode, countyCode] = e.detail.value
  Object.assign(form.value, { provinceCode, cityCode, countyCode })
}
const onSwitchChange: UniHelper.SwitchOnChange = (e) => {
  form.value.isDefault = e.detail.value ? 1 : 0
}
const formRef = ref()
const onSubmit = async () => {
  formRef.value
    .validate()
    .then(async (valid: any) => {
      console.log('🚀 ~ formRef.value.validate ~ valid:', valid)
      if (valid) {
        if ('id' in form.value) {
          // 修改地址
          await putMemberAddress(form.value, id)
        } else {
          // 新建地址
          await postMemberAddress(form.value)
        }

        uni.navigateBack({ delta: 1 })
      } else {
        uni.showToast({ title: '请填写完整信息', icon: 'none' })
        return false
      }
    })
    .catch((err: any) => {
      uni.showToast({ title: '请填写完整信息', icon: 'none' })
    })
}
</script>

<template>
  <view class="content">
    <uni-forms :modelValue="form" :rules="rules" ref="formRef" label-width="220rpx">
      <!-- 表单内容 -->
      <uni-forms-item class="form-item" label="收货人" name="receiver" required>
        <input class="input" placeholder="请填写收货人姓名" v-model="form.receiver" />
      </uni-forms-item>
      <uni-forms-item class="form-item" label=" 手机号码" name="contact" required>
        <input class="input" placeholder="请填写收货人手机号码" v-model="form.contact" />
      </uni-forms-item>
      <uni-forms-item label="所在地区" name="fullLocation" class="form-item" required>
        <picker
          class="picker"
          mode="region"
          :value="form.fullLocation.split(' ')"
          @change="onRegionChange"
        >
          <view v-if="form.fullLocation">{{ form.fullLocation }}</view>
          <view v-else class="placeholder">请选择省/市/区(县)</view>
        </picker>
      </uni-forms-item>
      <uni-forms-item label="详细地址" name="address" class="form-item" required>
        <input class="input" placeholder="街道、楼牌号等信息" v-model="form.address" />
      </uni-forms-item>
      <uni-forms-item label="设为默认地址" name="isDefault" class="form-item">
        <switch
          @change="onSwitchChange"
          class="switch"
          color="#27ba9b"
          :checked="!!form.isDefault"
        />
      </uni-forms-item>
    </uni-forms>
  </view>
  <!-- 提交按钮 -->
  <button class="button" @click="onSubmit">保存并使用</button>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.content {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .form-item,
  .uni-forms-item {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 25rpx 10rpx 40rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;
    margin-bottom: 0;

    // 调整 uni-forms 样式
    .uni-forms-item__content {
      display: flex;
    }

    .uni-forms-item__error {
      margin-left: 200rpx;
    }

    &:last-child {
      border: none;
    }

    .label {
      width: 200rpx;
      color: #333;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .switch {
      position: absolute;
      right: -20rpx;
      transform: scale(0.8);
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }
}

.button {
  height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>
