import { http } from '@/utils/https'
export const getMemberOrderPre = () => {
  return http({
    url: '/member/order/pre',
    method: 'GET',
  })
}
export const getMemberOrder = (id: any) => {
  return http({
    url: `/member/order/${id}`,
    method: 'GET',
  })
}
export const getMemberOrderPreNow = (data: any) => {
  return http({
    url: '/member/order/pre/now',
    method: 'GET',
    data,
  })
}
export const postMemberOrder = (data: any) => {
  return http({
    url: '/member/order',
    method: 'POST',
    data,
  })
}
/**
 * 模拟发货-内测版
 * @description 在DEV环境下使用，仅在订单状态为待发货时，可模拟发货，调用后订单状态修改为待收货，包含模拟物流。
 * @param id 订单id
 */
export const getMemberOrderConsignmentByIdAPI = (id: string) => {
  return http({
    method: 'GET',
    url: `/member/order/consignment/${id}`,
  })
}
/**
 * 确认收货
 * @description 仅在订单状态为待收货时，可确认收货。
 * @param id 订单id
 */
export const putMemberOrderReceiptByIdAPI = (id: string) => {
  return http({
    method: 'PUT',
    url: `/member/order/${id}/receipt`,
  })
}
/**
 * 获取订单物流
 * @description 仅在订单状态为待收货，待评价，已完成时，可获取物流信息。
 * @param id 订单id
 */
export const getMemberOrderLogisticsByIdAPI = (id: string) => {
  return http({
    method: 'GET',
    url: `/member/order/${id}/logistics`,
  })
}
/**
 * 删除订单
 * @description 仅在订单状态为待评价，已完成，已取消时，可删除订单。
 * @param data ids 订单集合
 */
export const deleteMemberOrderAPI = (data: { ids: string[] }) => {
  return http({
    method: 'DELETE',
    url: `/member/order`,
    data,
  })
}
/**
 * 获取订单列表
 * @param data orderState 订单状态
 */
export const getMemberOrderAPI = (data: any) => {
  return http({
    method: 'GET',
    url: `/member/order`,
    data,
  })
}
