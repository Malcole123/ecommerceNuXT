<template>
  <MainWrapperVue _class="main-app-body">
    <TheSidebar @cartOpen="openCart"/>
    <div class="product-search-area">
      <MainSearchVue @searchChange="searchProducts" @searchEnd="endSearch"/>
      <div class="results-display-area" v-if="productsLoaded">
        <div class="results-wrapper" id="filteredResults" v-if="searchActive">
          <div class="product-display-area display-quad">
            <TheMainProductCard v-for="(prod,i) in products.filtered" :key="'prod_f_item_' + i" :name="prod.title" :image="prod.image" :description="prod.description" :price="prod.price" :uid="`${prod.uid}`" :matchStr="search" :highlight="true"/>
          </div>
        </div>
        <div class="results-wrapper" id="unfilteredResults" v-if="!searchActive">
          <div class="product-display-area" :class="item.type === 'quad' ? 'display-quad' :'display-trio'"  v-for="(item,index) in products.sorted" :key="'prod_uf_item' + index">
            <TheMainProductCard v-for="(prod,i) in item.products" :key="'prod_item_' + i" :name="prod.title" :image="prod.image" :description="prod.description" :price="prod.price" :uid="`${prod.uid}`" :highlight="false"/>
          </div>

        </div>
      </div>
      <div class="empty-results-display h-100 d-flex flex-column g-2 align-items-center mt-4" v-if="searchActive && products.filtered.length === 0">
          No Results Found&nbsp;&nbsp;&nbsp;(:-{
      </div>
    </div>
    <div class="cart-wrapper" :class="cartClass">
      <EmbededCartVue :calc="'page-cart'" @cartClosed="closeCart"/>
    </div>
  </MainWrapperVue>
</template>

<script>
import EmbededCartVue from "~/components/carts/EmbededCart.vue"
import TheSidebar from "~/components/TheSidebar.vue"
import MainSearchVue from "~/components/inputs/MainSearch.vue"
import TheMainProductCard from "~/components/cards/TheMainProductCard.vue";
import MainWrapperVue from "~/components/TopLevelWrappers/MainWrapper.vue";
export default {
  name: "IndexPage",

  async mounted(){
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
    const {ok , data, error} = await fetch("https://x8ki-letl-twmt.n7.xano.io/api:3ky6p00f/products").then(res=>res.json()).then(data=>{return data}).catch(error=>{ return {error}});
      let ps = data;
      if(ok){
        this.products.clean = [...data];
        this.products.sorted = productSort(data);
        console.log(this.products.clean)
      }else{
        //console.log(error)
      }
      this.searchActive = false;
      this.productsLoaded = ok;
  },
  components: { TheSidebar, EmbededCartVue, MainSearchVue, TheMainProductCard, MainWrapperVue },
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
      searchActive:false,
      productsLoaded:true,

    }
  },
  watch:{

  },
  methods:{
    setPage(){

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
      //Swap for plugin;
      this.search = currentInput;
      let copy_ = this.products.clean;
      console.log(copy_)
      const compare = (str_1, str_2)=>{
            if(str_1.toLowerCase() === str_2.toLowerCase()){
              return true
            }else{
              return false
            }
      }

      this.searchActive = true;
      this.products.filtered = copy_.filter((it,ind)=>{
          if(compare(it.title.substr(0, this.search.length), this.search)){
            return it
          }
        })
    },
    endSearch(){
      this.searchActive = false;
    }

  },
}
</script>
