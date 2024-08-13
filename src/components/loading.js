const loadingContainer = document.querySelector('.loading');

function show() {
  loadingContainer.classList.remove('hidden');
  loadingContainer.parentElement.classList.add('loading-in-progress');
}

function hide() {
  loadingContainer.classList.add('hidden');
  loadingContainer.parentElement.classList.remove('loading-in-progress');
}

export const loading = { show, hide };
