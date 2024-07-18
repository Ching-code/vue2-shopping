import request from '@/utils/request'

export const getProductList = (obj) => {
  const { sortType, categoryId, goodsName, page } = obj
  return request.get('/goods/list', {
    params: {
      sortType,
      categoryId,
      goodsName,
      page,
    },
  })
}

export const getProductDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId,
    },
  })
}

export const getProductComment = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit,
    },
  })
}
