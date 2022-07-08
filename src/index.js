import './sass/index.scss'
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
  searchBtn: document.querySelector('.button'),
  loadMoreBtn: document.querySelector('.load-more'),
  galleryBlock: document.querySelector('.gallery'),
  }


refs.searchForm.addEventListener('submit', onSearchClick);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick)

const newsApiServes = new NewsApiServes();
refs.loadMoreBtn.classList.add('is-hidden');

async function onSearchClick(e) {
  e.preventDefault();
   clearGelleryForm()
  
  
  try {
    newsApiServes.query = e.target.elements.searchQuery.value.trim()
   
  const { hits, totalHits } = await newsApiServes.fetchArticles()
    if (!newsApiServes.query) {
      refs.loadMoreBtn.classList.add('is-hidden');
      return Notify.info("Еnter a search query")
    }
    
         if (!totalHits) {
         refs.loadMoreBtn.classList.add('is-hidden');
        refs.searchForm.reset()
       
        return Notify.warning("Sorry, there are no images matching your search query. Please try again.")
         }
      
    newsApiServes.page = 1;
     refs.loadMoreBtn.classList.remove('is-hidden');
    loadImage()
         
    e.target.reset();
    refs.searchForm.reset();
  } catch (error) {
    console.log(error.message)
  };
   
}



async function loadImage() {
       try {
    const { hits, totalHits } = await newsApiServes.fetchArticles()
        //  if (!totalHits) {
        //  refs.loadMoreBtn.classList.add('is-hidden');
        // refs.searchForm.reset()
       
        // return Notify.warning("Sorry, there are no images matching your search query. Please try again.")
        //  }
      
            Notify.success(`Hooray! We found ${totalHits} images.`);
        


    randerGallary(hits);
    lightbox.refresh();
    scrollSmoothly();
    
  }
       catch (error) {
         console.log(error.message);
        
       }
  
}


async function onLoadMoreClick() {
  try {
    const { hits, totalHits } = await newsApiServes.fetchArticles()
  
  randerGallary(hits);
    lightbox.refresh();
    scrollSmoothly();
    
    const totalNumber = document.getElementsByClassName('photo-card').length;
        
        if (totalNumber >= totalHits) {
            Notify.warning(`We're sorry, but you've reached the end of search results.`);
            refs.loadMoreBtn.classList.add('is-hidden')
        }      
  }
       catch (error) {
         console.log(error.message);
         
       }
  
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
