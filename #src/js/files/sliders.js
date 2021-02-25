//BildSlider
let sliders = document.querySelectorAll('.swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('ul');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) { }


if (document.querySelector('.mainslider__body')) {
	let mainsliderBody = new Swiper('.mainslider__body', {
		/*
		effect: 'fade',
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		*/
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: true,
		speed: 800,
		//touchRatio: 0,
		//simulateTouch: false,
		// loop: true,
		//preloadImages: false,
		//lazy: true,
		// Dotts
		pagination: {
			el: '.mainslider__dots',
			clickable: true,
		},
		// Arrows
		navigation: {
			nextEl: '.controls-mainslider__next',
			prevEl: '.controls-mainslider__prev',
		},
		/*
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 0,
				autoHeight: true,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1268: {
				slidesPerView: 4,
				spaceBetween: 30,
			},
		},
		*/
		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
		// And if we need scrollbar
		//scrollbar: {
		//	el: '.swiper-scrollbar',
		//},
	});
	let mainsliderImages = document.querySelectorAll('.mainslider__image');
	let mainsliderDotts = document.querySelectorAll('.mainslider__dots .swiper-pagination-bullet');

	for (let i = 0; i < mainsliderImages.length; i++) {
		const mainsliderImage = mainsliderImages[i].querySelector('img').getAttribute('src');
		mainsliderDotts[i].style.backgroundImage = "url('" + mainsliderImage + "')";
	}
};

if (document.querySelector('.bottom-slider')) {
	let headerSlider = new Swiper('.bottom-slider__body', {
		/*
		effect: 'fade',
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		*/
		observer: true,
		observeParents: true,
		// slidesPerView: 4,
		// spaceBetween: 300,
		// autoHeight: true,
		speed: 800,
		//touchRatio: 0,
		//simulateTouch: false,
		loop: true,
		//preloadImages: false,
		//lazy: true,
		// Dotts
		pagination: {
			el: '.mainslider__pagination',
			type: 'bullets',
		},
		// Arrows
		navigation: {
			nextEl: '.bottom-slider__arrow_next',
			prevEl: '.bottom-slider__arrow_prev',
		},
		// breakpoints: {
		// 	320: {
		// 		slidesPerView: 1,
		// 		spaceBetween: 0,
		// 		autoHeight: true,
		// 	},
		// 	768: {
		// 		slidesPerView: 2,
		// 	},
		// 	900: {
		// 		slidesPerView: 3,
		// 	},
		// 	1100: {
		// 		slidesPerView: 4,
		// 	},
		// 	1180: {
		// 		slidesPerView: 5,
		// 	},
		// },
	});
};





