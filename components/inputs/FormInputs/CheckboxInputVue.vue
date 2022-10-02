<template>
  <FormWrapper>
      <input :id="_id" :name="name" class="d-inline-block" type="checkbox" v-model="value" @change="toggle">
      <label class="d-inline-block" for="checkbox">{{label}}</label>
  </FormWrapper>
</template>
<script>
import FormWrapper from './FormWrapper.vue';
export default {
  emits:['input_changed'],
  data() {
    return {
      value:false
    }
  },
  props:{
    name:{
      type:String,
      required:true,
      default:"/Invalid Name/ |*BUG HERE BREAK*|"
    },
    _id:{
      type:String,
      required:true,
      default:"/Invalid Id/ |*BUG HERE BREAK*|"
    },
    label:{
      type:String,
      required:true,
      default:"/Invalid label/ |*BUG HERE BREAK*|"
    }
  },
  methods:{
    toggle(){
      this.$emit('input_changed', {name:this.name, value:this.value})
    }
  },
  components:{ FormWrapper }
}
</script>
<style scoped>
    input{
      height:20px;
      width:20px;
    }
</style>
