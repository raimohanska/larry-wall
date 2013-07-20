## Larry Wall

A simple(ish) example application with [Mocha](http://visionmedia.github.io/mocha/) test case that finds all broken images on page
using the [jQuery.waitforimages](https://github.com/alexanderdickson/waitForImages) plugin.

So, have *you* ever found out that there's a broken image on your web application? 
Maybe on a page that is seldom visited by developers. You've got great mocha
tests for your UI features, but none of these can catch broken images? I was
in this situation a while ago. No more!

Now I can write tests like this:

```javascript
describe("Front page", function() {
  before(openPage("index.html"))

  it ('Shows image of Larry Wall', function() {
    expect(S("img")).to.be.visible()
  })

  checkAllImages()
})
```

And get test reports like this:

![mocha-report](https://raw.github.com/raimohanska/larry-wall/master/mocha-screenshot.png)

The `checkAllImages` call there generates a test case that check that all `<img>` tags are successfully loaded. 
It also verifies my CSS backgrounds!

To run my example (OSX specific, assumes you've got Bower installed):

    bower install
    ./serve
    open http://localhost:8000/test/

Now that you've got the tests running in your browser, you might as well try to break them. So, edit `index.css` so that
the background URL is incorrect, then reload. You'll see that a test case just broke.

## Steps to success

### 1. Add nasty stuff to your application

The assumption is that you're using a setup similar to I am. That is,
you're using Mocha for your tests and that you're running your actual
application in an `<iframe>`. My setup with the tests and all
is in the file [test.js](https://github.com/raimohanska/larry-wall/blob/master/test/test.js). 

Here's the thing you don't want to hear. You have to add some extra code
to your actual application. That is, you need to include the
`jquery.waitforimages` plugin and a custom function that uses the plugin
to produce the list of broken images on the page. It can be found
[here](https://github.com/raimohanska/larry-wall/blob/master/lib/findBrokenImages.js).

I tried to make this work by adding the plugin to my *test code* but
couldn't make it work because the paths got wrong and the plugin didn't
work. So, it seems you need to include it in your production code. But
of course, you can do some *iffing* in your app to include the
test-specific code only in case the app is not running in an `<iframe>`,
right?

### 2. Define a test helper

For your Mocha tests, you can define a helper function `checkAllImages`
that will generate a test case that checks that all images are valid in
the application iframe. I've defined mine in [test.js](https://github.com/raimohanska/larry-wall/blob/master/test/test.js).

### 3. Call the helper in relevant test cases

Like this.

