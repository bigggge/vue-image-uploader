<template>
  <div class="img-uploader"
       @drop="handleDrop"
       ref="uploader">

    <!--没有图片显示点击上传-->
    <p class="img-uploader-placeholder" v-if="!hasImages">{{placeholder}}</p>

    <!--图片预览列表-->
    <div v-if="hasImages" @click='openInput()' class="img-uploader-preview-list">
      <div v-for="(data,index) in imageDataList" class="img-uploader-preview">

        <div class="preview-img">
          <img :src="data">
        </div>
        <!--信息窗-->
        <div class="img-uploader-mask" v-if="hasImages">
          <!--<p class="img-uploader-file-size">10MB</p>-->
          <p class="img-uploader-file-name">{{fileNameList[index]}}</p>
        </div>
      </div>
    </div>


    <label :for="inputId" class="img-uploader-label" v-if="!hasImages"></label>

    <!-- input-->
    <input
      style="display: none"
      :id="inputId"
      ref="input"
      type="file"
      accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
      multiple="multiple"
      @change="handleFileChange"/>

    <!--错误提示-->
    <div class="img-uploader-error" v-if="errorText.length">{{errorText}}</div>

    <!--文件数-->
    <div class="img-uploader-count" v-if="countText.length">{{countText}}</div>

  </div>
</template>

<script>
  import resizeImage from '@/components/resize'

  export default {
    props: {
      // 占位文字
      placeholder: {
        default: '点击上传图片',
        type: String
      },
      // 文件更改回调
      onChange: {
        type: Function
      },
      // 图片大小的最大值(KB)
      maxSize: {
        default: 3072,
        type: Number
      }
    },
    data () {
      return {
        // input 的id
        inputId: '',
        // 预览图片地址
        imageDataList: [],
        // 文件名
        fileNameList: [],
        // 错误提示
        errorText: '',
        // 图片计数
        countText: ''
      }
    },
    computed: {
      // 是否有图片
      hasImages () {
        return this.imageDataList.length > 0
      },
      // 格式化的文件大小，可读的
      sizeFormatted () {
        let result = 0
        if (this.maxSize < 1024) {
          result = this.maxSize + 'K'
        } else {
          result = (this.maxSize / 1024).toFixed(this.maxSize % 1024 > 0 ? 2 : 0) + 'M'
        }
        return result
      }
    },
    mounted () {
      // 防止多个组件之间干扰
      this.inputId = this.id || Math.round(Math.random() * 100000);

      ['drop', 'dragenter', 'dragover', 'dragleave'].forEach((eventName) => {
        this.preventDefaultEvent(eventName);
      });
    },
    methods: {
      handleFileChange(){
        let input = this.$refs.input
        let files = input.files
        this.handleFile(files)
      },
      handleDrop (e) {
        // 获取文件列表
        let files = e.dataTransfer.files
        this.handleFile(files)
      },
      preventDefaultEvent(eventName){
        document.addEventListener(eventName, function (e) {
          e.preventDefault();
        }, false)
      },
      openInput(){
        document.getElementById(this.inputId).click()
      },
      // 处理图片
      handleFile (files) {

        if (files && files.length > 0) {
          this.fileNameList.length = 0
          this.imageDataList.length = 0
        }

        for (let i = 0; i < files.length; i++) {
          let file = files[i]
          let size = Math.floor(file.size / 1024)
          if (size > this.maxSize) {
            this.errorText = `文件大小不能超过${this.sizeFormatted}`
            return false
          }
          this.fileNameList.push(file.name)
        }

        if (files && files.length > 0) {
          this.countText = `${files.length}张图片`
        }
        // 文件选择事件
//        this.onChange && this.onChange(files)
        this.$emit('onChange', files)

        this.preview(files)
      },
      // 预览图片
      preview (files) {
        let _this = this
        if (!files || !window.FileReader) return

        for (let i = 0; i < files.length; i++) {
          let file = files[i]
          let reader = new FileReader()
          reader.onload = function (e) {

            resizeImage(e.target.result, 150, 150, function (result) {
              _this.imageDataList.push(result)
            })

          }
          reader.readAsDataURL(file)
        }
      }
    }
  }
</script>

<style scoped>

  .img-uploader {
    position: relative;
    display: inline-block;
    min-width: 260px;
    max-width: 800px;
    height: calc(150px + 25px * 2);
    width: auto;
    border-radius: 5px;
    background: #ebebeb;
  }

  .img-uploader-placeholder {
    margin: 0;
    position: absolute;
    font-size: 15px;
    width: 100%;
    color: #aaa;
    text-align: center;
    top: 50%;
    transform: translate(0%, -50%);
  }

  .img-uploader-preview-list {
    margin: 5px 10px;
    height: calc(150px + 18px * 2);
    /*width: 100%;*/
    white-space: nowrap;
    overflow: hidden;
    overflow-x: auto;
    -webkit-backface-visibility: hidden;
    -webkit-perspective: 1000;
    -webkit-overflow-scrolling: touch;
    text-align: center;
  }

  .img-uploader-preview {
    display: inline-block;
    z-index: 2;
    min-height: 150px;
    margin: 10px;
    border-radius: 10px;
    background: #333;
    transition: 0.3s cubic-bezier(0.3, 0, 0.2, 1);
  }

  .img-uploader-preview:hover {
    transform: scale(1.02);
  }

  .img-uploader-preview:hover .img-uploader-mask {
    display: block;
  }

  .img-uploader-preview .preview-img {
    width: 150px;
    height: 150px;
    overflow: hidden;
  }

  .img-uploader-label {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    cursor: pointer;
    margin-bottom: 0;
  }

  .img-uploader-mask {
    display: none;
    position: absolute;
    bottom: 0;
    width: 150px;
    border-radius: 1px;
    text-align: center;
    background: rgba(0, 0, 0, 0.6);
  }

  .img-uploader-file-name {
    color: white;
    font-size: 5px;
    padding-top: 10px;
    margin: 0;
    display: inline-block;
    max-width: 90%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .img-uploader-error {
    color: #e55;
    font-size: 12px;
    position: absolute;
    bottom: -28px;
    width: 100%;
  }

  .img-uploader-count {
    color: #573e51;
    font-size: 12px;
    position: absolute;
    bottom: -28px;
    width: 100%;
  }

</style>
