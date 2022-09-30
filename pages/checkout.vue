<template>
  <div class="main-app-body">
      <TheSidebar/>
      <div class="product-info-area">
        Hello WOrld
      </div>
      <div class="cart-area">
        <EmbededCart/>
      </div>
  </div>
</template>

<script>
export default {
  setup() {

  },
}
</script>
<style>
  .main-app-body {
  width: 100%;
  height: 100vh;
  padding: 1% 8%;
  padding-left: 130px;
  display: flex;
  align-items: flex-start;
}
.product-info-area{
  width:70%;
}
.cart-area{
  width:30%;
}
</style>
