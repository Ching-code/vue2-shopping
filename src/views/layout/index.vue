<template>
  <div>
    <router-view></router-view>
    <van-tabbar route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to="/home" icon="home-o">首頁</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分類頁</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o">購物車</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">個人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
}
</script>

<style></style>
