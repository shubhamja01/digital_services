const scrollContainer = document.querySelector('.scroll-container');
const mainContainer = document.querySelector('.main-container');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let isDown = false;
let startX;
let scrollLeft;

// Function to update active dot
function updateDots(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

// Function to scroll to the clicked dot's corresponding section
function scrollToIndex(index) {
    const scrollAmount = index * 620; // 200px per div + 10px margin on both sides (total 210px per div)
    mainContainer.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
    currentIndex = index;
    updateDots(index);
}

// Handle dot clicks
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => scrollToIndex(index));
});

// Synchronize dots with scroll position
mainContainer.addEventListener('scroll', () => {
    const scrollLeft = mainContainer.scrollLeft;
    const index = Math.round(scrollLeft / 620); // Calculate the index based on scroll position
    updateDots(index);
});

// Enable mouse drag functionality
mainContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    mainContainer.classList.add('active');
    startX = e.pageX - mainContainer.offsetLeft;
    scrollLeft = mainContainer.scrollLeft;
});

mainContainer.addEventListener('mouseleave', () => {
    isDown = false;
    mainContainer.classList.remove('active');
});

mainContainer.addEventListener('mouseup', () => {
    isDown = false;
    mainContainer.classList.remove('active');
});

mainContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - mainContainer.offsetLeft;
    const walk = (x - startX) * 3; // Scroll speed multiplier
    mainContainer.scrollLeft = scrollLeft - walk;
});
