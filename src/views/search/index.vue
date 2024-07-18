<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)"></van-nav-bar>

    <van-search v-model.trim="searchValue" show-action placeholder="輸入搜索關鍵詞" clearable>
      <template #action>
        <div @click="goSearch(searchValue)">搜索</div>
      </template>
    </van-search>

    <div class="search-history" v-if="history.length > 0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon @click="clearHistory" name="delete-o" siz="16"></van-icon>
      </div>
      <div class="list">
        <div v-for="item in history" :key="item" class="list-item" @click="goSearch(item)">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistoryList, setHistoryList } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data() {
    return {
      searchValue: '',
      history: getHistoryList(),
    }
  },
  methods: {
    goSearch(key) {
      // const index = this.history.indexOf(key)
      // if (index !== -1) {
      //   this.history.splice(index, 1)
      // }
      if (key) {
        this.history = this.history.filter((item) => item !== key)
        this.history.unshift(key)
        setHistoryList(this.history)
        this.searchValue = ''
        this.$router.push(`/searchlist?search=${key}`)
      }
    },
    clearHistory() {
      setHistoryList([])
      this.history = []
    },
  },
}
</script>

<style lang="scss" scoped>
.van-search--show-action {
  padding: 10px 12px;
}
::v-deep .van-search__action {
  background-color: #c21401;
  color: #fff;
  padding: 0 15px;
  border-radius: 0 5px 5px 0;
}
::v-deep .van-icon-arrow-left {
  color: #333;
}
.title {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
}
.list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0 10px;
  gap: 5%;
}
.list-item {
  width: 30%;
  text-align: center;
  padding: 7px;
  line-height: 15px;
  border-radius: 50px;
  background: #fff;
  font-size: 13px;
  border: 1px solid #efefef;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 10px;
}
</style>
