var expect = chai.expect
var sutFrame = $("<iframe>").attr("src", "index.html").attr("id", "sut")
$("body").append(sutFrame)
sutWindow = function() { return $("#sut")[0].contentWindow }
S = function(selector) { return sutWindow().$(selector) }
wait = {
  until: function(condition, callback, count) {
    if (count == undefined) count = 100
    if (condition()) {
      callback()
    } else {
      setTimeout(function() { wait.until(condition, callback, count - 1)}, 10)
    }
  }
}
function checkAllImages() {
  describe('Images', function() {
    var brokenImages
    before(function(done) {
      sutWindow().findBrokenImages(function(failed) {
        brokenImages = failed
        done()
      })
    })
    it('are loaded successfully', function() {
      expect(brokenImages).to.be.empty()
    })
  })
}

describe("Always", function() {
  before(function(done) {
    wait.until(function() {
      return sutWindow().$
    }, done)
  })
  it ('Shows image of Larry Wall', function() {
    expect(S("img")).to.be.visible()
  })

  checkAllImages()
})
mocha.run()
