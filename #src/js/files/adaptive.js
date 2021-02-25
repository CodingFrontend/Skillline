$(window).resize(function () {
	adaptive_function();
});
function adaptive_header(w) {
	let headerColumn_0 = $('.info-header__column').eq(0),
		boxContacts = $('.contacts__box_header'),
		headerColumn_3 = $('.info-header__column').eq(3),
		footerColumn_2 = $('.top-footer__column').eq(2),
		footerContacts = $('.top-footer__contacts'),
		contactsPhone = $('.box-contacts__phone_header'),
		chatSocial = $('.social-contacts__chat_header'),
		skypeSocial = $('.social-contacts__skype_header'),
		contactsEmail = $('.box-contacts__email_header'),
		socialContacts = $('.box-contacts__social_header'),
		bubbleFooter = $('.contacts__bubble_footer'),
		footerMenu = $('.top-footer__column_menu');

	if (w < 1192) {
		if (!bubbleFooter.hasClass('done')) {
			bubbleFooter.addClass('done');
			bubbleFooter.appendTo(footerColumn_2);
		}
	} else {
		bubbleFooter.removeClass('done');
		bubbleFooter.prependTo(footerContacts);
	};

	if (w < 725) {
		if (!footerMenu.hasClass('done')) {
			footerMenu.addClass('done');
			footerMenu.prependTo($('.top-footer__container'));
		}
	} else {
		footerMenu.removeClass('done');
		footerMenu.insertAfter($('.top-footer__column').eq(2));
	}

	if (w < 700.98) {
		if ((contactsPhone, chatSocial, skypeSocial, contactsEmail).filter('done').length == 0) {
			(contactsPhone, chatSocial, skypeSocial, contactsEmail).addClass('done');
			headerColumn_0.append(contactsPhone, chatSocial);
			headerColumn_3.append(contactsEmail, skypeSocial);
		}
	} else {
		(contactsPhone, chatSocial, skypeSocial, contactsEmail).removeClass('done');
		contactsPhone.prependTo(boxContacts);
		contactsEmail.appendTo(boxContacts);
		socialContacts.append(chatSocial, skypeSocial);
	};

}


function adaptive_function() {
	let w = $(window).outerWidth();
	adaptive_header(w);
}
adaptive_function();

