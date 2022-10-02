<template>
  <form class="payment-form" @submit.prevent="submitPaymentForm">
    <slot></slot>
  </form>
</template>

<script>
export default {
setup() {

},
emits:['successFullSubmit', 'errorSubmission'],
data(){
  return {
      financial:{
          holder_name:"",
          card_number:"",
          expiry_date:"",
          cvc:"",
          default:false,
      }
  }
},
methods:{
    submitPaymentForm(){
      this.$emit('successFullSubmit')
    },

}
}
</script>
<style scoped>
.payment-form{
  width:60%;
  display:flex;
  flex-direction:column;
  gap:8px;
}
@media(max-width:768px){
  .payment-form{
    width:90%;
  }
}
</style>
