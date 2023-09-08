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
startAutoRotation();

// Add slider change event
rotationSlider.addEventListener('input', () => {
    const rotationValue = rotationSlider.value;
    const imageURL = `product/${rotationValue}.jpg`;
    productImage.src = imageURL;
});
