<template>
  <div class="product-card-body">
    <NuxtLink :to="'/view_product?uid='+uid">
      <div
      class="product-image"
      :style="`background-image:url('${image}');`"
    ></div>
  </NuxtLink>
    <div class="product-details">
      <h2 class="product-name">{{ name }}</h2>
      <p class="product-description">{{ description }}</p>
      <div class="product-process">
        <span class="product-pricing">{{
            pricePrettier
        }}</span>
        <div class="add-cart-btn-sml" @click="addCartItem">
          <AddCartButton/>
        </div>
      </div>
    </div>
    <div class="preview-card">

    </div>
  </div>
</template>

<script>
import AddCartButton from "../Buttons/AddCartButton.vue"
export default {
  components: { AddCartButton },
  emits:['productAdded'],
  props:{
    uid:{
      type:String,
      required:true,
      default:"12345678"
    },
    name:{
      type:String,
      required:true,
      default:"Test Here"
    },
    image:{
      type:String,
      required:true,
      default:"/"
    },
    description:{
      type:String,
      required:true,
      default:"loremIpsum"
    },
    price:{
      type:Number,
      required:true,
      default:123
    }
  },
  data() {
    return {
      preview:{
        delay:500,
        lastFocus:0,
        mouse:{
          x:0,
          y:0,
        }
      }
    }
  },
  methods:{
      currencyFormatter(str_){
        return `$ ${str_}`
      },
      addCartItem(){
        this.$store.commit('cart/add', {
              prodID:this.uid,
              name:this.name,
              price:this.price,
              img:this.image
        })
        this.$emit('productAdded')
      }
  },
  computed:{
    pricePrettier(){
    let p_s = `${this.price}`;
    let p_a = p_s.split('.');
    return p_s.includes('.') && p_a[1].length <= 1 ? `$ ${p_s}0` : `$ ${p_s}`
    }
  }
}
</script>
<style scoped>
.product-card-body {
  width: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  gap: 10px;
  cursor:pointer;
  position:relative;
}

.product-image {
  background-size: 50%;
  background-position: center;
  background-color: white;
  background-repeat:no-repeat;
  width: 100%;
  height: 240px;
  border-radius: 8px;
}
.product-image:hover{
  background-size:contain;
}

.product-details {
  width: 100%;
  flex: 1;
  padding: 5px 0;
}

.product-name {
  font-size: 20px;
  font-weight: 500;
  color: #1a1f16;
}

.product-description {
  font-size: 16px;
  font-weight: 400;
  color: #60695c;
  height:22px;
  overflow:hidden;
  position:relative;
}

.product-process {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.product-pricing {
  font-weight: 600;
  font-size:1.25em
}

.preview-card{
  position:absolute;
  height:200px;
  width:200px;
  background:white;
  top:50%;
  left:60%;
  z-index:2;
  display:none;
  transition:0.5s ease-in-out;
}


</style>
