function init() {
  // Show/hide top menu when appropriate
  window.addEventListener("scroll", showHideMenu);
  window.addEventListener("resize", showHideMenu);
  showHideMenu();

  var emblaRoot = document.querySelector('.embla')
  const autoplay = EmblaCarouselAutoplay({ delay: 5000 })
  var embla = EmblaCarousel(emblaRoot, { loop: true }, [autoplay])
}

function showHideMenu() {
  const threshold = this.document.getElementById("welcome").clientHeight * (2/3);
  if (window.scrollY > threshold) {
    this.document.getElementById("sticky").classList.add("visible");
  } else {
    this.document.getElementById("sticky").classList.remove("visible");
  }
}

init();
