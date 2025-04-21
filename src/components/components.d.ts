import MySwiper from './my-swiper/my-swiper.vue'
import myGuess from './my-guess/my-guess.vue'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MySwiper: typeof MySwiper
    myGuess: typeof myGuess
  }
}
export type GuessTemplateTypes = InstanceType<typeof myGuess>
