export interface Circle {
	x: number;
	y: number;
	radius: number;
}

export function getId({ x, y }: Circle) {
	return `${x},${y}`;
}

export function filterCircles(circles: Circle[], pointerHistory: number) {
	if (circles.length === 0) {
		return [];
	}

	const circleIds = new Set();
	const displayedCircles: Circle[] = [];

	for (let i = pointerHistory; i >= 0; i--) {
		const circle = circles[i];
		const id = getId(circle);
		if (!circleIds.has(id)) {
			circleIds.add(id);
			displayedCircles.unshift(circle);
		}
	}

	return displayedCircles;
}
