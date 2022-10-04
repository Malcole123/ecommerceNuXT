<template>
  <div class="w-100">
    <div class="quantity_control">
        <div class="decrease_btn bg-dark text-white"  @click="()=>{this.$emit('productDecreased')}">-</div>
        <div class="quant_display">{{quantity}}</div>
        <div class="increase_btn bg-dark text-white" @click="()=>{this.$emit('productIncreased')}">+</div>
    </div>
  </div>
</template>
<script>
export default {
  setup() {

  },
  emits:['productIncreased', 'productDecreased'],
  props:{
    quantity:{
      type:Number,
      default:1,
      required:true,
    }
  }
}
</script>
<style scoped>
  .quantity_control{
    width:100%;
    background:white;
    border:1px solid black;
    border-radius:4px;
    height:32px;
    display:grid;
    grid-template-columns:1fr 2fr 1fr;
  }
  .quantity_control > *{
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
  }

</style>
