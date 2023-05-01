import axios from "axios";
import { Notify } from "notiflix";
import { refs } from "./refs";


const APIKEY = '35927356-03cae75c91b8b6400b36c16fd';
const BASEURL = 'https://pixabay.com/api/';
const PERPAGE = 40;

axios.defaults.baseURL = `${BASEURL}`;

const searchParams = new URLSearchParams({
    key: APIKEY,
    image_type: 'photo',           // ok
    orientation: 'horizaontal',
    safesearch: true,
    per_page: PERPAGE,
});



class Pixabay {
    constructor() { }
    
    async getPictures(searchPrompts, pageCounter) {
        try {
            console.log(pageCounter);
            if (searchPrompts) {
            searchParams.append('q', searchPrompts);
            }
            const { data } = await axios.get(`?${searchParams}&page=${pageCounter}`)
            if (pageCounter === 1 && data.hits.length) {
            Notify.success(`Hooray! We found ${data.totalHits} images.`)
            }
            const pictureTreshold = data.totalHits / PERPAGE;

            if (Math.ceil(pictureTreshold) === pageCounter) {
                Notify.failure("We're sorry, but you've reached the end of search results.");
                refs.addMoreButton.style.display = 'none';
            }

            console.log(data);
            if (!data.hits.length) {
                Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                throw new Error('No data was found');
            }
            
            return data.hits;
            
        } catch(e) {
            console.error(e.message);
        }
        
    }
}


export const pixabay = new Pixabay();