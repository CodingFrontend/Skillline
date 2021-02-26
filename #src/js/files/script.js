// let all browsers support referring icons to external svg-file
svg4everybody({});
// 

// burger
if (isMobile.any()) {
	(function () {
		let iconMenu = document.querySelector('.icon-menu');
		let iconMenuClose = document.querySelector('.icon-menu_close');


		let menuList = document.querySelector('.menu__list');
		let menuLinks = menuList.querySelectorAll('.menu__link');
		let dropdownContents = document.querySelectorAll('.dropdown__content');

		if (iconMenu != null) {
			let delay = 500;
			let menuBody = document.querySelector(".menu__body");
			iconMenu.addEventListener("click", function () {
				if (unlock) {
					body_lock(delay);
					iconMenu.classList.toggle("active");
					menuBody.classList.toggle("active");
					iconMenuClose.classList.toggle("active");
				}
			});
		}

	})();
}

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
}
