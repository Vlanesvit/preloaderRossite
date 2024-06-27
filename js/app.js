(function () {
	'use strict';
	const dBody = document.body;

	if (dBody) {

		const preloader = dBody.querySelector('.preloader'),
			preloaderImgs = preloader.querySelectorAll('.preloader__imgs img'),
			progressBar = preloader.querySelector('.preloader__line-progress'),
			url = document.location.href,
			images = document.querySelectorAll('img:not(.preloader__imgs img)'),
			max = 100,
			xhr = new XMLHttpRequest();

			console.log(images);

		let loadingProgress = 0,
			start = 0,
			duration = 80;

		function animateBar(progress) {
			let interval = setInterval(() => {
				if (start < progress && start < max) {
					start++;

					if (start == max) {
						clearInterval(interval);
						setTimeout(function () {
							preloader.style.cssText = "opacity: 0; visibility: hidden;";
						}, 1);
					}

					let tr = -100 + start;

					progressBar.style.cssText = `transform:translateX(${tr}%)`;
				}
			}, 1);

			let now = -1;
			function changeImage() {
				// Убираем все картинки
				for (let i = 0; i < preloaderImgs.length; i++) {
					preloaderImgs[i].style.display = 'none';
				}
				// Показываем поочередно
				if ((now + 1) == preloaderImgs.length) {
					now = 0;
				} else {
					now++;
				}
				preloaderImgs[now].style.display = 'block';
			}
			// Повторяем каждые duration
			setInterval(function () {
				changeImage()
			}, duration);
		}

		function addListeners(xhr) {
			xhr.addEventListener('loadend', handleEventLoadend);
			xhr.addEventListener('progress', handleEvent);
		}
		function handleEvent(e) {
			loadingProgress = loadingProgress + (100 - loadingProgress) / (images.length + 1);
			animateBar(loadingProgress)
		}
		function handleEventLoadend(e) {
			animateBar(max)
		}
		function runXHR(url) {
			addListeners(xhr);
			xhr.open("GET", url);
			xhr.send(document);
			return xhr;
		}
		runXHR(url);
	}
})();