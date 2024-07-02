(function () {
	'use strict';
	const dBody = document.body;

	if (dBody) {
		const preloader = dBody.querySelector('.preloader'),
			preloaderImgs = preloader.querySelectorAll('.preloader__imgs img'),
			progressBar = preloader.querySelector('.preloader__line-progress'),
			finalImg = preloader.querySelector('img[src*="finish"]'),
			cacheCleared = localStorage.getItem('cacheCleared') === null;

		let start = 0,
			duration = 80;

		// Функция для анимации прогресс-бара
		function animateBar() {
			let interval = setInterval(() => {
				if (start < 100) {
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
			}, 100); // Обновляем каждую сотую долю секунды для 10 секундного прелоадера

			let now = -1;
			// Функция для изменения изображения в прелоадере
			function changeImage() {
				preloaderImgs.forEach(img => img.style.display = 'none');
				now = (now + 1) % preloaderImgs.length;
				preloaderImgs[now].style.display = 'block';
			}

			setInterval(changeImage, duration);
		}

		if (cacheCleared) {
			// При первом заходе или очищенном кеше показываем все изображения прелоадера
			animateBar();
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
