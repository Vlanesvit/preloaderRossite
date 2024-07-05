(function () {
	'use strict';

	const preloader = document.querySelector('.preloader'),
		preloaderImgs = preloader.querySelectorAll('.preloader__imgs img'),
		preloadProgress = preloader.querySelector('.preloader__line'),
		preloadProgressLine = preloadProgress.querySelector('.preloader__line-progress'),
		finishImg = document.querySelector('.preloader__imgs img[src*="finish"]'),
		cacheCleared = sessionStorage.getItem('cacheCleared') === null;

	let start = 0,
		preloadDuration = 10000,
		nowImg = -1,
		ImgChangeDuration = 60;

	function showNextImage() {
		// Функция для изменения изображения в прелоадере
		function changeImage() {
			preloaderImgs.forEach(img => img.style.display = 'none');
			nowImg = (nowImg + 1) % preloaderImgs.length;
			preloaderImgs[nowImg].style.display = 'block';
		}

		setInterval(changeImage, ImgChangeDuration);
	}

	function hidePreload() {
		preloader.style.opacity = '0';
		preloader.style.visibility = 'hidden';
	}

	function completePreloading() {
		preloadProgressLine.style.width = '100%';
		preloadProgressLine.style.transitionDuration = `8s`;
		preloadProgressLine.addEventListener('transitionend', function () {
			preloadProgress.classList.add('_ended')
		});
	}

	if (cacheCleared) {
		// При первом заходе или очищенном кеше показываем все изображения прелоадера
		showNextImage();
		completePreloading();
		setTimeout(() => {
			hidePreload();
			sessionStorage.setItem('cacheCleared', 'false');
		}, preloadDuration);
	} else {
		// При обновлении страницы показываем только финальное лого и привязываем его к загрузке DOM
		preloaderImgs.forEach(img => img.style.display = 'none');
		finishImg.style.display = 'block';
		setTimeout(() => {
			hidePreload()
		}, 1000);
	}
})();