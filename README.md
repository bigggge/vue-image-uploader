# vue-image-uploader

Vue2 图片选择上传组件,支持多选和拖放

[DEMO](http://haoduoyu.cc/vue-image-uploader/)

![](./static/demo.png)

### Props

| 参数 | 类型| 说明 |默认值 |
|------- |--------| ------|-------|
| maxSize|Number| 单张图片最大大小|3072|
| placeholder|String| 占位文字|点击上传图片|
| onChange|Function| 文件更改回调(参数:files)|

### Example

HTML:

```
  <div class="hello">
    <image-inputer :onChange="imgChange" :maxSize="maxSize" placeholder="选择图片"></image-inputer>
  </div>
```

JavaScript:

```
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
```
