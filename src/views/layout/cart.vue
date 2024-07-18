<template>
  <div class="cart">
    <van-nav-bar title="購物車" fixed></van-nav-bar>

    <div v-if="isLogin && cartList.length > 0">
      <div class="cart-title">
        <span class="all"
          >共<i>{{ cartTotal }}</i
          >件商品</span
        >
        <span class="edit" @click="isEdit = !isEdit"><van-icon name="edit"></van-icon>編輯</span>
      </div>

      <div class="cart-list">
        <div class="cart-item" v-for="item in cartList" :key="item.goods_id">
          <van-checkbox :value="item.isChecked" @click="toggleCheck(item.goods_id)"></van-checkbox>
          <div class="show">
            <img :src="item.goods.goods_image" alt="" />
          </div>
          <div class="info">
            <span class="tit text-ellipsis-2">{{ item.goods.goods_name }}</span>
            <span class="bottom">
              <div class="price">
                $ <span>{{ item.goods.goods_price_min }}</span>
              </div>
              <CountBox
                @input="(value) => changeCount(value, item.goods_id, item.goods_sku_id)"
                :value="item.goods_num"
              ></CountBox>
            </span>
          </div>
        </div>
      </div>

      <div class="footer-fixed">
        <div @click="toggleAllCheck" class="all-check">
          <van-checkbox :value="isAllChecked" icon-size="18"></van-checkbox>
          全選
        </div>
        <div class="all-total">
          <div class="price">
            <span>合計</span>
            <span
              >$ <i class="totalPrice">{{ selectedTotalPrice }}</i></span
            >
          </div>
          <div v-if="!isEdit" class="goPay" :class="{ disabled: selectedCount === 0 }" @click="goPay">
            結算({{ selectedCount }})
          </div>
          <div v-else class="delete" :class="{ disabled: selectedCount === 0 }" @click="handleDelete">刪除</div>
        </div>
      </div>
    </div>

    <div v-else class="empty-cart">
      <img class="empty-cart-img" src="@/assets/empty-cart.png" alt="" />
      <div class="tips">購物車是空的</div>
      <div class="btn" @click="$router.push('/')">去逛逛</div>
    </div>
  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'CartIndex',
  components: {
    CountBox,
  },
  data() {
    return {
      isEdit: false,
    }
  },
  methods: {
    toggleCheck(goodsId) {
      this.$store.commit('cart/toggleCheck', goodsId)
    },
    toggleAllCheck() {
      this.$store.commit('cart/toggleAllCheck', !this.isAllChecked)
    },
    changeCount(goodsNum, goods_id, goods_sku_id) {
      this.$store.dispatch('cart/changeCountAction', {
        goodsNum,
        goods_id,
        goods_sku_id,
      })
    },
    handleDelete() {
      if (this.selectedCount === 0) return
      this.$store.dispatch('cart/deleteSelectedCartItemAction').then(() => {
        this.isEdit = false
      })
    },
    goPay() {
      if (this.selectedCount > 0) {
        this.$router.push({
          path: '/pay',
          query: {
            mode: 'cart',
            cartIds: this.selectedCartList.map((item) => item.id).join(','),
          },
        })
      }
    },
  },
  computed: {
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['cartTotal', 'selectedCartList', 'selectedCount', 'selectedTotalPrice', 'isAllChecked']),
    isLogin() {
      return this.$store.getters.token
    },
  },
  watch: {
    isEdit(value) {
      if (value) {
        this.$store.commit('cart/toggleAllCheck', false)
      } else {
        this.$store.commit('cart/toggleAllCheck', true)
      }
    },
  },
  created() {
    if (this.isLogin) {
      this.$store.dispatch('cart/getCartAction')
    }
  },
}
</script>

<style lang="scss" scoped>
.cart {
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.cart-title {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  font-size: 14px;
  .all {
    i {
      font-style: normal;
      margin: 0 2px;
      color: #fa2209;
      font-size: 16px;
    }
  }
  .edit {
    .van-icon {
      font-size: 18px;
    }
  }
}

.cart-item {
  margin: 0 10px 10px 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 5px;
  .van-checkbox {
    padding-right: 15px;
  }
  .show img {
    width: 100px;
    height: 100px;
  }
  .info {
    width: 210px;
    padding: 10px 5px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .bottom {
      display: flex;
      justify-content: space-between;
      .price {
        display: flex;
        align-items: flex-end;
        color: #fa2209;
        font-size: 12px;
        span {
          font-size: 16px;
        }
      }
    }
  }
}

.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 50px;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  .all-check {
    display: flex;
    align-items: center;
    .van-checkbox {
      margin-right: 5px;
    }
  }
  .all-total {
    display: flex;
    line-height: 36px;
    .price {
      font-size: 14px;
      margin-right: 10px;
      .totalPrice {
        color: #fa2209;
        font-size: 18px;
        font-style: normal;
      }
    }
  }

  .goPay,
  .delete {
    min-width: 100px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 14px;
    background-color: #fa2f21;
    color: #fff;
    border-radius: 18px;
    &.disabled {
      background-color: #ff9779;
    }
  }
}

.empty-cart {
  padding: 80px 30px;
  .empty-cart-img {
    width: 140px;
    height: 140px;
    display: block;
    margin: 0 auto;
    filter: opacity(0.5);
  }
  .tips {
    text-align: center;
    color: #666;
    margin: 30px;
  }
  .btn {
    width: 110px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #fa2c20;
    border-radius: 16px;
    color: #fff;
    display: block;
    margin: 0 auto;
  }
}
</style>
