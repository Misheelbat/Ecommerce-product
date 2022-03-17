const navButton = document.querySelector('.m-nav-toggle');
const nav = document.querySelector('.nav-links');
const thumbnails = document.querySelectorAll('.prod-thumbnail');
const counterButton = document
	.querySelector('.btns')
	.getElementsByTagName('img');
const amount = document.querySelector('.amount');
const mainThumbnail = document.querySelector('.main-thumb');
const mainModalThumb = document.querySelector('.modal-mainThumb');
const dialog = document.getElementById('open');
const closeModalButton = document.querySelector('.close-button');
const productInCart = document.querySelector('.cart');
const buyButton = document.querySelector('.btn-add');

/* modal open and close  */
mainThumbnail.addEventListener('click', () => {
	dialog.showModal();
});
closeModalButton.addEventListener('click', () => {
	dialog.close();
});

/* navigation dropdown */
navButton.addEventListener('click', () => {
	const isOpen = navButton.getAttribute('aria-expanded');
	console.log(thumbnails);
	if (isOpen === 'false') {
		navButton.setAttribute('aria-expanded', true);
		nav.setAttribute('data-open', true);
	} else {
		navButton.setAttribute('aria-expanded', false);
		nav.setAttribute('data-open', false);
	}
});

/* function that changes the src attribute of img */
const changeThumbnail = (thumbnail) => {
	const src = thumbnail.getAttribute('src');
	const sourceToSet = src.substring(0, 23) + '.jpg';
	mainThumbnail.setAttribute('src', sourceToSet);
	mainModalThumb.setAttribute('src', sourceToSet);
};

/* thumbnail select */
thumbnails.forEach((thumb) => {
	thumb.addEventListener('click', (e) => {
		e.preventDefault();
		if (thumb.classList.contains('active')) {
			return;
		} else {
			thumbnails.forEach((t) => {
				t.classList.remove('active');
			});
			thumb.classList.add('active');
			changeThumbnail(thumb);
		}
	});
});

/* change counter */
let counter = 0;
amount.textContent = counter;
for (const btn of counterButton) {
	btn.addEventListener('click', (e) => {
		if (btn.classList.contains('minus')) {
			e.preventDefault();
			if (counter > 0) {
				counter--;
				amount.textContent = counter;
			}
		}
		if (btn.classList.contains('plus')) {
			e.preventDefault();
			counter++;
			amount.textContent = counter;
		}
	});
}

/* add to cart function */
buyButton.addEventListener('click', () => {
	productInCart.setAttribute('data-amount', counter);
	const productAmount = productInCart.getAttribute('data-amount');
	if (productAmount === '0') {
		console.log('iszero');
		return;
	} else {
		productInCart.classList.add('cart-amount');
		counter = 0;
		amount.textContent = counter;
	}
});
