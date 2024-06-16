let currentIndex = 0;

function openModal(element) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  
  modal.style.display = 'block';
  modalImg.src = element.src;
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

function scrollLeft() {
  const gallery = document.querySelector('.gallery');
  if (currentIndex > 0) {
    currentIndex--;
    gallery.style.transform = `translateX(-${currentIndex * 33.33}%)`;
  }
}

function scrollRight() {
  const gallery = document.querySelector('.gallery');
  const totalImages = document.querySelectorAll('.gallery-item').length;
  const visibleImages = 3; // Number of images visible at once
  if (currentIndex < totalImages - visibleImages) {
    currentIndex++;
    gallery.style.transform = `translateX(-${currentIndex * 33.33}%)`;
  }
}
