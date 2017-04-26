<template>
  <div class="hello">
    <image-uploader @onChange='imgChange' :maxSize="maxSize" placeholder="选择或拖放图片"></image-uploader>
  </div>
</template>

<script>
  import ImageUploader from '@/components/ImageUploader.vue'

  export default {
    name: 'hello',
    data () {
      return {
        maxSize: 3072
      }
    },
    components: {
      ImageUploader
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
