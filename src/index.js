
import NewsApiServes from "./js/new-serves";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

Notify.init({
width: '300px',
position: 'rigth-top',
timeout: 1000
});

const refs = {
    searchForm: document.querySelector('#search-form'),
    searchBtn: document.querySelector('button'),
  loadMoreBtn: document.querySelector('.load-more'),
  galleryBlock: document.querySelector('.gallery')
}


refs.searchForm.addEventListener('submit', onButtonClick);
refs.loadMoreBtn.addEventListener('click', onLoadMore)
const newsApiServes = new NewsApiServes();

async function onButtonClick(e) {
  e.preventDefault();
  clearGelleryForm()
  newsApiServes.page = 1; 
 

    newsApiServes.query = e.target.elements.searchQuery.value.trim()
console.log(newsApiServes.query) 
  if (!newsApiServes.query) { return Notify.info("Еnter a search query") }
  try {
    const { hits, totalHits } = await newsApiServes.fetchArticles()
     if(!totalHits) return Notify.warning("Sorry, there are no images matching your search query. Please try again.")
    randerGallary(hits);
    lightbox.refresh();
Notify.success(`Hooray! We found ${totalHits} images.`)
  refs.searchForm.reset();
  }
  catch (error) { caonsole.log(error)}  
 
  
  
  }

async function onLoadMore() {
  try {
    const { hits, totalHits } = await newsApiServes.fetchArticles()
    randerGallary(hits)
    lightbox.refresh();
    scrollSmoothly()
  } catch (error) { caonsole.log(error)} 
   
}

 function makeGalleryMakup(searchImage) {
   return searchImage.map(({ largeImageURL,
     webformatURL,
     tags,
     likes,
     views,
     comments,
     downloads }) => `
    <div class="photo-card">
    <a href = "${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
  </a>
</div>`).join('');
}

function randerGallary(searchImg) {
    refs.galleryBlock.insertAdjacentHTML('beforeend', makeGalleryMakup(searchImg))
}

function clearGelleryForm() {
  refs.galleryBlock.innerHTML = "";
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 500,
});
function scrollSmoothly() {
  const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}