class Car {
	#name;
	#distance;

	constructor(name) {
		this.#name = name;
		this.#distance = 0;
	}

	getName() {
		return this.#name;
	}

	getDistance() {
		return this.#distance;
	}
	
	goForward() {
		this.#distance += 1;
	}
}

export default Car;