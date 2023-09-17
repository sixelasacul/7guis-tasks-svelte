<script lang="ts">
	import { filterCircles, getId, type Circle } from './utils';

	const DEFAULT_CIRCLE_SIZE = 10;

	let circles: Circle[] = [];
	let selected = -1;
	let historyPointer = -1;
	let circleSize = DEFAULT_CIRCLE_SIZE;

	$: historyPointer = circles.length - 1;
	$: circlesInHistory = circles.slice(0, historyPointer + 1);
	$: displayedCircles = filterCircles(circlesInHistory, historyPointer);
	$: selectedCircle = circles[selected] ?? {};

	function addCircle(event: MouseEvent) {
		// No need for `drawer.getBoundingClientRect` if `drawer` doesn't have `position: relative`
		// Circles will be absolutely positioned on the page coordinates
		circles = circlesInHistory.concat({
			x: event.clientX,
			y: event.clientY,
			radius: DEFAULT_CIRCLE_SIZE
		});
	}

	function updateCircle() {
		circles = circles.concat({ ...displayedCircles[selected], radius: circleSize });
		selected = -1;
	}
</script>

<button on:click={() => (historyPointer = Math.max(-1, historyPointer - 1))}>Undo</button>
<button on:click={() => (historyPointer = Math.min(historyPointer + 1, circles.length - 1))}
	>Redo</button
>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="draw" on:click={addCircle} role="button" tabindex="0">
	{#each displayedCircles as circle, i (getId(circle))}
		{@const { x, y, radius } = circle}
		<!-- `- 1` is to offset for the border -->
		<div
			class="circle"
			on:click|stopPropagation={() => {
				selected = i;
				circleSize = radius;
			}}
			role="button"
			tabindex={i + 1}
			style:top="{y - radius - 1}px"
			style:left="{x - radius - 1}px"
			style:width="{radius * 2}px"
			style:border-radius="{radius * 2}px"
		/>
	{/each}
</div>

<dialog open={selected > -1}>
	<p>Adjust diameter of circle at ({selectedCircle.x}, {selectedCircle.y})</p>
	<input type="range" bind:value={circleSize} min={1} max={50} />
	<form method="dialog">
		<button on:click={updateCircle}>Save</button>
	</form>
</dialog>

<style>
	#draw {
		border: 1px solid black;
		height: 80vh;
		width: 80vw;
	}
	.circle {
		position: absolute;
		border: 1px solid black;
		aspect-ratio: 1/1;
	}
	.circle:hover,
	.circle:focus {
		background-color: grey;
	}
</style>
