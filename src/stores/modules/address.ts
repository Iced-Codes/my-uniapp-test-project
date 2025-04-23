export const useAddressStore = defineStore('addres', () => {
  const selectAddress = ref()
  const serSelectAddress = (address: any) => {
    selectAddress.value = address
  }
  return {
    selectAddress,
    serSelectAddress,
  }
})
