describe('Image carousel test', function() {
  let document, container, prev, next, slide, indicators;
  beforeAll(() => {
    document = getDOM();
  });

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  beforeEach(function() {
    container = document.getElementsByClassName("cariusel-img")[0];
    prev = document.getElementsByClassName("previous")[0];
    next = document.getElementsByClassName("next")[0];
    slide = document.getElementById("slide");
    indicators = document.getElementsByClassName("indicator-list")[0];
    container.setAttribute('src', './assets/images/img-1.jpg');
  })

  it('carousel should show the 1st image from the list by default', function() {
    let image = container.getAttribute('data-src');
    let imageSrc = image.split('/').pop();
    expect(imageSrc).toBe('img-1.jpg');
  });

  it('Clicking on previous button should show the previous image', function() {
    next.click();
    prev.click();
    let image = container.getAttribute('data-src');
    let imageSrc = image.split('/').pop();
    expect(imageSrc).toBe('img-1.jpg');
  });

  it('Clicking on next button should show the next image', function() {
    next.click();
    let image = container.getAttribute('data-src');
    let imageSrc = image.split('/').pop();
    expect(imageSrc).toBe('img-2.jpg');
  });

  it('Clicking on next button in the last item should show the first image', function() {
    next.click();
    next.click();
    next.click();
    next.click();
    next.click();
    let image = container.getAttribute('data-src');
    let imageSrc = image.split('/').pop();
    expect(imageSrc).toBe('img-1.jpg');
  });

  it('Clicking on previous button in the first item should show the last image', function() {
    prev.click();
    let image = container.getAttribute('data-src');
    let imageSrc = image.split('/').pop();
    expect(imageSrc).toBe('img-5.jpg');
  });

  it('Clicking on any indicator icon should show the appropriate image', function() {
    let indicator2 = document.getElementsByClassName("two")[0];
    indicator2.click();
    let image = container.getAttribute('data-src');
    let imageSrc = image.split('/').pop();
    expect(imageSrc).toBe('img-2.jpg');
  });

  it('when slide enabled should change the image for every 3 seconds', function() {
    slide.click();
    sleep(6000).then(() => {
      let image = container.getAttribute('data-src');
      let imageSrc = image.split('/').pop();
      expect(imageSrc).toBe('img-3.jpg');
    });
  });

  it('when slide enabled also user interaction like previous, next or indecator should work as expected', function() {
    slide.click();
    sleep(6000).then(() => {
      prev.click();
      prev.click();
      let image = container.getAttribute('data-src');
      let imageSrc = image.split('/').pop();
      expect(imageSrc).toBe('img-1.jpg');
    })
  });

  it('uncheck slide should stop changing the image for every 3 seconds', function() {
    slide.click();
    sleep(6000).then(() => {
      let image = container.getAttribute('data-src');
      let imageSrc = image.split('/').pop()
      expect(imageSrc).toBe('img-3.jpg');
    })

    slide.click();
    sleep(6000).then(() => {
      let image1 = container.getAttribute('data-src');
      let imageSrc1 = image1.split('/').pop();
      expect(imageSrc1).toBe('img-3.jpg');
    })
  });
});
