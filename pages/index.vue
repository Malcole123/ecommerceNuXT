<template>
  <div class="main-app-body">
    <TheSidebar />
    <div class="product-search-area">
      <MainSearchVue @click="filterList"/>
      <div class="results-display-area">
        <div class="results-wrapper">
          <div class="product-display-area" :class="item.type === 'quad' ? 'display-quad' :'display-trio'" v-for="(item,index) in products" :key="'pro_dp_' + index">
            <TheMainProductCard v-for="(prod,i) in item.products" :key="'prod_item_' + i" :name="prod.title" :image="prod.image" :description="prod.description" :price="prod.price" :uid="`${prod.id}`"/>
          </div>

        </div>
      </div>
    </div>
    <div class="cart-wrapper">
      <EmbededCartVue :calc="'page-cart'" />
    </div>
  </div>
</template>

<script>
import EmbededCartVue from "~/components/carts/EmbededCart.vue"
import TheSidebar from "~/components/TheSidebar.vue"
import MainSearchVue from "~/components/inputs/MainSearch.vue"
import TheMainProductCard from "~/components/cards/TheMainProductCard.vue"
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
      let products_ = await fetch('/api/products').then(res=>res.json()).then(data=>{return data}).catch(error=>{return []});
      this.products = productSort(products_)
  },
  components: { TheSidebar, EmbededCartVue, MainSearchVue, TheMainProductCard },
  data(){
    return {
      products:[],
      cart:[],
    }
  },
  methods:{
    filterList(prompt){
      console.log("prompt")
    },
    addProduct(){
      console.log("pos")
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  width: 100%;
  height: 100%;
  background: #ededed;
}

.main-app-body {
  width: 100%;
  height: 100vh;
  padding: 1% 8%;
  padding-left: 130px;
  display: flex;
  align-items: flex-start;
}

.product-search-area {
  width: 70%;
  height: 100%;
}

.results-display-area {
  width: 100%;
  height: fit-content;
  margin: 30px 0;
}

.results-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  height: fit-content;
  width: 100%;
}

.cart-wrapper {
  width: 30%;
  height: 100%;
}

.product-display-area {
  display: grid;
  gap: 16px;
  height: fit-content;
  width: 100%;
}

.display-quad {
  grid-template-columns: repeat(4, 1fr);
}

.display-trio {
  grid-template-columns: 2fr 1fr 1fr;
}

@media (max-width: 1120px) {
  .main-app-body {
    padding-right: 20px;
  }

  .product-search-area {
    width: 100%;
  }

  .cart-wrapper {
    position: fixed;
    right: -100vw;
  }
}

@media (max-width: 968px) {
  .display-quad {
    grid-template-columns: repeat(2, 1fr);
  }

  .display-trio {
    grid-template-columns: 2fr 1fr;
  }

  .display-trio > *:nth-child(3) {
    width: 133%;
  }
}

@media (max-width: 768px) {
  .main-app-body {
    padding-left: 90px;
    padding-right: 10px;
  }

  .display-quad {
    grid-template-columns: 1fr;
  }

  .display-trio {
    grid-template-columns: 1fr;
  }

  .display-trio > *:nth-child(3) {
    width: 100%;
  }
}
</style>
