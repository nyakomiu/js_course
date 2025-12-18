function createThumbnailHandler(thumbnail) {
    return function() {
        const imageUrl = thumbnail.src;
        const fullImage = document.getElementById('full-image');
        const placeholder = document.getElementById('placeholder-text');

        fullImage.src = imageUrl;
        fullImage.style.display = 'block';
        placeholder.style.display = 'none';
    };
}
document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumb');
    thumbnails.forEach(thumbnail => {
        const handler = createThumbnailHandler(thumbnail);
        thumbnail.addEventListener('click', handler);
    });
});