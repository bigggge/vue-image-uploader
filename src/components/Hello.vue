<template>
  <div class="hello">
    <image-inputer :onChange="imgChange" :maxSize="maxSize" placeholder="选择图片"></image-inputer>
  </div>
</template>

<script>
  import ImageInputer from '@/components/ImageInputer.vue'

  export default {
    name: 'hello',
    data () {
      return {
        maxSize: 3072
      }
    },
    components: {
      ImageInputer
    },
    methods: {
      imgChange (files) {
        if (files) {
          console.log(files)
        }
      }
    }
  }
</script>

<style scoped>

</style>
