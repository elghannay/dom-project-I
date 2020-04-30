function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}

const coin = document.querySelector('#coin');
const avatar = document.querySelector('#player');

document.addEventListener('keydown', function (e) {
	if (!avatar.style.top) return avatar.style.top = `100px`;
	if (!avatar.style.left) return avatar.style.left = `10px`;
	if (e.key === 'ArrowDown') {
		avatar.style.top = `${stripPixels(avatar.style.top) + 50}px`;
	}
	if (e.key === 'ArrowUp') {
		avatar.style.top = `${stripPixels(avatar.style.top) - 50}px`;
	}
	if (e.key === 'ArrowLeft') {
		avatar.style.left = `${stripPixels(avatar.style.left) - 50}px`;
		avatar.style.transform = "scale(-1,1)";
	}
	if (e.key === 'ArrowRight') {
		avatar.style.left = `${stripPixels(avatar.style.left) + 50}px`;
		avatar.style.transform = "scale(+1,1)";
	}

	if (isTouching(coin, avatar)) moveCoin();
})

function stripPixels(num) {
	return parseInt(num.slice(0, -2));
}


function moveCoin() {
	const x = Math.floor(Math.random() * window.innerWidth);
	const y = Math.floor(Math.random() * window.innerHeight);
	coin.style.top = `${y}px`;
	coin.style.left = `${x}px`;
}

moveCoin()