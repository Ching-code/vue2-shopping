<template>
  <div class="order-list-item" v-if="item.order_id">
    <div class="tit">
      <div class="time">{{ item.create_time }}</div>
      <div class="status">
        <span>{{ item.state_text }}</span>
      </div>
    </div>

    <div class="list">
      <div class="list-item" v-for="(good, index) in item.goods" :key="index">
        <div class="goods-image">
          <img :src="good.goods_image" alt="" />
        </div>
        <div class="goods-content tex-ellipsis-2">
          {{ good.goods_name }}
        </div>
        <div class="goods-trade">
          <p>$ {{ good.total_pay_price }}</p>
          <p>x {{ good.total_num }}</p>
        </div>
      </div>
    </div>

    <div class="total">共 {{ item.total_num }} 件商品，總金額 $ {{ item.total_price }} 元</div>

    <div class="actions">
      <div v-if="item.order_status === 10">
        <span v-if="item.pay_status === 10">立刻付款</span>
        <span v-else-if="item.delivery_status === 10">申請取消</span>
        <span v-else-if="item.delivery_status === 20 || item.delivery_status === 30">確認收貨</span>
      </div>
      <div v-if="item.order_status === 30">
        <span>評價</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.order-list-item {
  margin: 10px auto;
  width: 94%;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 0.5px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  color: #333;
  font-size: 13px;
}

.tit {
  height: 24px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .status {
    color: #fa2209;
  }
}

.list-item {
  display: flex;
  .goods-image {
    width: 90px;
    height: 90px;
    margin: 0 10px 10px 0;
    img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }
  .goods-content {
    flex: 2;
    line-height: 18px;
    min-height: 36px;
    margin-top: 8px;
  }
  .goods-trade {
    flex: 1;
    line-height: 18px;
    text-align: right;
    color: #b39999;
    margin-top: 8px;
  }
}

.total {
  text-align: right;
}

.actions {
  text-align: right;
  span {
    display: inline-block;
    height: 28px;
    color: #383838;
    border: 0.5px solid #a8a8a8;
    font-size: 14px;
    padding: 0 15px;
    border-radius: 5px;
    margin: 10px 0;
  }
}
</style>
