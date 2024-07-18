import { getCartList, changeCount, deleteSelectedCartItem } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state() {
    return {
      cartList: [],
    }
  },
  mutations: {
    setCartList(state, newList) {
      state.cartList = newList
    },
    toggleCheck(state, goodsId) {
      const goods = state.cartList.find((item) => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    toggleAllCheck(state, isAllChecked) {
      state.cartList.forEach((item) => {
        item.isChecked = isAllChecked
      })
    },
    changeCount(state, { goods_id, goodsNum }) {
      const goods = state.cartList.find((item) => item.goods_id === goods_id)
      goods.goods_num = goodsNum
    },
  },
  actions: {
    async getCartAction(context) {
      const { data } = await getCartList()
      // 不包含複選框狀態，手動添加
      data.list.forEach((item) => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    async changeCountAction(context, obj) {
      const { goodsNum, goods_id, goods_sku_id } = obj
      // 先修改渲染端
      context.commit('changeCount', { goods_id, goodsNum })
      // 再同步後端資料
      await changeCount(goods_id, goodsNum, goods_sku_id)
    },
    async deleteSelectedCartItemAction(context) {
      const selectedCartList = context.getters.selectedCartList
      const cartIds = selectedCartList.map((item) => item.id)
      await deleteSelectedCartItem(cartIds)

      // 重新取數據渲染
      context.dispatch('getCartAction').then(() => {
        Toast('刪除成功')
      })
    },
  },
  getters: {
    cartTotal(state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    selectedCartList(state) {
      return state.cartList.filter((item) => item.isChecked)
    },
    selectedCount(state, getters) {
      return getters.selectedCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    selectedTotalPrice(state, getters) {
      return getters.selectedCartList
        .reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0)
        .toFixed(2)
    },
    isAllChecked(state) {
      return state.cartList.every((item) => item.isChecked)
    },
  },
}
