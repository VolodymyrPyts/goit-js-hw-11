import axios from 'axios'

// axios.defaults.baseURL = 'https://pixabay.com/api/';

axios.get (
    'https://pixabay.com/api/?key=28351441-36643387bd1a8158570da0675&q=cat&image_type=photo&orientation=horizontal&safesearch=true')
    .then(response => console.log(response.data))
    .then(
    
)