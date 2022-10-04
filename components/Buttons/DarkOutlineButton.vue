<template>
  <button :type="type" class="main-dark-outline-btn" @click="clickBtn">{{text}}</button>
</template>

<script>
export default {
  emits:['btnClicked'],
  setup() {

  },
  props:['type', 'text'],
  methods:{
    clickBtn(){
      this.$emit('btnClicked')
    }
  }
}
</script>

<style scoped>
  .main-dark-outline-btn{
    background:white;
    padding:6px 12px;
    font-size:1.25rem;
    font-weight:500;
    color:black;
    border:1px solid black;
    outline:none;
    border-radius:8px;
    width:100%;
  }
</style>
