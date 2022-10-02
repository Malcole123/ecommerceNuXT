<template>
  <div class="form-wrapper">
    <slot></slot>
  </div>
</template>
<script>
export default {
  setup() {

  },
}
</script>
<style scoped>
    .form-wrapper{
      padding:12px 0px;
      width:100%
    }

    .form-wrapper > *{
      display:block;
    }

    .form-wrapped-input{
      width:100%;
      height:56px;
      outline:none;
      border:none;
      font-size:20px;
      font-weight:500;
      border-radius:13px;
      padding-left:32px;
      box-shadow: 0px 4px 16px rgba(26, 31, 22, 0.15);
    }

    .form-wrapped-input::placeholder{
      font-size:18px;
      color:rgba(26, 31, 22, 0.5);
      transition:300ms ease
    }

    .form-wrapped-input:focus::placeholder{
      font-size:20px;
    }



    .form-wrapper label{
      font-size:1.1em;
      color:rgba(26, 31, 22, 0.5);
    }

    .form-wrapped-input:focus{
      border:1px solid rgba(2, 214, 147, 1)
    }


</style>
