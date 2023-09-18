<script lang="ts">
	import { createEventDispatcher, tick } from 'svelte';

	export let result = '';
	let editing = false;
	let input: HTMLInputElement;

	const dispatch = createEventDispatcher<{
		'update-cell-value': string;
	}>();

	function unFocus() {
		input.blur();
		editing = false;
	}

	async function focus() {
		editing = true;
		await tick();
		input.focus();
	}

	function updateCellFormula() {
		if (input.value) {
			dispatch('update-cell-value', input.value);
		}
	}
</script>

{#if editing}
	<input
		bind:this={input}
		type="text"
		on:blur={() => {
			updateCellFormula();
			unFocus();
		}}
		on:keydown={(event) => {
			if (event.key === 'Enter') {
				updateCellFormula();
				unFocus();
				return;
			}
			if (event.key === 'Escape') {
				unFocus();
				return;
			}
		}}
	/>
{:else}
	<input
		readonly
		bind:value={result}
		on:dblclick={focus}
		on:keydown={(event) => {
			if (event.key === 'Enter') {
				focus();
			}
		}}
	/>
{/if}

<style>
	input {
		width: 100%;
		height: 100%;
	}
</style>
