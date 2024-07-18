<template>
  <div class="user">
    <div class="head-page" v-if="isLogin">
      <div class="head-img">
        <img src="@/assets/defalutAvatar.png" alt="" />
      </div>
      <div class="info">
        <div class="mobile">{{ detail.mobile }}</div>
        <div class="vip">
          <van-icon name="diamond-o">普通會員</van-icon>
        </div>
      </div>
    </div>

    <div class="head-page" v-else @click="$router.push('/login')">
      <div class="head-img">
        <img src="@/assets/defalutAvatar.png" alt="" />
      </div>
      <div class="info">
        <div class="mobile">未登入</div>
        <div class="words">點擊登入</div>
      </div>
    </div>

    <div class="my-asset">
      <div class="asset-left">
        <div class="asset-left-item">
          <span>{{ detail.balance || 0 }}</span>
          <span>帳戶餘額</span>
        </div>
        <div class="asset-left-item">
          <span>0</span>
          <span>積分</span>
        </div>
        <div class="asset-left-item">
          <span>0</span>
          <span>優惠券</span>
        </div>
      </div>
      <div class="asset-right">
        <div class="asset-right-item">
          <van-icon name="balance-pay"></van-icon>
          <span>我的錢包</span>
        </div>
      </div>
    </div>

    <div class="order-navbar">
      <div class="order-navbar-item" @click="$router.push('/order?dataType=all')">
        <van-icon name="balance-list-o"></van-icon>
        <span>全部訂單</span>
      </div>
      <div class="order-navbar-item" @click="$router.push('/order?dataType=payment')">
        <van-icon name="clock-o"></van-icon>
        <span>待支付</span>
      </div>
      <div class="order-navbar-item" @click="$router.push('/order?dataType=delivery')">
        <van-icon name="logistics"></van-icon>
        <span>待發貨</span>
      </div>
      <div class="order-navbar-item" @click="$router.push('/order?dataType=received')">
        <van-icon name="send-gift-o"></van-icon>
        <span>待收貨</span>
      </div>
    </div>

    <div class="service">
      <div class="title">我的服務</div>
      <div class="content">
        <div class="content-item">
          <van-icon name="records"></van-icon>
          <span>收貨地址</span>
        </div>
        <div class="content-item">
          <van-icon name="gift-o"></van-icon>
          <span>領券中心</span>
        </div>
        <div class="content-item">
          <van-icon name="gift-card-o"></van-icon>
          <span>優惠券</span>
        </div>
        <div class="content-item">
          <van-icon name="question-o"></van-icon>
          <span>我的幫助</span>
        </div>
        <div class="content-item">
          <van-icon name="balance-o"></van-icon>
          <span>我的積分</span>
        </div>
        <div class="content-item">
          <van-icon name="refund-o"></van-icon>
          <span>退貨/售後服務</span>
        </div>
      </div>
    </div>

    <div class="logout-btn">
      <button @click="logout">登出</button>
    </div>
  </div>
</template>

<script>
import { getUserInfoDetail } from '@/api/user'
export default {
  name: 'UserIndex',
  data() {
    return {
      detail: {},
    }
  },
  created() {
    if (this.isLogin) {
      this.getUserInfoDetail()
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.token
    },
  },
  methods: {
    async getUserInfoDetail() {
      const {
        data: { userInfo },
      } = await getUserInfoDetail()
      this.detail = userInfo
    },
    logout() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '確定要登出嗎?',
        })
        .then(() => {
          this.$store.dispatch('user/logout')
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="scss" scoped>
.user {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding-bottom: 50px;
}

.head-page {
  height: 130px;
  display: flex;
  align-items: center;
  background-color: #faedc9;
  .head-img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.info {
  .mobile {
    margin-bottom: 5px;
    color: #c59a46;
    font-size: 18px;
    font-weight: bold;
  }
  .vip {
    display: inline-block;
    background-color: #3c3c3c;
    padding: 3px 5px;
    border-radius: 5px;
    color: #e0d3b6;
    font-size: 14px;
    .van-icon {
      font-weight: bold;
      color: #ffb632;
    }
  }
}

.my-asset {
  display: flex;
  padding: 20px 0;
  font-size: 14px;
  background-color: #fff;
  .asset-left {
    display: flex;
    justify-content: space-evenly;
    flex: 3;
    .asset-left-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span:first-child {
        margin-bottom: 5px;
        color: #ff0000;
        font-size: 16px;
      }
    }
  }
  .asset-right {
    flex: 1;
    .asset-right-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .van-icon {
        font-size: 24px;
        margin-bottom: 5px;
      }
    }
  }
}

.order-navbar {
  display: flex;
  padding: 15px 0;
  margin: 10px;
  font-size: 14px;
  background-color: #fff;
  border-radius: 5px;
  .order-navbar-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;
    .van-icon {
      font-size: 24px;
      margin-bottom: 5px;
    }
  }
}

.service {
  font-size: 14px;
  background-color: #fff;
  border-radius: 5px;
  margin: 10px;
  .title {
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    font-size: 16px;
  }
  .content {
    display: flex;
    justify-self: flex-start;
    flex-wrap: wrap;
    font-size: 14px;
    background-color: #fff;
    border-radius: 5px;
    .content-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 25%;
      margin-bottom: 20px;
      .van-icon {
        font-size: 24px;
        margin-bottom: 5px;
        color: #ff3800;
      }
    }
  }
}

.logout-btn {
  button {
    width: 60%;
    margin: 10px auto;
    display: block;
    font-size: 13px;
    color: #616161;
    border-radius: 9px;
    border: 1px solid #dcdcdc;
    padding: 7px 0;
    text-align: center;
    background-color: #fafafa;
  }
}
</style>
