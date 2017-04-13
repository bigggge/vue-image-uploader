export default function resizeImage (url, width, height, callback) {
  var sourceImage = new Image()

  sourceImage.onload = function (evt) {
    console.info('resizeImage width:' + sourceImage.width)
    console.info('resizeImage height:' + sourceImage.height)
    var canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    if (sourceImage.width === sourceImage.height) {
      canvas.getContext('2d').drawImage(sourceImage, 0, 0, width, height)
    } else {
      let minVal = Math.min(sourceImage.width, sourceImage.height)
      if (sourceImage.width > sourceImage.height) {
        canvas.getContext('2d').drawImage(sourceImage, (sourceImage.width - minVal) / 2, 0, minVal, minVal, 0, 0, width, height)
      } else {
        canvas.getContext('2d').drawImage(sourceImage, 0, (sourceImage.height - minVal) / 2, minVal, minVal, 0, 0, width, height)
      }
    }
    callback(canvas.toDataURL())
  }

  sourceImage.src = url
}
