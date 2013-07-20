define(["jquery"], function($) {
 function findBrokenImages(callback) {
    var body = $("body")
    if (body.waitForImages) {
      failed = []
      body.waitForImages(
        function() {
          callback(failed)
        },
        function(loaded, count, success) {
          if (!success) {
            if (this.src)
              failed.push(this.src)
            else
              failed.push("background for " + this.tagName)
          }
        },
        true)
    } else {
      callback([])
    }
  }
  window.findBrokenImages = findBrokenImages
})
