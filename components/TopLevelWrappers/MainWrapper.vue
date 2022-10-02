<template>
  <div :class="_class">
    <slot></slot>
  </div>
</template>
<script>
export default {
  setup() {

  },
  emits:['mounted'],
  props:{
    _class:{
      type:String,
      default:"/*BUG HERE*/",
      required:true,
    }
  },
  async mounted(){
    await this.$store.dispatch('products/getProductData');
    await this.$store.dispatch('user/loadfromLocal');
    await this.$store.dispatch("cart/loadFromLocal");
    this.$emit('mounted')
  }
}
</script>
