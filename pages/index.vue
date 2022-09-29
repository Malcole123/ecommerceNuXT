<template>
  <div class="main-app-body">
    <TheSidebar />
    <div class="product-search-area">
      <MainSearchVue />
      <div class="results-display-area">
        <div class="results-wrapper">
          <div class="product-display-area display-quad">
            <TheMainProductCard v-for="n in 4" :key="'test' + n" />
          </div>
          <div class="product-display-area display-trio">
            <TheMainProductCard v-for="n in 3" :key="'test-tro' + n" />
          </div>
          <div class="product-display-area display-quad">
            <TheMainProductCard v-for="n in 4" :key="'test-qua' + n" />
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
  components: { TheSidebar, EmbededCartVue, MainSearchVue, TheMainProductCard },
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
    padding-left: 105px;
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
