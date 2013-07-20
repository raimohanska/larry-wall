requirejs.config({
  baseUrl: ".",
  paths: {
    jquery: "components/jquery/jquery",
    waitForImages: "lib/jquery.waitforimages",
    findBrokenImages: "lib/findBrokenImages"
  },
  shim: {
    waitforimages: {
      deps: ["jquery"]
    }
  }
})
requirejs(['jquery', 'waitForImages', 'findBrokenImages'], function(mocha, chai, $) {
})
