
import NewsApiServes from "./js/new-serves";

const refs = {
    searchForm: document.querySelector('#search-form'),
    searchBtn: document.querySelector('button'),
    loadMoreBtn: document.querySelector('.load-more'),
}


refs.searchForm.addEventListener('submit', onButtonClick);
refs.loadMoreBtn.addEventListener('click', onLoadMore)
const newsApiServes = new NewsApiServes();

function onButtonClick(e) {
    e.preventDefault();
    newsApiServes.page = 1; 
    newsApiServes.query = e.currentTarget.elements.searchQuery.value
     newsApiServes.fetchArticles()
}

function onLoadMore () {
  newsApiServes.fetchArticles()  
}




// .<div class="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>