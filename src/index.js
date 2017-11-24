/* global FileReader */

function main () {
  var isSupported = window.File && window.FileReader
  if (!isSupported) {
    document.getElementById('unsupported').style.display = 'block'
  }

  var uploadContainer = document.getElementById('js-upload-container')
  var uploadParseError = document.getElementById('upload-parse-error')

  var uploader = document.createElement('input')
  uploader.type = 'file'
  uploader.addEventListener('change', function () {
    var fileReader = new FileReader()
    fileReader.onload = function (event) {
      var parsed
      try {
        parsed = JSON.parse(event.target.result)
        uploadParseError.style.display = 'none'
      } catch (err) {
        uploadParseError.innerHTML = 'Unable to parse your Pinboard bookmarks. Make sure you export your bookmarks in the JSON format.'
        uploadParseError.style.display = 'block'
      }

      console.log(parsed)
    }
    fileReader.readAsText(uploader.files[0])
  }, false)

  uploadContainer.innerHTML = ''
  uploadContainer.appendChild(uploader)
  uploadContainer.className = ''
}

main()
