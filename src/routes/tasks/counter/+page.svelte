<script lang="ts">
	let count = 0;
</script>

<input bind:value={count} readonly />
<button on:click={() => count++}>Count</button>
