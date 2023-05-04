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
    q: '',
});



class Pixabay {
    constructor() { }
    
    async getPictures() {
        try {
            
            const { data } = await axios.get(`?${searchParams}`)
         
            return data;
            
        } catch(e) {
            console.error(e.message);
        }
        
    }
}


const pixabay = new Pixabay();

export {pixabay, searchParams};



