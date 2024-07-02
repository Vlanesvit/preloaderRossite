(function () {
	'use strict';
	const dBody = document.body;

	if (dBody) {
		const preloader = dBody.querySelector('.preloader'),
			preloaderImgs = preloader.querySelectorAll('.preloader__imgs img'),
			progressBar = preloader.querySelector('.preloader__line-progress'),
			url = document.location.href,
			images = document.querySelectorAll('img:not(.preloader__imgs img)'),
			finalImg = preloader.querySelector('.preloader__imgs img.finish'),
			cacheCleared = localStorage.getItem('cacheCleared') === null;

		let loadingProgress = 0,
			start = 0,
			duration = 80;

		function animateLoad(progress) {
			// Функция для анимации прогресс-бара
			let interval = setInterval(() => {
				if (start < progress && start < 100) {
					start++;
					if (start === 100) {
						clearInterval(interval);
						setTimeout(() => {
							preloader.style.cssText = "opacity: 0; visibility: hidden;";
							localStorage.setItem('cacheCleared', 'false');
						}, 1);
					}
					let translateValue = -100 + start;
					progressBar.style.cssText = `transform: translateX(${translateValue}%);`;
				}
			}, 1);

			let now = -1;
			// Функция для изменения изображения в прелоадере
			function changeImage() {
				preloaderImgs.forEach(img => img.style.display = 'none');
				now = (now + 1) % preloaderImgs.length;
				preloaderImgs[now].style.display = 'block';
			}
			setInterval(changeImage, duration);
		}

		// Добавление слушателей событий для XHR
		function addListeners(xhr) {
			xhr.addEventListener('loadend', () => animateLoad(100));
			xhr.addEventListener('progress', (e) => {
				loadingProgress = loadingProgress + (100 - loadingProgress) / (images.length + 1);
				animateLoad(loadingProgress);
			});
		}

		// Выполнение XHR запроса
		function runXHR(url) {
			const xhr = new XMLHttpRequest();
			addListeners(xhr);
			xhr.open("GET", url);
			xhr.send();
		}

		if (cacheCleared) {
			// При первом заходе или очищенном кеше показываем все изображения прелоадера
			runXHR(url);
		} else {
			// При обновлении страницы показываем только финальное лого и привязываем его к загрузке DOM
			preloaderImgs.forEach(img => img.style.display = 'none');
			finalImg.style.display = 'block';
			window.addEventListener('load', () => {
				preloader.style.cssText = "opacity: 0; visibility: hidden;";
			});
		}
	}
})();
