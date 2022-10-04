<template>
  <div class="cart" :class="calc">
      <div class="cart-display" v-if="currentCart.length > 0">
        <CartCard v-for="(cItem,index) in currentCart" :key="'cart-list-item' + index" :prodName="cItem.name" :prodImg="cItem.image" :quantity="cItem.quantity" :price="cItem.price" :prodID="cItem.uid" @deleteClicked="removeCartItem(cItem.uid)"/>
      </div>
      <div class="cart-checkout mt-4" v-if="currentCart.length > 0">
          <div class="w-100 d-flex justify-content-between">
            <h2>Total</h2>
            <h2>{{"$ " + cartTotalCalc_ }}</h2>
          </div>

      </div>
      <div class="empty-cart-display" v-if="currentCart.length === 0">
        <strong>Your Cart is Empty</strong>
      </div>
  </div>
</template>
<script>
import CartCard from '../cards/CartCard.vue';
import DarkButtonVue from '../Buttons/DarkButton.vue';
import DarkOutlineButton from '../Buttons/DarkOutlineButton.vue';
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
      },
      checkoutRoute(){
        return '/checkout/review'
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
        },
        removeCartItem(prodID){
          this.$store.commit('cart/remove', {prodID});
        }
    },
    components: { CartCard, DarkButtonVue, DarkOutlineButton }
}
</script>
<style scoped>
.cart {
  width: 100%;
  min-height:300px;
  height:fit-content;
  background: white;
  transition:0.2s ease-in-out;
}

.cart-heading{
  font-size:1.6em;
}

.cart-display{
  margin-top:15px;
  width:100%;
  height:100%;
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
  height:230px;
  background-image:url('../../static/empy_cart.svg');
  background-size:contain;
  background-position:center;
  background-repeat:no-repeat;
  display:flex;
  align-items:flex-end;
  justify-content:center;
}
.empty-cart-display strong{
  position:absolute;
  bottom:5px;
}


</style>
