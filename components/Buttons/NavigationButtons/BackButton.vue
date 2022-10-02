<template>
  <div class="go-back-btn" @click="goBack()">Back</div>
</template>

<script>
export default {
  setup() {

  },
  emits:['backClicked'],
  props:['type', 'text'],
  methods:{
    goBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .go-back-btn{
    padding:6px 12px;
    font-size:1rem;
    font-weight:600;
    color:rgba(26, 31, 22, 0.5);
    text-decoration:underline;
    cursor:pointer;
    border:none;
    outline:none;
    transition:400ms ease
  }
  .go-back-btn:hover{
    color:black;
    transform:scale(1.1)
  }
</style>
