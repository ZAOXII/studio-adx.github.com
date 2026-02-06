const photos = document.querySelectorAll('.photo img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

function openLightbox(index){
    currentIndex = index;
    lightbox.classList.add('show');
    lightboxImg.src = photos[currentIndex].src;
    lightboxImg.alt = photos[currentIndex].alt;
}

function closeLightbox(){
    lightbox.classList.remove('show');
}

// Clic sur la photo
photos.forEach((photo, index) => {
    photo.addEventListener('click', () => openLightbox(index));
});

// Clic sur fermer
closeBtn.addEventListener('click', closeLightbox);

// Clic sur fond
lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) closeLightbox();
});

// Navigation flèches
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    lightboxImg.src = photos[currentIndex].src;
    lightboxImg.alt = photos[currentIndex].alt;
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % photos.length;
    lightboxImg.src = photos[currentIndex].src;
    lightboxImg.alt = photos[currentIndex].alt;
});

// Navigation clavier
document.addEventListener('keydown', (e) => {
    if(!lightbox.classList.contains('show')) return;
    if(e.key === 'ArrowLeft') prevBtn.click();
    if(e.key === 'ArrowRight') nextBtn.click();
    if(e.key === 'Escape') closeLightbox();
});
