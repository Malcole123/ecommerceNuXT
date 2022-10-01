<template>
  <nav class="main-nav">
    <div class="d-lg-none d-md-none d-sm-block" style="cursor:pointer">
      <MenuIcon />
    </div>
    <ul class="nav-links">
      <li>
        <NuxtLink to="/"><div class="nav-logo"></div></NuxtLink>
      </li>
      <li class="d-lg-block d-md-block d-sm-none">
        <NuxtLink to="/"><HomeIcon /></NuxtLink>
      </li>
      <li class="position-relative">
        <div class="cart-count-indicator" v-if="cartTotal > 0">{{cartTotal}}</div>
        <ViewCartBtn @cartOpenCalled="openCart"/>
      </li>
    </ul>
  </nav>
</template>
<script>
import MenuIcon from "./icons/MenuIcon.vue"
import HomeIcon from "./icons/HomeIcon.vue"
import ViewCartBtn from "./Buttons/ViewCartBtn.vue"
export default {
  emits:['cartOpen'],
  components: { MenuIcon, HomeIcon, ViewCartBtn },
  data() {
    return {
      nav_links: [
        {
          name: "Home",
          icon_path: "",
          link: "/",
        },
      ],
    }
  },
  computed:{
      cartTotal(){
        let c_ =  this.$store.getters["cart/getItemTotal"];
        return c_
      }
  },
  methods:{
    openCart(){
      this.$emit('cartOpen')
    }
  }
}
</script>
<style>
.main-nav {
  height: 96%;
  width: 90px;
  position: fixed;
  top: 2%;
  bottom: 2%;
  left: 1%;
  background: white;
  padding: 1rem 0.3em;
  border-radius: 8px;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:25px;
  z-index:2;
}

.nav-links {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  list-style-type:none;
}

.cart-count-indicator{
  position:absolute;
  bottom:0px;
  right:0px;
  background:red;
  color:white;
  padding:2px 6px;
  border-radius:0.25em;
}

.nav-logo{
  height:40px;
  width:40px;
  background-image:url('../static/logo.png');
  background-size:cover;
  background-position:center;
}
@media (max-width: 768px) {
  .main-nav {
    width: 100%;
    height:70px;
    left: 0%;
    top: 0%;
    bottom:auto;
    right:0%;
    border-radius: 0;
    flex-direction:row-reverse;
    padding:5px 20px;
  }
  .nav-links{
    flex-direction:row;
    margin-left:auto;
  }
}
</style>
