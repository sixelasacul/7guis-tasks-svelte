<script lang="ts">
	let celsius = 0;
	let fahrenheit = 0;

	function updateFahrenheit() {
		fahrenheit = celsius * (5 / 9) + 32;
	}

	function updateCelsius() {
		celsius = (fahrenheit - 32) * (5 / 9);
	}
</script>

<label>
	Celsius
	<!-- bind:value coerces the value to the proper type -->
	<!-- on:input is called after the value has been updated -->
	<input bind:value={celsius} type="number" on:input={updateFahrenheit} />
</label>
<span>=</span>
<label>
	<input bind:value={fahrenheit} type="number" on:input={updateCelsius} />
	Fahrenheit
</label>
