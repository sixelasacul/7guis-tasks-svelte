<script lang="ts">
	import { onMount } from 'svelte';

	const DEFAULT_DURATION = 10; // 10s
	const DEFAULT_ELAPSED = 0; // 0s
	const INTERVAL_STEP = 100; // 100ms

	let duration: number = DEFAULT_DURATION;
	let elapsed: number = DEFAULT_ELAPSED;

	onMount(() => {
		const interval = setInterval(() => {
			// Avoids issues with weird number (e.g. 4.699999998)
			if (Math.ceil(elapsed * 10) / 10 < duration) elapsed += INTERVAL_STEP / 1000;
		}, INTERVAL_STEP);

		return () => clearInterval(interval);
	});

	function reset() {
		duration = DEFAULT_DURATION;
		elapsed = DEFAULT_ELAPSED;
	}
</script>

<label>
	Elapsed time:
	<progress value={elapsed} max={duration} />
</label>
<p>{elapsed.toFixed(1)}s</p>
<label>
	Duration:
	<input type="range" bind:value={duration} min={0} max={20} />
</label>
<button on:click={reset}>Reset</button>
