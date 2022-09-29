<template>
  <div class="product-card-body">
    <div
      class="product-image"
      :style="`background-image:url('${productImage.url}');`"
    ></div>
    <div class="product-details">
      <h2 class="product-name">{{ productName }}</h2>
      <p class="product-description">{{ productDescription }}</p>
      <div class="product-process">
        <span class="product-pricing">{{
          productPrice.symbol + " " + productPrice.price
        }}</span>
        <AddCartButton />
      </div>
    </div>
  </div>
</template>
<script>
import AddCartButton from "../Buttons/AddCartButton.vue"
export default {
  components: { AddCartButton },
  setup() {},
  data() {
    return {
      imageStyle: "",
      productImage: {
        url: "",
      },
      productName: "Test Name",
      productDescription: "loremImposum",
      productPrice: {
        currency: "USD",
        symbol: "$",
        price: "129.99",
      },
    }
  },
  methods: {
    setCardStyle() {},
  },
}
</script>
<style scoped>
.product-card-body {
  width: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  gap: 10px;
}

.product-image {
  background-size: contain;
  background-position: center;
  background-color: white;
  width: 100%;
  height: 240px;
  border-radius: 8px;
}

.product-details {
  width: 100%;
  flex: 1;
  padding: 5px 0;
}

.product-name {
  font-size: 20px;
  font-weight: 500;
  color: #1a1f16;
}

.product-description {
  font-size: 16px;
  font-weight: 400;
  color: #60695c;
}

.product-process {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.product-pricing {
  font-weight: 600;
}
</style>
