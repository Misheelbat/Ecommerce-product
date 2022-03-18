const navButton = document.querySelector('.m-nav-toggle');
const nav = document.querySelector('.nav-links');
const thumbnails = document.querySelectorAll('.prod-thumbnail');
const counterButton = document
	.querySelector('.btns')
	.getElementsByTagName('img');
const amount = document.querySelector('.amount');
const mainThumbnail = document.querySelectorAll('.main-thumb');
const dialog = document.getElementById('open');
const closeModalButton = document.querySelector('.close-button');
const productInCart = document.querySelector('.cart');
const buyButton = document.querySelector('.btn-add');
const billsToPay = document.querySelector('.bills');
const isCartEmpty = document.querySelector('[data-is-empty]');
console.log(mainThumbnail);
/* modal open and close on main image */
mainThumbnail[0].addEventListener('click', () => {
	dialog.showModal();
});
closeModalButton.addEventListener('click', () => {
	dialog.close();
});

/* navigation dropdown on mobile*/
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
	mainThumbnail.forEach((thumb) => {
		thumb.setAttribute('src', sourceToSet);
	});
};

/* select thumbnail on click */
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

/* change counter counter = number of items to buy */
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

/* add to cart function and calculate price */
buyButton.addEventListener('click', () => {
	productInCart.setAttribute('data-amount', counter);
	const productAmount = productInCart.getAttribute('data-amount');
	if (productAmount === '0') {
		console.log('iszero');
		return;
	} else {
		productInCart.classList.add('cart-amount');
		calculatePrice(billsToPay);
		isCartEmpty.setAttribute('data-is-empty', true);
		counter = 0;
		amount.textContent = counter;
	}
});

/* calculate final price in shopping cart */
const calculatePrice = (element) => {
	const calculatedBills = `$125.00 x ${counter} $<strong>${
		counter * 125
	}</strong>`;
	element.innerHTML = calculatedBills;
};

/* delete cart items on delete icon */
const deleteButton = document.querySelector('.delete');
deleteButton.addEventListener('click', () => {
	productInCart.classList.remove('cart-amount');
	counter = 0;
	amount.textContent = counter;
	isCartEmpty.setAttribute('data-is-empty', false);
});

/* show and hide cart items on click  */
productInCart.addEventListener('click', (e) => {
	e.preventDefault();
	shoppingCart = document.querySelector('.shopping-cart');
	if (shoppingCart.style.display === 'block') {
		shoppingCart.style.display = 'none';
	} else {
		shoppingCart.style.display = 'block';
	}
});

/* arrow buttons  */
const ISPLUS = false;
const prevBtns = document.querySelectorAll('.prev');
const nextBtns = document.querySelectorAll('.next');
const arrowBtns = [...prevBtns, ...nextBtns];
arrowBtns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		e.preventDefault();
		const changedSrc = changeThumbnailWithArrow(btn);
		console.log(changedSrc);
	});
});

const changeThumbnailWithArrow = (btn) => {
	const mainSrc = mainThumbnail[0].getAttribute('src');
	const arrayOfSrc = mainSrc.split('-');

	if (btn.classList.contains('prev')) {
		if (parseInt(arrayOfSrc[2]) == 1) {
			arrayOfSrc[2] = 4 + '.jpg';
			const src = arrayOfSrc.join('-');
			mainThumbnail.forEach((thumb) => {
				thumb.setAttribute('src', src);
			});
			return;
		}
		arrayOfSrc[2] = parseInt(arrayOfSrc[2]) - 1 + '.jpg';
		const src = arrayOfSrc.join('-');
		mainThumbnail.forEach((thumb) => {
			thumb.setAttribute('src', src);
		});
	}

	if (btn.classList.contains('next')) {
		if (parseInt(arrayOfSrc[2]) === 4) {
			arrayOfSrc[2] = 1 + '.jpg';
			const src = arrayOfSrc.join('-');
			mainThumbnail.forEach((thumb) => {
				thumb.setAttribute('src', src);
			});
			return;
		}

		arrayOfSrc[2] = parseInt(arrayOfSrc[2]) + 1 + '.jpg';
		const src = arrayOfSrc.join('-');

		mainThumbnail.forEach((thumb) => {
			thumb.setAttribute('src', src);
		});
	}
};
