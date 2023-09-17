<script lang="ts">
	const FLIGHT_TYPES = ['one-way flight', 'return flight'] as const;

	let flightType: (typeof FLIGHT_TYPES)[number] = 'one-way flight';
	let startDate: string;
	let endDate: string;

	$: endDate = flightType === 'one-way flight' ? '' : endDate;

	function book() {
		const endDateMessage = flightType === 'return flight' ? `, back on ${endDate}` : '';
		alert(`You have booked a ${flightType} on ${startDate}${endDateMessage}.`);
	}
</script>

<select bind:value={flightType}>
	{#each FLIGHT_TYPES as flightType}
		<option>{flightType}</option>
	{/each}
</select>
<input type="date" bind:value={startDate} />
<input
	type="date"
	bind:value={endDate}
	disabled={flightType === 'one-way flight'}
	min={startDate}
/>
<button disabled={!startDate || (flightType === 'return flight' && !endDate)} on:click={book}
	>Book</button
>
