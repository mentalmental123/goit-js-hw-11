import { pixabay, searchParams } from "./pixabayAPI";
import { refs } from "./refs";
import { createGalleryMarkup } from "./createMarkup";
import { Notify } from "notiflix";
let PAGE_COUNTER = 1;

const PERPAGE = 40;
let pictureTreshold = 0;


async function searchQuerrySubmitForm(evt) {
    evt.preventDefault();
    refs.imageGalerry.innerHTML = '';
    refs.addMoreButton.style.display = 'none';

    const inputValue = refs.searchForm.elements.searchQuery.value.trim(); // get data from input

    if (!inputValue) {
       return  Notify.info('Please enter a search querry');
    }

    searchParams.set('q',inputValue);
    
    PAGE_COUNTER = 1;
    searchParams.set('page', PAGE_COUNTER)

    const data = await pixabay.getPictures();

    if (data.hits.length) {
            Notify.success(`Hooray! We found ${data.totalHits} images.`)
        }
        else{
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return 'Error';
        }
    pictureTreshold = data.totalHits / PERPAGE;

    if (data.hits.length == PERPAGE) {
        refs.addMoreButton.style.display = 'block';
    }

    refs.imageGalerry.insertAdjacentHTML('beforeend', createGalleryMarkup(data.hits));
}



async function loadMorePictures(evt) {
    PAGE_COUNTER++;
    console.log(PAGE_COUNTER);
     if (Math.ceil(pictureTreshold) === PAGE_COUNTER) {
            Notify.failure("We're sorry, but you've reached the end of search results.");
            refs.addMoreButton.style.display = 'none';
        }
    
    searchParams.set('page', PAGE_COUNTER)
    const data = await pixabay.getPictures();
    console.log(data.hits);
    refs.imageGalerry.insertAdjacentHTML('beforeend', createGalleryMarkup(data.hits));
}


export { searchQuerrySubmitForm , loadMorePictures};