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
