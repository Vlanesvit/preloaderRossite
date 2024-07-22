(function () {
	'use strict';

	const preloader = document.querySelector('.preloader'),
		preloaderImgs = preloader.querySelectorAll('.preloader__imgs img'),
		preloadProgress = preloader.querySelector('.preloader__line'),
		preloadProgressLine = preloadProgress.querySelector('.preloader__line-progress'),
		finishImg = document.querySelector('.preloader__imgs img[src*="finish"]'),
		cacheCleared = sessionStorage.getItem('cacheCleared') === null;

	let nowImg = -1,
		preloadDuration = 10000, // 10 секунд
		ImgChangeDuration = 60; // Изменение изображения каждые 1 секунда

	// Функция для изменения изображения в прелоадере
	function changeImage() {
		preloaderImgs.forEach(img => img.style.display = 'none');
		nowImg = (nowImg + 1) % preloaderImgs.length;
		preloaderImgs[nowImg].style.display = 'block';
	}

	// Функция для запуска анимации прогресс-бара
	function startProgressBar() {
		preloadProgressLine.style.transition = `width ${preloadDuration}ms cubic-bezier(0.11, 0, 0.5, 0)`;
		preloadProgressLine.style.width = '100%';
	}

	// Функция для скрытия прелоадера
	function hidePreloader() {
		preloader.style.opacity = '0';
		preloader.style.visibility = 'hidden';
	}

	// Основная функция для анимации и показа прелоадера
	function startPreloader() {
		startProgressBar();
		setInterval(changeImage, ImgChangeDuration);
		setTimeout(() => {
			preloadProgress.classList.add('_ended')
			setTimeout(() => {
				hidePreloader();
				sessionStorage.setItem('cacheCleared', 'false');
			}, 2000); // Дополнительные 2 секунды для завершения всех анимаций
		}, preloadDuration);
	}

	if (cacheCleared) {
		// При первом заходе или очищенном кеше показываем все изображения прелоадера
		startPreloader();
	} else {
		// При обновлении страницы показываем только финальное лого и привязываем его к загрузке DOM
		preloaderImgs.forEach(img => img.style.display = 'none');
		finishImg.style.display = 'block';
		window.addEventListener('DOMContentLoaded', () => {
			setTimeout(() => {
				hidePreloader();
			}, 1000);
		});
	}
})();
