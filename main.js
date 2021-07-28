var canvas;
var ctx;
var rotationStartTime;
var images = [];
var imageIndex = 0;
var width;
var height;

const IMAGE_URLS = [
  "/Images/slideshow1a.jpg",
  "/Images/slideshow2.jpg",
  "/Images/slideshow3.jpg",
];
const a = 2 * Math.PI / 6;
const ADVANCE_INTERVAL_MS = 10000;
const ROTATION_SPEED_MS = 1000;
const ROTATION_AMOUNT = Math.PI / 3;
const BORDER_WIDTH_DIVISOR = 40;

function init() {
  canvas = document.getElementById('photoshow');
  ctx = canvas.getContext('2d');

  // Set canvas bound vars on load and on any resize.
  window.addEventListener('resize', setSize, true);
  setSize();
 
  // Load all images from URL.
  for (let i = 0; i < IMAGE_URLS.length; i++) {
    const url = IMAGE_URLS[i];
    const img = new Image();
    img.src = url;
    images[i] = img;
  }

  // Call drawing function to start infinite loop.
  window.requestAnimationFrame(draw);

  // Set a periodic interval to advance the slideshow.
  setInterval(function() {
    // Setting rotation start time to now triggers the animation.
    rotationStartTime = Date.now();
    // Update the current image being displayed, while it's faded out.
    setTimeout(function() {
      imageIndex = (imageIndex+1)%(IMAGE_URLS.length)
    }, ROTATION_SPEED_MS / 2);
  }, ADVANCE_INTERVAL_MS);
}

function setSize() {
  // Get the device pixel ratio, falling back to 1.
  let dpr = window.devicePixelRatio || 1;
  // Get current size of the canvas.
  let rect = canvas.getBoundingClientRect();

  // Increase the actual size of our canvas (in HTML attributes).
  // All size calculations assume a square canvas.
  canvas.width = rect.width * dpr;
  canvas.height = rect.width * dpr;

  // Ensure all drawing operations are scaled.
  ctx.scale(dpr, dpr);

  // Scale everything down using CSS
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.width + 'px';

  // Save visible measurements for drawing later.
  width = rect.width;
  height = rect.width;

  console.log("Setting size", rect.width, rect.width, canvas.width, canvas.height)
}

function draw() {
  const centerX = width / 2;
  const centerY = height / 2;
  const borderWidth = width / BORDER_WIDTH_DIVISOR;
  const radius = (width / 2) - borderWidth;

  ctx.save();
  ctx.clearRect(0, 0, width, height);

  let rotationOffset = 0;
  let imageOpacity = 1.0;
  const animationProgress = (Date.now() - rotationStartTime) / ROTATION_SPEED_MS;
  const animationOffset = easeInOutCubic(animationProgress);
  if (animationProgress < 1) {
    rotationOffset = ROTATION_AMOUNT * animationOffset;
    imageOpacity = Math.abs((animationOffset - 0.5)*2);
  }

  ctx.beginPath();
  for (var i = 0; i < 6; i++) {
    ctx.lineTo(
      centerX + radius * Math.cos((a * i) + rotationOffset),
      centerY + radius * Math.sin((a * i) + rotationOffset));
  }
  ctx.closePath();
  ctx.clip();

  ctx.globalAlpha = imageOpacity;
  ctx.drawImage(images[imageIndex], 0, 0, width, height)

  // Reset context since we don't want the clipping path to apply any more.
  ctx.restore();

  ctx.saveBORDER_WIDTH_DIVISOR;
  ctx.lineWidth = borderWidth;
  ctx.stroke();
  ctx.restore();

  window.requestAnimationFrame(draw);
}

init();

// From https://easings.net/#easeInOutCubic
function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
