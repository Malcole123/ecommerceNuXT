<template>
  <div class="cart" :class="calc">
    <h1>Cart</h1>
  </div>
</template>
<script>
export default {
  props: {
    calc: {
      type: String,
      required: false,
      default: "",
    },
  },
  setup() {},
}
</script>
<style scoped>
.cart {
  width: 100%;
  height: 60vh;
  background: white;
  position: sticky;
  top: 1%;
  border-radius: 8px;
  padding: 10px 14px;
}
</style>
