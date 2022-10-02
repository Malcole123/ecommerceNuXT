<template>
  <!--Styled from parent-->
     <FormWrapper>
        <label :for="id">{{label}}</label>
        <input type="text" :id="id" :class="_class" :name="name" :placeholder="placeholder" :maxlength="maxLength" :required="_required" @change="inputChange" v-model.trim="text_input">
     </FormWrapper>
</template>
<script>
import FormWrapper from "./FormWrapper.vue";
export default {
  setup() {

  },
  emits:['input_changed'],
  props:{
    id:{
      type:String,
      required:true,
      default:"default_string_input"
    },
    name:{
      type:String,
      required:true,
      default:"default_string_name"
    },
    placeholder:{
      type:String,
      required:true,
      default:"default_string_name"
    },
    maxLength:{
      type:Number,
      required:false,
      default:30,
    },
    label:{
      type:String,
      required:true,
      default:"Default Label /*BUG HERE*/",
    },
    _class:{
      type:String,
      required:true,
      default:"Default Class /*BUG HERE*/",
    },
    _required:{
      type:Boolean,
      required:true,
      default:false,
    },

  },
  computed:{
    state(){
      return false
    },
    invalidFeedback(){
      return false
    },
    computeId(){

    }
  },
  data(){
    return {
      text_input:""
    }
  },
  methods:{
    inputChange(){
      this.$emit('input_changed', {name:this.name, value:this.text_input})
    }
  },
  components:{ FormWrapper }
}
</script>

<style>

</style>
