<template>
    <form class="address-form" @submit.prevent="submitAddressForm">
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
        address:{
            ship_username:"",
            ship_street:"",
            ship_city:"",
            ship_state:"",
        }
    }
  },
  methods:{
      submitAddressForm(){
        this.$emit('successFullSubmit')
      },

  }
}
</script>
<style scoped>
  .address-form{
    width:60%;
    display:flex;
    flex-direction:column;
    gap:8px;
  }
  @media(max-width:768px){
    .address-form{
      width:90%;
    }
  }
</style>
