import Car from './Car.js';

const $carNamesButton = document.getElementById('car-names-submit');
const $carNamesInput = document.getElementById('car-names-input');
const $racingCountButton = document.getElementById('racing-count-submit');
const $racingCountInput = document.getElementById('racing-count-input');
const $nameForm = document.querySelector('.name-input-form');
const cars = [];

$carNamesButton.addEventListener('click', () => {
	const forDel = document.querySelector('.carNamesList');
	if (forDel) {
		forDel.remove();
	}

	cars.length = 0;
	let carNameStr = $carNamesInput.value;
	if (!validateCars(carNameStr))
		return (alert('올바른 자동차 이름을 입력해주세요.'));

	carNameStr.split(',').forEach(el => {
		cars.push(new Car(el));
	});

	const carNames = document.createElement('div');
	carNames.className = 'carNamesList';
	carNames.textContent = `준비된 차량은 ${carNameStr} 입니다.`;
	$nameForm.after(carNames);

	$carNamesInput.value = '';
	$racingCountInput.focus();
})

$racingCountButton.addEventListener('click', () => {
	if (cars.length === 0)
		return (alert('자동차 이름을 먼저 입력해주세요.'));
	if (!validateCount($racingCountInput.value))
		return (alert('올바른 횟수를 입력해주세요.'));

	const $forDel = document.querySelectorAll('.a11y-hidden');
	$forDel.forEach(el => {
		el.classList.remove('a11y-hidden');
		el.className = 'a11y';
	})

	const $result = document.getElementById('result');
	$result.innerHTML = '';
	cars.forEach((car) => {
		car.resetDistance();
	})

	for (let i = 0; i < parseInt($racingCountInput.value); i++) {
		cars.forEach((car) => {
			if (goOrStop())
				car.goForward();
		})
		render();
	}
	winner();
	$racingCountInput.value = '';
})

function goOrStop() {
	if (Math.random() * 10 >= 4)
		return true;
	return false;
}

function render() {
	const $result = document.getElementById('result');
	const $resultWrap = document.createElement('div');
	const newLine = document.createElement('br');

	$resultWrap.style.display = 'flex';
	$resultWrap.style.flexDirection = 'column';
	cars.forEach((car) => {
		const $perCar = document.createElement('span');
		let printPerCar = `${car.getName()}: `;
		for (let i = 0; i < car.getDistance(); i++)
			printPerCar += '-';
		$perCar.textContent = printPerCar;
		$resultWrap.appendChild($perCar);
	})
	$result.appendChild($resultWrap);
	$result.appendChild(newLine);
}

function winner() {
	const $winner = document.getElementById('racing-winners');
	const resetButton = document.createElement('button');
	let winners = "";
	let best = 0;
	cars.forEach((car) => {
		if (car.getDistance() > best)
			best = car.getDistance();
	})
	cars.forEach((car) => {
		if (car.getDistance() === best) {
			winners += car.getName() + ', ';		
		}
	})
	$winner.textContent = winners.slice(0, winners.length - 2) + ' -> ';

	resetButton.type = 'button';
	resetButton.textContent = 'RESET';
	$winner.appendChild(resetButton);
	resetButton.addEventListener('click', clearAll);
}

function clearAll() {
	const $carNames = document.querySelector('.carNamesList');
	const $headingFour = document.querySelectorAll('.a11y');
	const $winner = document.getElementById('racing-winners');
	const $result = document.getElementById('result');

	$carNames.remove();
	$headingFour.forEach((el) => {
		el.className = 'a11y-hidden';
	})
	$winner.textContent = '(우승자)';
	$result.removeChild();
	cars.length = 0;
}

function validateCount(count) {
	if (count < 1 || count != parseInt(count))
		return false;
	return true;
}

function validateCars(cars) {
	cars.split(',').forEach((el) => {
		if (el.length > 5)
			return false;
	})
	return true;
}