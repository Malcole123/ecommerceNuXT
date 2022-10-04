<template>
    <div class="cart-card">
        <div class="cart-card-image" :style="`background-image:url('${prodImg}')`"></div>
        <div class="cart-card-detail">
          <p>{{prodName}}</p>
          <strong>{{`${quantity} x $ ${pricePrettier}`}}</strong>
        </div>
        <div class="d-flex justify-content-end align-items-center">
          <div class="d-block" @click="removeItem" style="cursor:pointer">
            <TrashIcon/>
          </div>
        </div>
    </div>
</template>

<script>
import anymatch from 'anymatch';
import TrashIcon from '../icons/TrashIcon.vue';
export default ({
  components:{ TrashIcon,},
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
    removeItem(){
      this.$emit('deleteClicked')
    }
 }
})
</script>


<style scoped>
  .cart-card{
    width:100%;
    display:grid;
    grid-template-columns:1fr 3fr 1fr;
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
  }
</style>
