<template>
   <div class="w-100">
          <b-card title="ORDER SUMMARY">
              <hr>
              <ul class="w-100 app-list">
                <li class="w-100 d-flex justify-content-between align-items-center">
                  <h6>Item Count</h6>
                  <h6>{{cartSummary.itemCount}}</h6>
                </li>
                <li class="w-100 d-flex justify-content-between align-items-center">
                  <h6>Shipping</h6>
                  <h6>{{cartSummary.shipping}}</h6>
                </li>
                <li class="w-100 d-flex justify-content-between align-items-center">
                  <h6>GCT</h6>
                  <h6>{{cartSummary.gct}}</h6>
                </li>
                <li class="w-100 d-flex justify-content-between align-items-center">
                  <h6>Gift Card</h6>
                  <h6>{{cartSummary.giftCard}}</h6>
                </li>
              </ul>
              <hr>
              <div class="w-100 d-flex justify-content-between align-items-center">
                <h6>Total</h6>
                <h6>{{cartSummary.total}}</h6>
              </div>
              <hr>
              <div class="w-100">
                <DarkButtonVue :text="'Checkout'" :type="'button'"/>
              </div>
          </b-card>
      </div>
</template>
<script>
import DarkButtonVue from '../Buttons/DarkButton.vue';
import DarkOutlineButton from '../Buttons/DarkOutlineButton.vue';
export default {
    emits:['checkoutConfirm'],
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
      cartSummary(){
        let c_ =  this.$store.getters["cart/getCart"];
        let total_ = 0;
        let itemTotal = 0;
          [...c_].forEach((cItem_, index)=>{
              let cItemTotal = parseInt(cItem_.quantity) * parseFloat(cItem_.price);
              itemTotal += cItem_.quantity;
              total_ += cItemTotal
          })
        return {
          itemCount:itemTotal,
          shipping:"Not Available",
          gct:"Not Available",
          giftCard:"",
          total:`$ ${total_.toFixed(2)}`
        }
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
    components: {DarkButtonVue, DarkOutlineButton }
}
</script>
<style scoped>


</style>
