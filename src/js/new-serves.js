import axios from 'axios'
export default class NewsApiServes {
    constructor() { 
        this.searchQuery = "";
        this.page = 1;
    }
    
    fetchArticles() {
const url = `https://pixabay.com/api/?key=28351441-36643387bd1a8158570da0675&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}`
    
        axios.get (url
    )
            .then(r => {
                this.page += 1;
                console.log(r.data.hits)
                
            }
            )
    }
    get query() {
        return this.searchQuery;
    }
    set query(newSearchQuery) {
        this.searchQuery = newSearchQuery;   
    }
}