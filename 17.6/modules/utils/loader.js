export function showLoader() {
    const loader = document.getElementById('preloader');
    if (loader) {
        loader.classList.remove('hidden');
    }
}

export function hideLoader() {
    const loader = document.getElementById('preloader');
    if (loader) {
        loader.classList.add('hidden');
    }
}