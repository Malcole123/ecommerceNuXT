<template>
    <div class="cart-card">
        <div class="cart-card-image" :style="`background-image:url('${prodImg}')`"></div>
        <div class="cart-card-detail">
          <p>{{prodName}}</p>
          <div class="row w-100">
              <div class="col-lg-6">
                <strong>{{pricePrettier}}</strong>
              </div>
              <div class="col-lg-6">
                <slot></slot>
              </div>
          </div>
        </div>
        <div class="d-flex justify-content-end align-items-center">
          <div class="d-block" @click="mutateCart('remove')" style="cursor:pointer">
            <TrashIcon/>
          </div>
        </div>
    </div>
</template>

<script>
import anymatch from 'anymatch';
import TrashIcon from '../icons/TrashIcon.vue';
export default ({
  components:{ TrashIcon},
  emits:['deleteClicked'],
  props:{
    prodID:{
      type:anymatch,
      required:true,
      default:"test"
    },
    prodName:{
      type:String,
      required:true,
      default:"test"
    },
    prodImg:{
      type:String,
      required:true,
      default:"test"
    },
    quantity:{
      type:anymatch,
      required:true,
      default:"test"
    },
    price:{
      type:anymatch,
      required:true,
      default:"test"
    }
  },
 computed:{
  pricePrettier(){
    let p_s = `${this.price}`;
    let p_a = p_s.split('.');
    return p_s.includes('.') && p_a[1].length <= 1 ? `$ ${p_s}0` : `$ ${p_s}`
  }
 },
 methods:{
    mutateCart(type){
      //Expected types => remove , increase_item, decrease_item
      switch(type){
        case "remove":
            this.$emit('deleteClicked')
          break
        case "increase_item":
          break
        case "decrease_item":
          break
      }
    }
 }
})
</script>


<style scoped>
  .cart-card{
    width:100%;
    display:grid;
    grid-template-columns:2fr 5fr 1fr;
    gap:8px;
    padding:10px 5px;
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
    width:100%;
  }
</style>
