// Test framework setup

var expect = chai.expect
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
function openPage(path) {
  return function(done) {
    var sutFrame = $("<iframe>").attr("src", path).attr("id", "sut")
    $("body").append(sutFrame)
    wait.until(function() {
      return sutWindow().$
    }, done)
  }
}
function checkAllImages() {
  describe('Images and backgrounds', function() {
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

// Actual tests cases

describe("Front page", function() {
  before(openPage("index.html"))

  it ('Shows image of Larry Wall', function() {
    expect(S("img")).to.be.visible()
  })

  checkAllImages()
})


// Run 'em

mocha.run()
