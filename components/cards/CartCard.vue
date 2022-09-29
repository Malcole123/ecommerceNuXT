<template>
    <div class="cart-card">
        <div class="cart-card-image" :style="`background-image:url('${prodImg}')`"></div>
        <div class="cart-card-detail">
          <p>{{prodName}}</p>
        </div>
    </div>
</template>

<script>
export default ({
  props:{
    prodName:{
      type:String,
      required:true,
      default:"test"
    },
    prodImg:{
      type:String,
      required:true,
      default:"test"
    }
  },
  setup() {

  },
})
</script>


<style scoped>
  .cart-card{
    width:100%;
    display:grid;
    grid-template-columns:1fr 3fr 1fr;
    gap:8px;
    padding:10px 0px;
  }

  .cart-card-image{
    height:4em;
    width:100%;
    border-radius:8px;
    background-size:contain;
    background-position:center;
    background-repeat:no-repeat;
    background-color:white;
  }

  .cart-card-detail{
    height:100%;
  }
</style>
