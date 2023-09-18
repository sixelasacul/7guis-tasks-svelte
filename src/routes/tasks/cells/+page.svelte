<script lang="ts">
	import Cell from './Cell.svelte';
  
  const columns = Array.from({ length: 26 }).map((_, i) => String.fromCharCode(i + 65));
  const rows = Array.from({ length: 100 }).map((_, i) => i);
  // const prefill: readonly (readonly [string, string])[] = columns.flatMap((c, i) => rows.map((r) => `${c}${r}`).map((k, j) => [k, (i+100*j).toString()]))

	let formulas = new Map<string, string>();
	let results = new Map<string, string>();
	// let formulas: Record<string, string> = {};
	// let results: Record<string, string> = {};

	function updateCell(key: string, value: string) {
		formulas.set(key, value);
		formulas = new Map(formulas);
		// formulas[key] = value;
	}

	$: {
    console.time('update')
		for (const [key, formula] of formulas) {
		// for (const [key, formula] of Object.entries(formulas)) {
			if (formula.startsWith('=')) {
				const parsedFormula = formula.substring(1).replace(/([A-Z]\d{1,2})/g, (match) => {
					return results.get(match) ?? '';
					// return results[match] ?? '';
				});
				// `eval` ain't safe but eh
				results.set(key, eval(parsedFormula.trim()));
				// results[key] = eval(parsedFormula.trim());
			} else {
				results.set(key, formula);
				// results[key] = formula;
			}
		}
    results = new Map(results)
    console.timeEnd('update')
	}
</script>

<div id="grid">
	<div class="cells head"><p>\</p></div>
	{#each columns as column}
		<div class="cells head"><p>{column}</p></div>
	{/each}
	{#each rows as row}
		<div class="cells head"><p>{row}</p></div>
		{#each columns as column}
			{@const key = `${column}${row}`}
			<div class="cells">
        <!-- result={results[key]} -->
				<Cell
          result={results.get(key)}
					on:update-cell-value={(event) => updateCell(key, event.detail)}
				/>
			</div>
		{/each}
	{/each}
</div>

<style>
	#grid {
		display: grid;
		grid-template-columns: repeat(27, 5vw);
	}
	.cells {
		padding: 4px;
	}
	.head {
		text-align: center;
	}
	p {
		margin: 0;
	}
</style>
