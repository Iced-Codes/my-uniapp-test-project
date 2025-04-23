export const useGuessList = () => {
  const myGuessRef = ref<GuessTemplateTypes | null>(null)
  /**触底事件 */
  const onScrolltolower = () => {
    if (myGuessRef.value) {
      myGuessRef.value.getHomeGoodsGuessLikeData()
    }
  }
  return {
    myGuessRef,
    onScrolltolower,
  }
}
