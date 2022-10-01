<template>
  <div class="cart" :class="calc">
    <div class="w-100 d-flex justify-content-between">
      <h2 class="cart-heading">Cart</h2>
      <button type="button" class="btn btn-close d-lg-none d-md-block d-sm-block" @click="closeCart">Close&nbsp;&#10006;</button>
    </div>
      <div class="cart-display" v-if="currentCart.length > 0">
        <CartCard v-for="(cItem,index) in currentCart" :key="'cart-list-item' + index" :prodName="cItem.name" :prodImg="cItem.image" :quantity="cItem.quantity" :price="cItem.price" :prodID="cItem.uid"/>
      </div>
      <div class="cart-checkout" v-if="currentCart.length > 0">
          <div class="w-100 d-flex justify-content-between">
            <h2>Total</h2>
            <h2>{{"$ " + cartTotalCalc_ }}</h2>
          </div>
          <div class="w-100 mt-1">
              <NuxtLink to="/checkout"><button type="button" class="w-100 btn btn-dark">Checkout</button></NuxtLink>
              <button type="button" class="w-100 btn btn-outline-dark mt-1" @click="clearCart">Clear</button>
          </div>
      </div>
      <div class="empty-cart-display" v-if="currentCart.length === 0">
        <strong>Your Cart is Empty</strong>
      </div>
  </div>
</template>
<script>
import CartCard from '../cards/CartCard.vue';
export default {
    emits:['cartClosed'],
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
    },
    data() {
        return {
            cart: [],
            cartTotal:0,
        };
    },
    computed:{
      cartTotalCalc_(){
          let c_ =  this.$store.getters["cart/getCart"];
          if(c_.length === 0){
            return 0
          }
          let total_ = 0;
          [...c_].forEach((cItem_, index)=>{
              let cItemTotal = parseInt(cItem_.quantity) * parseFloat(cItem_.price)
              total_ += cItemTotal
          })

          return total_.toFixed(2)
      },
      currentCart(){
        let cart_  = this.$store.getters["cart/getCart"];
        return cart_
      }
    },
    methods:{
        clearCart(){
          this.$store.commit('cart/clear');
          this.cart = [];
          setTimeout(()=>{
            this.closeCart()
          }, 400)
        },
        closeCart(){
          this.$emit('cartClosed')
        }
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

@media(max-width:968px){
  .show-cart .cart{
    width:100%;
    height:100%;
    position:static;
    top:0%;
    left:0%;
    right:0%;
    border-radius:0px;
  }
}

.cart-heading{
  font-size:1.6em;
}

.cart-display{
  margin-top:15px;
  width:100%;
  height:75%;
  overflow-y:scroll;
}

.cart-checkout{
  padding:12px 0px;
  height:25%;
}

.cart-checkout h2{
  font-size:1.5em;
  font-weight:500;
}

.empty-cart-display{
  height:100%;
  background-image:url('../../static/empy_cart.svg');
  background-size:contain;
  background-position:center;
  background-repeat:no-repeat;
}


</style>
