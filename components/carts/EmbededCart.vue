<template>
  <div class="cart" :class="calc">
      <h2 class="cart-heading">Cart</h2>
      <div class="cart-display">
        <CartCard v-for="(cItem,index) in cart" :key="'cart-list-item' + index" :prodName="cItem.name" :prodImg="cItem.image"/>
      </div>
      <div class="cart-checkout">
          <div class="w-100 d-flex justify-content-between">
            <h2>Total</h2>
            <h2>{{"$" + cartTotal}}</h2>
          </div>
          <div class="w-100 mt-2">
              <button type="button" class="w-100 btn btn-dark">Checkout</button>
          </div>
      </div>
  </div>
</template>
<script>
import CartCard from '../cards/CartCard.vue';
export default {
    props: {
        calc: {
            type: String,
            required: false,
            default: "",
        },
    },
    setup() {
    },
    mounted() {
        //Load Cart from Local
        this.$store.commit("cart/loadFromLocal");
        this.cart = this.$store.getters["cart/getCart"];
        this.cartTotal = this.cart.reduce((total, currentValue, index)=>{
            return total + (currentValue.quantity * currentValue.price)
        });
        console.log(this.cartTotal)

    },
    data() {
        return {
            cart: [],
            cartTotal:0,
        };
    },
    components: { CartCard }
}
</script>
<style scoped>
.cart {
  width: 100%;
  height: 96vh;
  background: white;
  position: sticky;
  top: 1%;
  border-radius: 8px;
  padding: 10px 14px;
}

.cart-heading{
  font-size:1.6em;
}

.cart-display{
  margin-top:25px;
  width:100%;
  height:80%;
  overflow-y:scroll;
}

.cart-checkout{
  padding:12px 0px;
}

.cart-checkout h2{
  font-size:1.5em;
  font-weight:500;
}


</style>
