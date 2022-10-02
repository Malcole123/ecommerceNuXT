<template>
     <b-modal
    :id="_id"
    size="lg"
    :title="title"
    :hide-footer="true">
    <slot></slot>
  </b-modal>
</template>

<script>
export default {
  setup() {

  },
  emits:[],
  props:{
    _id:{
      type:String,
      default:"/*INVALID ID BUG HERE*/",
      required:true,
    },
    title:{
      type:String,
      default:"/*INVALID TITLE BUG HERE*/",
      required:true,
    }
  }
}
</script>
