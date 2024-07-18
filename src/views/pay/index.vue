<template>
  <div class="pay">
    <van-nav-bar title="訂單結算" fixed left-arrow @click-left="$router.go(-1)"></van-nav-bar>

    <div class="address">
      <div class="left-icon">
        <van-icon name="logistics"></van-icon>
      </div>

      <div class="info">
        <div class="info-content">
          <span class="name">小姐</span>
          <span class="mobile">00000000</span>
        </div>
        <div class="info-address">XX市XX區XX路XX號</div>
      </div>

      <div class="right-icon">
        <van-icon name="arrow"></van-icon>
      </div>
    </div>

    <div class="pay-list" v-if="order.goodsList">
      <div class="list">
        <div class="goods-item" v-for="item in order.goodsList" :key="item.goods_id">
          <div class="left">
            <img :src="item.goods_image" alt="" />
          </div>
          <div class="right">
            <p class="tit text-ellipsis-2">{{ item.goods_name }}</p>
            <p class="info">
              <span class="count">{{ item.total_num }}</span>
              <span class="price">{{ item.total_pay_price }}</span>
            </p>
          </div>
        </div>
      </div>

      <div class="flow-num-box">
        <span>共 {{ order.orderTotalNum }} 件商品 合計: </span>
        <span class="money">$ {{ order.orderTotalPrice }}</span>
      </div>

      <div class="pay-detail">
        <div class="pay-cell">
          <span>總金額: </span>
          <span class="red">$ {{ order.orderTotalPrice }}</span>
        </div>
        <div class="pay-cell">
          <span>優惠券: </span>
          <span>無優惠券可用</span>
        </div>
        <div class="pay-cell">
          <span>配送費用: </span>
          <span>請先選擇配送地址</span>
          <span class="red">$1000</span>
        </div>
      </div>

      <div class="pay-way">
        <span class="tit">支付方式</span>
        <div class="pay-cell">
          <span><van-icon name="balance-o"></van-icon>餘額支付 (可用 $ {{ personal.balance }} 元)</span>
          <span class="red"><van-icon name="passed"></van-icon></span>
        </div>
      </div>

      <div class="buytips">
        <textarea v-model="remark" placeholder="留言" name="" id="" cols="30" rows="30"></textarea>
      </div>
    </div>

    <div class="footer-fixed">
      <div class="left">
        實付: <span>$ {{ order.orderTotalPrice }}</span>
      </div>
      <div class="tipsbtn" @click="submitOrder">提交訂單</div>
    </div>
  </div>
</template>

<script>
import { checkOrder, submitOrder } from '@/api/order'
export default {
  name: 'PayIndex',
  data() {
    return {
      order: {},
      personal: {},
      remark: '',
    }
  },
  computed: {
    mode() {
      return this.$route.query.mode
    },
    cartIds() {
      return this.$route.query.cartIds
    },
    goodsId() {
      return this.$route.query.goodsId
    },
    goodsSkuId() {
      return this.$route.query.goodsSkuId
    },
    goodsNum() {
      return this.$route.query.goodsNum
    },
  },
  methods: {
    async getOrderList() {
      if (this.mode === 'cart') {
        const {
          data: { order, personal },
        } = await checkOrder(this.mode, {
          cartIds: this.cartIds,
        })
        this.order = order
        this.personal = personal
      }
      if (this.mode === 'buyNow') {
        const {
          data: { order, personal },
        } = await checkOrder(this.mode, {
          goodsId: this.goodsId,
          goodsSkuId: this.goodsSkuId,
          goodsNum: this.goodsNum,
        })
        this.order = order
        this.personal = personal
      }
    },
    async submitOrder() {
      if (this.mode === 'cart') {
        await submitOrder(this.mode, {
          cartIds: this.cartIds,
          remark: this.remark,
        })
      }
      if (this.mode === 'buyNow') {
        await submitOrder(this.mode, {
          goodsId: this.goodsId,
          goodsSkuId: this.goodsSkuId,
          goodsNum: this.goodsNum,
          remark: this.remark,
        })
      }
      this.$toast('付款成功')
      this.$router.replace('/order')
    },
  },
  created() {
    this.getOrderList()
  },
}
</script>

<style lang="scss" scoped>
.pay {
  padding-top: 46px;
  padding-bottom: 46px;
}

.address {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  font-size: 14px;
  color: #666;
  position: relative;
  border-bottom: 1px solid red;
  .left-icon {
    margin-right: 20px;
  }
  .right-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-7px);
  }
}

.goods-item {
  height: 100px;
  display: flex;
  margin-bottom: 6px;
  padding: 10px;
  .left {
    width: 100px;
    img {
      display: block;
      width: 80px;
      margin: 10px auto;
    }
  }
  .right {
    flex: 1;
    font-size: 14px;
    line-height: 1.3;
    padding: 10px;
    padding-right: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: #333;
    .info {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      .price {
        color: #fa2209;
      }
    }
  }
}

.flow-num-box {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  font-size: 14px;
  border-bottom: 1px solid #efefef;
  .money {
    color: #fa2209;
  }
}

.pay-cell {
  font-size: 14px;
  padding: 10px 12px;
  color: #333;
  display: flex;
  justify-content: space-between;
  .red {
    color: #fa2209;
  }
}

pay-detail {
  border-bottom: 1px solid #efefef;
}

.pay-way {
  font-size: 14px;
  padding: 10px 12px;
  border-bottom: 1px solid #efefef;
  color: #333;
  .tit {
    line-height: 30px;
  }
  .pay-cell {
    padding: 10px 0;
  }
  .van-icon {
    font-size: 20px;
    margin-right: 5px;
  }
}

.buytips {
  display: block;
  textarea {
    width: 100%;
    border: none;
    font-size: 14px;
    padding: 12px;
    height: 100px;
  }
}

.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 46px;
  line-height: 46px;
  border-top: 1px solid #efefef;
  font-size: 14px;
  display: flex;
  .left {
    flex: 1;
    padding-left: 12px;
    color: #666;
    span {
      color: #fa2209;
    }
  }
  .tipsbtn {
    width: 121px;
    background: linear-gradient(90deg, #f9211c, #ff6335);
    color: #fff;
    text-align: center;
    height: 46px;
    line-height: 46px;
    display: block;
    font-size: 14px;
  }
}
</style>
