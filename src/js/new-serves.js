import axios from 'axios'
export default class NewsApiServes {
    constructor() { 
        this.searchQuery = "";
        this.page = 1;
    }
    
   async fetchArticles() {
        const url = `https://pixabay.com/api/?key=28351441-36643387bd1a8158570da0675&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    this.icrementPage()
       const {data} = await axios.get (url
       )
       return data;
        
    } 
    get query() {
        return this.searchQuery;
        
    }
    set query(newSearchQuery) {
        this.searchQuery = newSearchQuery;   
    }
    icrementPage() {
        this.page += 1;
    }
     resetPage() {
        this.page = 1;
    }
}