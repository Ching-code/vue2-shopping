<template>
  <div class="product_detail">
    <van-nav-bar title="商品詳情" left-arrow fixed @click-left="$router.go(-1)"></van-nav-bar>

    <van-swipe :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="image in images" :key="image.file_id">
        <img :src="image.external_url" alt="" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }} / {{ images.length }}</div>
      </template>
    </van-swipe>

    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">${{ detail.goods_price_min }}</span>
          <span class="old">${{ detail.goods_price_max }}</span>
        </div>
        <div class="sellcount">已售 {{ detail.goods_sales }} 件</div>
      </div>

      <div class="msg text-ellipsis-2">{{ detail.goods_name }}</div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed"></van-icon>七天無理由退貨</span>
          <span><van-icon name="passed"></van-icon>48小時發貨</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow"></van-icon>
        </div>
      </div>
    </div>

    <div class="comment">
      <div class="comment-title">
        <div class="left">商品評價 {{ total }} 條</div>
        <div class="right">查看更多<van-icon name="arrow"></van-icon></div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in commentList" :key="item.comment_id">
          <div class="top">
            <img :src="item.user.avatar_url || defaultAvatar" alt="" />
            <div class="name">{{ item.user.nick_name }}</div>
          </div>
          <van-rate :size="16" :value="item.score / 2" color="#ffd21e" void-icon="star" void-color="#eee"></van-rate>
          <div class="content">{{ item.content }}</div>
          <div class="time">{{ item.create_time }}</div>
        </div>
      </div>
    </div>

    <div class="desc" v-html="detail.content"></div>

    <div class="footer">
      <div class="icon-home" @click="$router.push('/')">
        <van-icon name="wap-home-o"></van-icon>
        <span>首頁</span>
      </div>
      <div class="icon-cart" @click="$router.push('/cart')">
        <span class="num"></span>
        <van-icon v-if="cartTotal === 0" name="shopping-cart-o"></van-icon>
        <van-icon v-else name="shopping-cart-o" :badge="cartTotal"></van-icon>
        <span>購物車</span>
      </div>
      <button class="btn-add" @click="addCartAction">加入購物車</button>
      <button class="btn-buy" @click="buyNowAction">直接購買</button>
    </div>

    <van-action-sheet v-model="showPannel" :title="mode === 'cart' ? '加入購物車' : '直接購買'">
      <div class="product">
        <div class="product-title">
          <div class="left">
            <img :src="detail.goods_image" alt="" />
          </div>
          <div class="right">
            <div class="price">
              <span>$</span>
              <span class="nowprice">{{ detail.goods_price_min }}</span>
            </div>
            <div class="count">
              <span>庫存</span>
              <span>{{ detail.stock_total }}</span>
            </div>
          </div>
        </div>
        <div class="num-box">
          <span>數量</span>
          <CountBox v-model="addCount"></CountBox>
        </div>
        <div class="showbtn" v-if="detail.stock_total > 0">
          <div class="btn" v-if="mode === 'cart'" @click="addCart">加入購物車</div>
          <div class="btn now" v-else @click="buyNow">立即購買</div>
        </div>
        <div class="btn-done" v-else>商品已售完</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { getProductDetail, getProductComment } from '@/api/product'
import defaultAvatar from '@/assets/defalutAvatar.png'
import CountBox from '@/components/CountBox'
import { addCart } from '@/api/cart'
import loginConfirm from '@/mixins/loginConfirm'
export default {
  name: 'ProductIndex',
  components: {
    CountBox,
  },
  mixins: [loginConfirm],
  data() {
    return {
      images: [],
      current: 0,
      detail: {},
      total: 0,
      commentList: [],
      defaultAvatar,
      showPannel: false,
      mode: 'cart',
      addCount: 1,
      cartTotal: 0,
    }
  },
  computed: {
    goodsId() {
      return this.$route.params.id
    },
  },
  methods: {
    onChange(index) {
      this.current = index
    },
    async getDetail() {
      const {
        data: { detail },
      } = await getProductDetail(this.goodsId)
      this.detail = detail
      this.images = detail.goods_images
    },
    async getComment() {
      const {
        data: { list, total },
      } = await getProductComment(this.goodsId, 5)
      this.commentList = list
      this.total = total
    },
    addCartAction() {
      this.mode = 'cart'
      this.showPannel = true
    },
    buyNowAction() {
      this.mode = 'buyNow'
      this.showPannel = true
    },
    async addCart() {
      if (this.loginConfirm()) return
      const { data } = await addCart(this.goodsId, this.addCount, this.detail.skuList[0].goods_sku_id)
      this.cartTotal = data.cartTotal
      this.$toast('成功加入購物車')
      this.showPannel = false
    },
    buyNow() {
      if (this.loginConfirm()) return
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'buyNow',
          goodsId: this.goodsId,
          goodsSkuId: this.detail.skuList[0].goods_sku_id,
          goodsNum: this.addCount,
        },
      })
    },
  },
  created() {
    this.getDetail()
    this.getComment()
  },
}
</script>

<style lang="scss" scoped>
.product_detail {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  img {
    display: block;
    width: 100%;
  }
  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }
}

.desc {
  width: 100%;
  overflow: scroll;
  ::v-deep img {
    display: block;
    width: 100% !important;
  }
}

.info {
  padding: 10px;
  .title {
    display: flex;
    justify-content: space-between;
    .now {
      color: #fa2209;
      font-size: 20px;
    }
    .old {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }
    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }
  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }
  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;
    .left-words {
      span {
        margin-right: 10px;
      }
      .van-icon {
        margin-right: 4px;
        color: #fa2009;
      }
    }
  }
}

.comment {
  padding: 10px;
  .comment-title {
    display: flex;
    justify-content: space-between;
    .right {
      color: #959595;
    }
  }
  .comment-item {
    font-size: 16px;
    line-height: 30px;
    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      img {
        width: 20px;
        height: 20px;
      }
      .name {
        margin: 0 10px;
      }
    }
    .time {
      color: #999;
    }
  }
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 55px;
  background-color: #fff;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  .icon-home,
  .icon-cart {
    height: 36px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    .van-icon {
      font-size: 24px;
    }
  }
  .btn-add,
  .btn-buy {
    height: 36px;
    line-height: 36px;
    width: 120px;
    border-radius: 18px;
    background-color: #ffa900;
    text-align: center;
    color: #fff;
    font-size: 14px;
    border: none;
  }
  .btn-buy {
    background-color: #fe5630;
  }
}

// ActionSheet style
.product {
  .product-title {
    display: flex;
    .left {
      margin: 10px;
      img {
        width: 90px;
        height: 90px;
      }
    }
    .right {
      flex: 1;
      padding: 10px;
      .price {
        font-size: 14px;
        color: #fe560a;
        .nowprice {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }
  }
}

.num-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.showbtn {
  .btn,
  .btn-none {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: #fff;
    background-color: #ffa900;
  }
  .btn.now {
    background-color: #fe5630;
  }
  .btn-none {
    background-color: #ccc;
  }
}
</style>
