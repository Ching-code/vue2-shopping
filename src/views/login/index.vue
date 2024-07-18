<template>
  <div class="login">
    <van-nav-bar title="會員登入" left-arrow @click-left="goBack" />
    <div class="container">
      <div class="title">
        <h3>手機登入</h3>
        <p>未註冊的手機號碼將自動註冊</p>
      </div>
      <form action="" class="form">
        <div class="form-item">
          <input v-model="phone" type="phone" maxlength="11" class="phone" placeholder="請輸入手機號碼" />
        </div>
        <div class="form-item">
          <input v-model="imgCode" type="text" maxlength="5" class="valid" placeholder="請輸入圖形驗證碼" />
          <img v-if="imgUrl" class="refresh" src="@/assets/refresh.png" @click="getImgCode" />
          <img v-if="imgUrl" :src="imgUrl" alt="" />
        </div>
        <div class="form-item">
          <input v-model="smsCode" type="text" class="valid" placeholder="請輸入手機驗證碼" />
          <button @click="getValidCode" class="valid-btn">
            {{ second === totalSecond ? '獲取驗證碼' : second + '秒後重新發送' }}
          </button>
        </div>
      </form>
      <button @click="login" class="login-btn">登入</button>
    </div>
  </div>
</template>

<script>
import { getImgCode, getCaptchaCode, validateCodeLogin } from '@/api/login'

export default {
  name: 'LoginIndex',
  data() {
    return {
      imgCode: '',
      imgKey: '',
      imgUrl: '',
      totalSecond: 10,
      second: 10,
      timer: null,
      phone: '',
      smsCode: '',
    }
  },
  methods: {
    async getImgCode() {
      const {
        data: { base64, key },
      } = await getImgCode()
      this.imgUrl = base64
      this.imgKey = key
    },
    async getValidCode() {
      if (!this.validation()) return
      if (!this.timer && this.second === this.totalSecond) {
        await getCaptchaCode(this.imgCode, this.imgKey, this.phone)
        this.$toast('手機驗證碼已發送，注意簡訊訊息')

        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },
    validation() {
      if (!/^1[3-9]\d{9}$/.test(this.phone)) {
        this.$toast('請輸入正確的手機號碼')
        return false
      }
      if (!/^\w{4}$/.test(this.imgCode)) {
        this.$toast('圖形驗證碼格式錯誤')
        return false
      }
      return true
    },
    goBack() {
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
    },
    async login() {
      if (!this.validation()) return
      // if (!/^\d{6}$/.test(this.smsCode)) {
      //   this.$toast('請輸入正確的驗證碼')
      //   return
      // }
      const res = await validateCodeLogin(this.phone, this.smsCode)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('登入成功')

      // 返回地址檢查判斷
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
    },
  },
  created() {
    this.getImgCode()
  },
  destroyed() {
    clearInterval(this.timer)
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 80dvh;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
}
.title {
  h3 {
    font-size: 24px;
  }
  p {
    color: #ccc;
    margin-top: 5px;
    font-size: 16px;
  }
}
.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .form-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding: 10px 5px;
    margin-bottom: 5px;
    input {
      border: none;
      outline: none;
      font-size: 16px;
      height: 32px;
    }
    .refresh {
      width: 32px;
      height: 32px;
      color: #333;
    }
    img {
      width: 70px;
      height: 32px;
      vertical-align: middle;
      object-fit: contain;
    }
    .valid-btn {
      font-size: 14px;
      text-decoration: none;
      color: #ffb45e;
      background: transparent;
      border: none;
      height: 32px;
      cursor: pointer;
    }
  }
}
.login-btn {
  width: 100%;
  padding: 10px 20px;
  background: #ffb45e;
  color: #fff;
  border: none;
  border-radius: 50rem;
  letter-spacing: 2px;
  font-size: 18px;
}
</style>
