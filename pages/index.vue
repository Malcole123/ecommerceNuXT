<template>
  <div class="main-app-body">
    <TheSidebar @cartOpen="openCart"/>
    <div class="product-search-area">
      <MainSearchVue @searchChange="searchProducts" @searchEnd="endSearch"/>
      <div class="results-display-area">
        <div class="results-wrapper" id="filteredResults" v-if="searchActive">
          <div class="product-display-area display-quad">
            <TheMainProductCard v-for="(prod,i) in products.filtered" :key="'prod_f_item_' + i" :name="prod.title" :image="prod.image" :description="prod.description" :price="prod.price" :uid="`${prod.uid}`" @productAdded="addProduct" :matchStr="search" :highlight="true"/>
          </div>

        </div>
        <div class="results-wrapper" id="unfilteredResults" v-if="!searchActive">
          <div class="product-display-area" :class="item.type === 'quad' ? 'display-quad' :'display-trio'"  v-for="(item,index) in products.sorted" :key="'prod_uf_item' + index">
            <TheMainProductCard v-for="(prod,i) in item.products" :key="'prod_item_' + i" :name="prod.title" :image="prod.image" :description="prod.description" :price="prod.price" :uid="`${prod.uid}`" @productAdded="addProduct" :highlight="false"/>
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

  async mounted(){
      await this.$store.dispatch('products/getProductData')
      this.device.width = window.innerWidth;
      let ps = await this.$store.getters['products/getAllProducts'];
      this.products.clean = ps['all'];
      this.products.sorted = ps['mSort'];
      this.searchActive = false;
  },
  components: { TheSidebar, EmbededCartVue, MainSearchVue, TheMainProductCard },
  data(){
    return {
      device:{
        width:0,
        height:0,
      },
      products:{
        sorted:[],
        clean:[],
        filtered:[],
      },
      cart:[],
      cartClass:"",
      search:"",
      searchActive:false
    }
  },
  computed:{
      searchList(){


      },
  },
  watch:{

  },
  methods:{
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
    searchProducts({currentInput}){
      //Swap for plugin
      const compare = (str_1, str_2)=>{
            if(str_1 === str_2){
              return true
            }else{
              return false
            }
      }

      this.searchActive = true;
      this.search = currentInput;
      let copy_ = this.products.clean;
      this.products.filtered = copy_.filter((it,ind)=>{
          if(compare(it.title.substr(0, this.search.length), this.search)){
            return it
          }
        })
    },
    endSearch(){
      this.searchActive = false;
    }

  }
}
</script>
