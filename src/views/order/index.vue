<template>
  <div class="order">
    <van-nav-bar title="我的訂單" fixed left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <van-tabs v-model="active" sticky>
      <van-tab name="all" title="全部"></van-tab>
      <van-tab name="payment" title="待支付"></van-tab>
      <van-tab name="delivery" title="待發貨"></van-tab>
      <van-tab name="received" title="待收貨"></van-tab>
      <van-tab name="comment" title="待評價"></van-tab>
    </van-tabs>

    <OrderListItem v-for="item in list" :key="item.order_id" :item="item"></OrderListItem>
  </div>
</template>

<script>
import OrderListItem from '@/components/OrderListItem'
import { getMyOrderList } from '@/api/order'
import loginConfirm from '@/mixins/loginConfirm'
export default {
  name: 'OrderIndex',
  components: {
    OrderListItem,
  },
  mixins: [loginConfirm],
  data() {
    return {
      active: this.$route.query.dataType || 'all',
      page: 1,
      list: [],
    }
  },
  methods: {
    async getOrderList() {
      if (this.loginConfirm()) return
      const {
        data: { list },
      } = await getMyOrderList(this.active, this.page)
      list.data.forEach((item) => {
        item.total_num = 0
        item.goods.forEach((goods) => {
          item.total_num += goods.total_num
        })
      })
      this.list = list.data
    },
  },
  watch: {
    active: {
      immediate: true,
      handler() {
        this.getOrderList()
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.order {
  background-color: #fafafa;
  height: 150vh;
}
.van-tabs {
  position: sticky;
  padding-top: 46px;
  top: 0;
}
</style>
