const videoCards = document.querySelectorAll('.video-card video');
const lightbox = document.getElementById('video-lightbox');
const lightboxVideo = document.querySelector('.lightbox-video');
const closeBtn = document.querySelector('.lightbox .close');

videoCards.forEach((vid, index) => {
    vid.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxVideo.src = vid.src;
        lightboxVideo.play();
        currentIndex = index;
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    lightboxVideo.pause();
    lightboxVideo.src = '';
});
