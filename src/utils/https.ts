import { useMemberStore } from '@/stores'

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

const uniInterceptor = {
  //请求前触发
  invoke(options: UniApp.RequestOptions) {
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    options.timeout = 30000
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    const token = useMemberStore().profile?.token
    if (token) {
      options.header['Authorization'] = token
    }
  },
}

uni.addInterceptor('request', uniInterceptor)
uni.addInterceptor('uploadFile', uniInterceptor)

interface RequestData<T> {
  code: string
  msg: string
  result: T
}

export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<RequestData<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data as RequestData<T>)
        } else if (res.statusCode === 401) {
          // token 失效
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          // 其他错误
          uni.showToast({
            title: (res.data as RequestData<T>).msg || '请求失败',
            icon: 'none',
          })
          reject(res)
        }
      },
      fail: (err) => {
        uni.showToast({
          title: '请求失败',
          icon: 'none',
        })
        reject(err)
      },
    })
  })
}
