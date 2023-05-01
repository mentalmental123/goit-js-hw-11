

export function createGalleryMarkup(pictureArray) {
    if (!pictureArray) {
        return 'No data was found';
    }
    return pictureArray.map(({webformatURL, blargeImageURL ,tags, likes, views, comments, downloads}) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
    <span>Likes:</span>
      <b>${likes}</b>
    </p>
    <p class="info-item">
    <span>Views:</span>
      <b>${views}</b>
    </p>
    <p class="info-item">
    <span>Comments:</span>
      <b>${comments}</b>
    </p>
    <p class="info-item">
    <span>Downloads:</span>
      <b>${downloads}</b>
    </p>
  </div>
</div>`).join('');
}