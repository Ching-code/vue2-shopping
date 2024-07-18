<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)"></van-nav-bar>

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="querySearch || '搜索'"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon @click="$router.push('/category')" class="tool" name="apps-o"></van-icon>
      </template>
    </van-search>

    <div class="sort-btns">
      <div class="sort-item" @click="getList()">綜合</div>
      <div class="sort-item" @click="getList('sales')">銷量</div>
      <div class="sort-item" @click="getList('price')">價格</div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in productList" :key="item.goodsId" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getProductList } from '@/api/product'
export default {
  name: 'SearchListIndex',
  components: {
    GoodsItem,
  },
  data() {
    return {
      page: 1,
      productList: [],
    }
  },
  computed: {
    querySearch() {
      return this.$route.query.search
    },
  },
  created() {
    this.getList()
  },
  methods: {
    async getList(sortType) {
      const {
        data: { list },
      } = await getProductList({
        categoryId: this.$route.query.categoryId,
        sortType,
        goodsName: this.querySearch,
        page: this.page,
      })
      this.productList = list.data
    },
  },
}
</script>

<style lang="scss" scoped>
.search {
  padding-top: 46px;

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

.goods-list {
  background-color: #f6f6f6;
}
</style>
