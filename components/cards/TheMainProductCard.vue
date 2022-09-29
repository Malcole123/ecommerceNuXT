<template>
  <div class="product-card-body">
    <div
      class="product-image"
      :style="`background-image:url('${image}');`"
    ></div>
    <div class="product-details">
      <h2 class="product-name">{{ name }}</h2>
      <p class="product-description">{{ productDescription }}</p>
      <div class="product-process">
        <span class="product-pricing">{{
            '$ ' + price
        }}</span>
        <AddCartButton @click="addToCart()"/>
      </div>
    </div>
  </div>
</template>
<script>
import AddCartButton from "../Buttons/AddCartButton.vue"
export default {
  components: { AddCartButton },
  setup() {},
  props:{
    name:{
      type:String,
      required:true,
      default:"Test Here"
    },
    image:{
      type:String,
      required:true,
      default:"/"
    },
    description:{
      type:String,
      required:true,
      default:"loremIpsum"
    },
    price:{
      type:Number,
      required:true,
      default:123
    }
  },
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
  methods:{
      currencyFormatter(str_){
        return `$ ${str_}`
      },

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
  cursor:pointer;
}

.product-image {
  background-size: 50%;
  background-position: center;
  background-color: white;
  background-repeat:no-repeat;
  width: 100%;
  height: 240px;
  border-radius: 8px;
}
.product-image:hover{
  background-size:contain;
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
