import { pixabay } from "./pixabayAPI";
import { refs } from "./refs";
import { createGalleryMarkup } from "./createMarkup";
let PAGE_COUNTER = 0;


async function searchQuerrySubmitForm(evt) {
    evt.preventDefault();
    refs.imageGalerry.innerHTML = '';
    PAGE_COUNTER = 1;
    refs.addMoreButton.style.display = 'none';
    const inputValue = await refs.input.value;
    const InputValue = await inputValue // get data from input
    const hits = await pixabay.getPictures(InputValue, PAGE_COUNTER);
    if (!hits) {
        return 'Error';
    }
    refs.addMoreButton.style.display = 'block';

    refs.imageGalerry.insertAdjacentHTML('beforeend', createGalleryMarkup(hits));
    
}



async function loadMorePictures(evt) {
    const hits = await pixabay.getPictures('', ++PAGE_COUNTER);
    console.log(hits);
    refs.imageGalerry.insertAdjacentHTML('beforeend', createGalleryMarkup(hits));
}


export { searchQuerrySubmitForm , loadMorePictures};