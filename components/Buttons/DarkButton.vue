<template>
  <button :type="type" class="main-dark-btn" @click="clickBtn">{{text}}</button>
</template>

<script>
export default {
  setup() {

  },
  props:['type', 'text'],
  emits:['btnClicked'],
  methods:{
    clickBtn(){
      this.$emit('btnClicked')
    }
  }
}
</script>

<style scoped>
  .main-dark-btn{
    background:black;
    padding:6px 12px;
    font-size:1.25rem;
    font-weight:500;
    color:white;
    outline:none;
    border:none;
    border-radius:13px;
    width:100%;
  }
</style>
