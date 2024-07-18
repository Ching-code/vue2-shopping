<template>
  <div class="home">
    <van-nav-bar title="商城首頁" fixed></van-nav-bar>
    <van-search shape="round" @click="$router.push('/search')" />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#ccc">
      <van-swipe-item v-for="item in swipeData" :key="item.imgUrl">
        <img :src="item.imgUrl" alt="" />
      </van-swipe-item>
    </van-swipe>
    <van-grid column-num="5" icon-size="40">
      <van-grid-item v-for="item in gridData" :key="item.imgUrl" :icon="item.imgUrl" :text="item.text" />
    </van-grid>

    <div class="main">
      <img :src="mainImgUrl" alt="" />
    </div>

    <div v-if="isLoaded" class="guess">
      <p class="guess-title">--猜你喜歡--</p>
      <div class="good-list"></div>
    </div>
    <GoodsItem v-for="item in goods" :key="item.goods_id" :item="item"></GoodsItem>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem'
import { getHomeData } from '@/api/home'
export default {
  components: { GoodsItem },
  name: 'HomeIndex',
  data() {
    return {
      swipeData: [],
      gridData: [],
      mainImgUrl: '',
      goods: [],
      isLoaded: false,
    }
  },
  async created() {
    const {
      data: { pageData },
    } = await getHomeData()
    this.isLoaded = true
    this.swipeData = pageData.items[1].data
    this.gridData = pageData.items[3].data
    this.mainImgUrl = pageData.items[4].data[0].imgUrl
    this.goods = pageData.items[6].data
  },
}
</script>

<style lang="scss" scoped>
.home {
  padding-top: 100px;
  padding-bottom: 50px;
}
.van-nav-bar {
  background: rgb(255, 89, 89);
  z-index: 999;
  ::v-deep .van-nav-bar__title {
    color: #fff;
  }
}
.van-search {
  position: fixed;
  top: 46px;
  width: 100%;
  z-index: 999;
}
.my-swipe .van-swipe-item {
  color: #ccc;
  font-size: 20px;
  height: 185px;
  line-height: 185px;
  text-align: center;
  background-color: #ffffff;
  img {
    display: block;
    width: 100%;
  }
}
.main img {
  display: block;
  width: 100%;
}

.guess .guess-title {
  height: 40px;
  line-height: 40px;
  text-align: center;
}

.goods-list {
  background-color: #f6f6f6;
}
</style>
