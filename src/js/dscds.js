async function loadImages() {
    

    try {
        const { hits, totalHits } = await pixabayAPI.fetchImages();
        if (!totalHits) {
            onFinishLoadingImages();
            formRef.reset();
            loadMoreBtn.style.display = 'none';
            return Notify.warning(
                'Sorry, there are no images matching your search query. Please try again.'
            );
        }

        if (pixabayAPI.page === 2) {
            Notify.success(`Hooray! We found ${totalHits} images.`);
        }

        if (loadingMoreMethod === 'button' && hits.length < totalHits) {
            loadMoreBtn.textContent = `Load more ${pixabayAPI.searchQuery || ''}`;
            loadMoreBtn.style.display = 'block';
        }

        if (galleryRef.childElementCount >= totalHits) {
            Notify.info("We're sorry, but you've reached the end of search results.");
            loadMoreBtn.style.display = 'none';
        }

        renderGallery(hits);
        lightbox.refresh();

        const { height: cardHeight } =
            galleryRef.firstElementChild.getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });
    } catch (err) {
        console.log(err.message);
        if (err.message === 'Request failed with status code 400') {
            Notify.info("We're sorry, but you've reached the end of search results.");
            loadMoreBtn.style.display = 'none';
        }
    }
}