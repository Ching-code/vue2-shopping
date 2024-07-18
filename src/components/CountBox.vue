<template>
  <div class="count-box">
    <button @click="handleMinus()" class="minus">-</button>
    <input :value="value" @change="handleChange" type="number" inputmode="numeric" class="input" />
    <button @click="handleAdd()" class="add">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    handleMinus() {
      if (this.value <= 1) return
      this.$emit('input', this.value - 1)
    },
    handleAdd() {
      this.$emit('input', this.value + 1)
    },
    handleChange(e) {
      const num = +e.target.value
      if (isNaN(num) || num < 0 || !Number.isInteger(num)) {
        e.target.value = this.value
        return
      }
      this.$emit('input', num)
    },
  },
}
</script>

<style lang="scss" scoped>
.count-box {
  width: 110px;
  display: flex;
  .add,
  .minus {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .input {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
