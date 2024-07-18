export default {
  methods: {
    loginConfirm() {
      if (!this.$store.getters.token) {
        this.$dialog
          .confirm({
            title: '提示',
            message: '需要登入',
            confirmButtonText: '去登入',
            cancelButtonText: '再逛逛',
          })
          .then(() => {
            // 登入後回來商品頁面需要帶參數
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath,
              },
            })
          })
          .catch(() => {
            this.$router.replace('/')
          })
        return true
      }
      return false
    },
  },
}
