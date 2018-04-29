<template>
  <div>
    <div contenteditable="true" v-if="editable">
      <slot></slot>
    </div>

    <div contenteditable="false" v-if="!editable">
      <slot></slot>
    </div>
  </div>
</template>

<script>  
export default {
  name: 'contenteditable',
  props: {
    editable: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style>
</style>
