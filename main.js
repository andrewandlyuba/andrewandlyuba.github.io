var canvas;
var ctx;
var rotationStartTime;
var images = [];
var imageIndex = 0;

const IMAGE_URLS = [
  "https://via.placeholder.com/500.png/09f/fff?text=1",
  "https://via.placeholder.com/500.png/f9f/fff?text=2",
  "https://via.placeholder.com/500.png/90f/fff?text=3",
];
const a = 2 * Math.PI / 6;
const ADVANCE_INTERVAL_MS = 10000;
const ROTATION_SPEED_MS = 1000;
const ROTATION_AMOUNT = Math.PI / 3;
const BORDER_WIDTH = 10;

function init() {
  canvas = document.getElementById('photoshow');
  ctx = canvas.getContext('2d');
  
  // Load all images from URL.
  for (let i = 0; i < IMAGE_URLS.length; i++) {
    const url = IMAGE_URLS[i];
    const img = new Image();
    img.src = url;
    images[i] = img;
  }

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

function draw() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = (canvas.width / 2) - BORDER_WIDTH;

  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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
  ctx.drawImage(images[imageIndex], 0, 0, canvas.width, canvas.height)

  // Reset context since we don't want the clipping path to apply any more.
  ctx.restore();

  ctx.save();
  ctx.lineWidth = BORDER_WIDTH;
  ctx.stroke();
  ctx.restore();

  window.requestAnimationFrame(draw);
}

init();

// From https://easings.net/#easeInOutCubic
function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
