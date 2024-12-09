import iconError from '../img/octagon.svg';


export function renderGallery(images) {
  const galleryEl = document.querySelector('.gallery');
  const markup = images.map(image => `
    <a href="${image.largeImageURL}" class="gallery__item">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="gallery__image" />
      <div class="info">
        <p><b>Likes</b> ${image.likes}</p>
        <p><b>Views</b> ${image.views}</p>
        <p><b>Comments</b> ${image.comments}</p>
        <p><b>Downloads</b> ${image.downloads}</p>
      </div>
    </a>
  `).join('');
  
    galleryEl.insertAdjacentHTML('beforeend', markup);
    
    const imagesLoaded = Array.from(galleryEl.querySelectorAll('img')).map(img => {
    return new Promise(resolve => {
      img.onload = resolve;
      img.onerror = resolve;
    });
  });
  
  Promise.all(imagesLoaded).then(() => {
    galleryEl.classList.add('visible');    
});    
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

export function showLoader() {
  document.querySelector('.loader').classList.remove('hidden');
}

export function hideLoader() {
  document.querySelector('.loader').classList.add('hidden');
}

export function toggleLoadMoreButton(show) {
  const button = document.querySelector('.load-more');
  if (show) {
    button.classList.remove('hidden');
  } else {
    button.classList.add('hidden');
  }
}

export function showMessage(message) {
  import('izitoast/dist/css/iziToast.min.css').then(() => {
    import('izitoast').then(({ default: iziToast }) => {
        iziToast.error({
        iconUrl: iconError,
        title: '',
        message,
        position: 'topRight',
        messageColor: '#ffffff',
        backgroundColor: '#ef4040',
        iconColor: '#ffffff',
        maxWidth: '432px',
        iconText: '16px',
      });
    });
  });
}
