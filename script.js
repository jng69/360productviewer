const productContainer = document.querySelector('.product-container');
const productImage = document.getElementById('product-image');
const rotationSlider = document.getElementById('rotation-slider');
let isDragging = false;
let initialX = 0;
let currentX = 0;
let animationInterval; // Variable to store the animation interval ID

// Function to handle touch and mouse start events
function startDrag(e) {
    isDragging = true;
    initialX = e.clientX || e.touches[0].clientX;
    currentX = initialX;

    e.preventDefault(); // Prevent default dragging behavior on desktop
}

// Function to handle touch and mouse move events
function drag(e) {
    if (!isDragging) return;

    const deltaX = (e.clientX || e.touches[0].clientX) - currentX;
    currentX = e.clientX || e.touches[0].clientX;

    const rotationValue = parseInt(rotationSlider.value);
    const newRotationValue = rotationValue + (deltaX / 10); // Adjust the sensitivity as needed

    // Ensure the value stays within the range [0, 35]
    rotationSlider.value = (newRotationValue + 36) % 36;

    const imageURL = `product/${rotationSlider.value}.jpg`;
    productImage.src = imageURL;
}

// Function to handle touch and mouse end events
function endDrag() {
    isDragging = false;
}

// Function to start the auto-rotation animation
function startAutoRotation() {
    let rotationValue = parseInt(rotationSlider.value);
    
    // Set an interval to increment the rotation value
    animationInterval = setInterval(() => {
        rotationValue++;
        
        // Check if we reached the last frame (35)
        if (rotationValue > 35) {
            clearInterval(animationInterval); // Stop the animation
        } else {
            rotationSlider.value = rotationValue;
            const imageURL = `product/${rotationValue}.jpg`;
            productImage.src = imageURL;
        }
    }, 100); // Adjust the interval duration for animation speed
}

// Add touch and mouse event listeners to the product container
productContainer.addEventListener('mousedown', startDrag);
productContainer.addEventListener('mousemove', drag);
productContainer.addEventListener('mouseup', endDrag);

productContainer.addEventListener('touchstart', startDrag);
productContainer.addEventListener('touchmove', drag);
productContainer.addEventListener('touchend', endDrag);

// Add a click event to start the auto-rotation animation
//productContainer.addEventListener('click', startAutoRotation);
//startAutoRotation();

// Add slider change event
rotationSlider.addEventListener('input', () => {
    const rotationValue = rotationSlider.value;
    const imageURL = `product/${rotationValue}.jpg`;
    productImage.src = imageURL;
});

/* PRELOAD IMAGES */
var imageUrls = [
'https://jng69.github.io/360productviewer/product/0.jpg',
'https://jng69.github.io/360productviewer/product/1.jpg',
'https://jng69.github.io/360productviewer/product/2.jpg',
'https://jng69.github.io/360productviewer/product/3.jpg',
'https://jng69.github.io/360productviewer/product/4.jpg',
'https://jng69.github.io/360productviewer/product/5.jpg',
'https://jng69.github.io/360productviewer/product/6.jpg',
'https://jng69.github.io/360productviewer/product/7.jpg',
'https://jng69.github.io/360productviewer/product/8.jpg',
'https://jng69.github.io/360productviewer/product/9.jpg',
'https://jng69.github.io/360productviewer/product/10.jpg',
'https://jng69.github.io/360productviewer/product/11.jpg',
'https://jng69.github.io/360productviewer/product/12.jpg',
'https://jng69.github.io/360productviewer/product/13.jpg',
'https://jng69.github.io/360productviewer/product/14.jpg',
'https://jng69.github.io/360productviewer/product/15.jpg',
'https://jng69.github.io/360productviewer/product/16.jpg',
'https://jng69.github.io/360productviewer/product/17.jpg',
'https://jng69.github.io/360productviewer/product/18.jpg',
'https://jng69.github.io/360productviewer/product/19.jpg',
'https://jng69.github.io/360productviewer/product/20.jpg',
'https://jng69.github.io/360productviewer/product/21.jpg',
'https://jng69.github.io/360productviewer/product/22.jpg',
'https://jng69.github.io/360productviewer/product/23.jpg',
'https://jng69.github.io/360productviewer/product/24.jpg',
'https://jng69.github.io/360productviewer/product/25.jpg',
'https://jng69.github.io/360productviewer/product/26.jpg',
'https://jng69.github.io/360productviewer/product/27.jpg',
'https://jng69.github.io/360productviewer/product/28.jpg',
'https://jng69.github.io/360productviewer/product/29.jpg',
'https://jng69.github.io/360productviewer/product/30.jpg',
'https://jng69.github.io/360productviewer/product/31.jpg',
'https://jng69.github.io/360productviewer/product/32.jpg',
'https://jng69.github.io/360productviewer/product/33.jpg',
'https://jng69.github.io/360productviewer/product/34.jpg'
];

function preloadImages(urls, callback) {
    var loaded = 0;
    var images = [];

    function imageLoaded() {
        loaded++;
        if (loaded === urls.length) {
            callback(images);
            console.log(images);
        }
    }

    for (var i = 0; i < urls.length; i++) {
        var img = new Image();
        img.src = urls[i];
        img.onload = imageLoaded;
        images.push(img);
    }
}

preloadImages(imageUrls, function(images) {
    /* All images are preloaded and stored in the "images" array You can now call your function or perform any action you want with the preloaded images. */
    myFunction(images);
});

function myFunction(images) {
    /* Your code to display or manipulate the preloaded images goes here. */
    console.log('all images loaded');
    startAutoRotation();
}
