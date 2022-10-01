<template>
  <div class="main-app-body">
    <TheSidebar @cartOpen="openCart"/>
    <div class="product-search-area">
      <MainSearchVue @click="filterList"/>
      <div class="results-display-area">
        <div class="results-wrapper">
          <div class="product-display-area" :class="item.type === 'quad' ? 'display-quad' :'display-trio'" v-for="(item,index) in products" :key="'pro_dp_' + index">
            <TheMainProductCard v-for="(prod,i) in item.products" :key="'prod_item_' + i" :name="prod.title" :image="prod.image" :description="prod.description" :price="prod.price" :uid="`${prod.id}`" @productAdded="addProduct"/>
          </div>

        </div>
      </div>
    </div>
    <div class="cart-wrapper" :class="cartClass">
      <EmbededCartVue :calc="'page-cart'" @cartClosed="closeCart"/>
    </div>
  </div>
</template>

<script>
import EmbededCartVue from "~/components/carts/EmbededCart.vue"
import TheSidebar from "~/components/TheSidebar.vue"
import MainSearchVue from "~/components/inputs/MainSearch.vue"
import TheMainProductCard from "~/components/cards/TheMainProductCard.vue";
export default {
  name: "IndexPage",
  setup(){
    console.log('setup')
  },
  async mounted(){
      console.log('mounted')
      this.device.width = window.innerWidth;
      this.fetchProducts()
  },
  components: { TheSidebar, EmbededCartVue, MainSearchVue, TheMainProductCard },
  data(){
    return {
      device:{
        width:0,
        height:0,
      },
      products:[],
      cart:[],
      cartClass:"",
    }
  },
  computed:{

  },
  watch:{

  },
  methods:{
    filterList(prompt){
      console.log("prompt")
    },
    addProduct(){
      console.log("pos")
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

    },
    async fetchProducts(){
      const productSort = (arr)=>{
          let sort_arr = [4, 3, 4, 3, 4, 3];
          let return_arr = [];
          let checked = 0;
          sort_arr.forEach((num, index)=>{
              let created_obj = {
                type:num === 4 ? 'quad' :'trio',
                products:[],
              }
              created_obj.products = arr.splice(checked, num);
              return_arr.push(created_obj)
          })
          return return_arr
      }
      const {ok, data , error} = await this.$axios.$get("/api/products").then(data=>{
          return {
            ok:true,
            data,
          }
        }).catch(error =>{
              return {
                ok:false,
                error,
              }
        })
        if(ok){
          this.products = productSort(data.products)
        }else{
          //Handle Error Here
        }
     }

  }
}
</script>
