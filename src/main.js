import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery, showLoader, hideLoader, toggleLoadMoreButton, showMessage } from './js/render-functions.js';

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]');
const loadMoreBtn = document.querySelector('.load-more');
let query = '';
let page = 1;
const perPage = 30;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  query = input.value.trim();

  if (!query) {
    showMessage('Please enter a search term!');
    return;
  }

  page = 1;
  clearGallery();
  toggleLoadMoreButton(false);
  showLoader();

  try {
    const data = await fetchImages(query, page, perPage);
    if (data.hits.length === 0) {
      showMessage('Sorry, no images found. Try a different query.');
    } else {
      renderGallery(data.hits);
      toggleLoadMoreButton(data.hits.length === perPage);
    }
  } catch (error) {
    showMessage('Please try again.');
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();
  toggleLoadMoreButton(false);

  try {
    const data = await fetchImages(query, page, perPage);
    renderGallery(data.hits);
    if (data.hits.length < perPage || data.totalHits <= page * perPage) {
      toggleLoadMoreButton(false);
      showMessage("We're sorry, but you've reached the end of search results.");
    } else {
      toggleLoadMoreButton(true);
    }
  } catch (error) {
    showMessage('Please try again.');
  } finally {
    hideLoader();
  }
});
