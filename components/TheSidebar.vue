<template>
  <nav class="main-nav">
    <ul class="nav-links">
      <li>
        <NuxtLink to="/"><MenuIcon /></NuxtLink>
      </li>
      <li>
        <NuxtLink to="/orders"><OrderIcon /></NuxtLink>
      </li>
    </ul>
  </nav>
</template>
<script>
import MenuIcon from "./icons/MenuIcon.vue"
import OrderIcon from "./icons/OrderIcon.vue"
export default {
  components: { MenuIcon, OrderIcon },
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
}

.main-nav ul {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

@media (max-width: 768px) {
  .main-nav {
    height: 100%;
    width: 90px;
    left: 0%;
    top: 0%;
    bottom: 0%;
    border-radius: 0;
  }
}
</style>
