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
    console.log('🚀 ~ invoke ~ options:', options)
  },
}

uni.addInterceptor('request', uniInterceptor)
uni.addInterceptor('uploadFile', uniInterceptor)
// uni.addInterceptor('download', uniInterceptor)
