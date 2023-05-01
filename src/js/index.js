
import { refs } from "./refs";
import { searchQuerrySubmitForm , loadMorePictures } from "./handler";

refs.addMoreButton.addEventListener('click', loadMorePictures);

refs.searchForm.addEventListener('submit', searchQuerrySubmitForm);

