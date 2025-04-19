import MySwiper from './my-swiper/my-swiper.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MySwiper: typeof MySwiper
  }
}
