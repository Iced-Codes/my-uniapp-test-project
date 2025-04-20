//轮播图数据

export interface HomeBanner {
  id: number
  imgUrl: string
  hrefUrl: string
  type: string
}
//前台分类
export interface HomeCategoryMutli {
  icon: string
  id: number
  name: string
}
//热门

export interface HomeHotMutli {
  id: string
  pictures: string[]
  title: string
  alt: string
  target: string
  type: number
}

//猜你喜欢
export interface HomeGoodsGuessLike {
  counts: number
  pageSize: number
  pages: number
  page: number
  items: Item[]
}

export interface Item {
  id: string
  name: string
  desc: string
  price: string
  picture: string
  orderNum: number
}
