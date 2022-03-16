const navButton = document.querySelector('.m-nav-toggle');
const nav = document.querySelector('.nav-links');
const thumbnails = document.querySelectorAll('.prod-thumbnail');
const counterButton = document
	.querySelector('.btns')
	.getElementsByTagName('img');
const amount = document.querySelector('.amount');
const mainThumbnail = document.querySelector('.main-thumb');

let counter = 0;
amount.textContent = counter;

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

/* thumbnail select */
thumbnails.forEach(thumb => {
	thumb.addEventListener('click', e => {
		e.preventDefault();
		const src = thumb.getAttribute('src');
		const sourceToSet = src.substring(0, 23) + '.jpg';

		if (thumb.classList.contains('active')) {
			return;
		} else {
			thumbnails.forEach(t => {
				t.classList.remove('active');
			});
			thumb.classList.add('active');
			mainThumbnail.setAttribute('src', sourceToSet);
		}
	});
});

/* change counter */
for (const btn of counterButton) {
	btn.addEventListener('click', e => {
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
