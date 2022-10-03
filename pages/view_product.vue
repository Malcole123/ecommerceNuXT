<template>
  <MainWrapperVue :_class="'main-app-body'">
    <TheSidebar @cartOpen="openCart"/>
    <div class="product-search-area">
      <div class="w-100">
        <NuxtLink to="/"><button type="button" class="btn btn-outline-dark">Back</button></NuxtLink>
      </div>
      <div class="row g-3 mt-4">
        <div class="col-lg-4 col-md-5 col-sm-12 p-2">
            <div class="product-image" :style="`background-image:url('${product.image}')`"></div>
        </div>
        <div class="col-lg-8 col-md-7 col-sm-12 p-2">
          <div class="w-100 pt-2 pb-2">
            <h1 class="product-title">{{product.name}}</h1>
            <h2 class="product-category mt-2">{{product.category}}</h2>
          </div>
          <div class="w-100">
            <div class="d-flex gap-3 align-items-center">
              <div class="d-flex g-1">
                <RatingIcon v-for="n in Math.floor(product.rating.rate)" :key="'rating-component' + n"/>
                <HalfRatingIcon v-if="product.rating.rate - Math.floor(product.rating.rate) >= 0.5"/>
              </div>
              <strong class="product-rating">{{product.rating.rate}} / {{product.rating.total}}</strong>
            </div>
            <div class="d-flex align-items-center">
              <h2 class="product-pricing mt-3">{{pricePrettier}}</h2>
              <div class="add-cart-btn" @click="addProduct">
                <AddCartButton/>
                Add to bag
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-100 mt-3 mb-5">
          <h3 class="view-sub-heading mb-2">Description</h3>
          <p class="product-description" >{{product.description}}</p>
      </div>
      <div class="w-100 mb-5">
          <h3 class="view-sub-heading mb-2">Reviews</h3>
          <p v-for="n in 5" :key="'dummy-review-'+n" class="product-description" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus natus provident nihil sint, molestiae repudiandae. Asperiores sint tempore sunt illum!</p>
      </div>
      <div class="w-100 mb-5">
          <h3 class="view-sub-heading mb-2">More Products</h3>
          <p v-for="n in 5" :key="'dummy-review-'+n" class="product-description" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus natus provident nihil sint, molestiae repudiandae. Asperiores sint tempore sunt illum!</p>
      </div>
    </div>
    <div class="cart-wrapper" :class="cartClass">
      <EmbededCartVue @cartClosed="closeCart"/>
    </div>
  </MainWrapperVue>
</template>

<script>
import EmbededCartVue from "~/components/carts/EmbededCart.vue"
import TheSidebar from "~/components/TheSidebar.vue"
import MainSearchVue from "~/components/inputs/MainSearch.vue"
import TheMainProductCard from "~/components/cards/TheMainProductCard.vue";
import RatingIcon from "../components/icons/RatingIcon.vue";
import HalfRatingIcon from "../components/icons/HalfRatingIcon.vue";
import AddCartButton from "~/components/Buttons/AddCartButton.vue";
import MainWrapperVue from "~/components/TopLevelWrappers/MainWrapper.vue";

export default {
  name: "ViewProductPage",
  async mounted(){
      this.device.width = window.innerWidth;
      let uid = new URLSearchParams(window.location.search).get('uid');
      //const {ok , data} = await fetch("https://x8ki-letl-twmt.n7.xano.io/api:3ky6p00f/products/1?uid="+ uid).then(res=>res.json()).then(data=>{return data}).catch(error=>{return []});
      const {data, ok, all_other_products } = await fetch("/api/products/"+uid).then(res=>res.json()).then(data=>{return data}).catch(error=>{return error})
      if(ok){
          const { image, description, title , category, price, rating, id } = data;
          this.product.image = image;
          this.product.description = description;
          this.product.name = title;
          this.product.category = category;
          this.product.price = price;
          this.product.rating.rate = rating.rate;
          this.product.rating.count = rating.count;
          this.product.uid = id
      }else{
        //Handle Error Here
        console.log('error')
      }
  },
  components: { TheSidebar, EmbededCartVue, MainSearchVue, TheMainProductCard, RatingIcon, HalfRatingIcon, AddCartButton , MainWrapperVue},
  data(){
    return {
      device:{
        width:0,
        height:0,
      },
      cartClass:"",
      product:{
        uid:"",
        image:"",
        description:"",
        name:"",
        category:"",
        price:0,
        rating:{
          rate:0,
          total:5,
          count:0,
        }
      }
    }
  },
  computed:{
      pricePrettier(){
        return "$ " + parseFloat(this.product.price).toFixed(2)
      }
  },
  watch:{

  },
  methods:{
    filterList(prompt){
      console.log("prompt")
    },
    addProduct(){
      this.$store.commit('cart/add', {
              prodID:this.product.uid,
              name:this.product.name,
              price:this.product.price,
              img:this.product.image
      });
      this.openCart()
    },
    openCart(){
      this.cartToggle('open')
    },
    closeCart(){
      this.cartToggle('close')
    },
    cartToggle(act_){
      switch(act_){
        case "open":
            this.cartClass =  'show-cart';
          break
        case "close":
          this.cartClass = ''
          break
      }

    }
  }
}
</script>

<style scoped>
  .product-image{
      background-size:contain;
      background-position:center;
      background-repeat:no-repeat;
      background-color:white;
      height:30vh;
      border-radius:8px;
  }

  .product-title{
      font-size:2.4em;
      width:90%;
      font-weight:700;
  }

  .product-category{
      font-size:1.6em;
      width:90%;
      font-weight:500;
      color: rgba(26, 31, 22, 0.5);
      text-transform:capitalize;
  }

  .product-pricing{
    font-weight:700;
    margin-right:20px;
  }

  .product-rating{
    margin-left:25px;
    font-size:1.3rem;
  }

  .product-description{
    font-size:1.2rem;
  }

  .view-sub-heading{
    font-weight:700;
  }

  .add-cart-btn{
    background:#1A1F16;
    color:white;
    border-radius:10px;
    display:flex;
    gap:2px;
    align-items:center;
    font-size:1.1rem;
    font-weight:600;
    padding:4px 6px;
    padding-right:12px;
    text-transform:capitalize;
    cursor:pointer;
  }

  .cart-wrapper {
    height:100%!important;
  }

  @media (max-width: 968px) {
  .product-title{
      font-size:2em;
      width:100%;
      font-weight:700;
  }

  }

  </style>
