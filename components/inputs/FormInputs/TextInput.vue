<template>
  <!--Styled from parent-->
     <FormWrapper>
        <label :for="id">{{label}}</label>
        <input type="text" :id="id" :class="_class" :name="name" :placeholder="placeholder" :maxlength="maxLength" :minlength="minLength" :required="_required" @change="inputChange" @keyup="inputEnter" v-model.trim="text_input" :style="invalidFeedback">
        <small class="text-danger" v-if="invalid">{{errorMsg}}</small>
     </FormWrapper>
</template>
<script>
import FormWrapper from "./FormWrapper.vue";
export default {
  setup() {

  },
  emits:['input_changed', 'input_keyUp'],
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
    minLength:{
      type:Number,
      required:false,
      default:0,
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
    validate_type:{
      type:String,
      required:false,
      default:"none",
    },
    restrictTo:{
      type:String,
      required:false,
      default:"none",
    },

  },
  computed:{
    state(){
      return false
    },
    invalidFeedback(){
        if(this.invalid){
          return "border:1px solid #f44336"
        }else{
          return ""
        }
    },
    inputPattern(){
      let pattern = ""
      //Check valid key entered
        switch(this.restrictTo){
        case "numbers":
            pattern = "[0-9]+"
          break
        }
      return pattern
    }
  },
  data(){
    return {
      text_input:"",
      invalid:false,
      errorMsg:""
    }
  },
  methods:{
    inputChange(){
      this.$emit('input_changed', {name:this.name, value:this.text_input})
    },
    inputEnter(){
      if(this.restrictTo === 'numbers'){
        this.text_input = this.text_input.replace(/[^0-9]/g, '');
      }else if(this.restrictTo === 'date-year'){
          let str_ = this.text_input.replaceAll(" ", "").replaceAll("/", "");
          let yy_ = str_.length < 3 ? "" : str_.substr(2,str_.length -2);
          let mm_ = str_.replace(yy_, "");
          this.text_input = `${mm_} / ${yy_}`;
          const { validMonth, validYear, validExp } = this.checkDate({
            mm:mm_,
            yyyy:yy_
          });
          this.invalid = !validExp;


      }
      this.$emit('input_keyUp', {name:this.name, value:this.text_input})
    },
    checkDate({mm, yyyy}){
        let date_ = new Date();
        let checkM = parseInt(mm);
        let checkY = parseInt(yyyy);
        let checkDate = date_.getTime() / 1000
        let checkUnix = new Date(checkY, checkM - 1).getTime() / 1000
        let validMonth = checkM > 0 && checkM <= 12 ? true : false;
        let validYear = checkY > 1000 ? true : false;
        let validExp = false;
        if(validMonth && validYear){
          if(checkY === date_.getFullYear() && checkM - 1 === date_.getMonth()){
            validExp = true;
          }else{
              validExp = checkDate < checkUnix ? true : false
          }
        }
        return  {
          validMonth,
          validYear,
          validExp,
        }
    }

  },
  components:{ FormWrapper }
}
</script>

<style scoped>


</style>
