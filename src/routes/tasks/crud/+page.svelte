<script lang="ts">
	let filter: string = '';
	let name: string = '';
	let surname: string = '';
	let selected: number = -1;
	let users: { name: string; surname: string }[] = [];

	$: filteredUsers = users.filter(({ name, surname }) =>
		surname.toLocaleLowerCase().startsWith(filter)
	);

	function create() {
		users = [...users, { name, surname }];
	}
	function update() {
		users[selected] = { name, surname };
	}
	function remove() {
		delete users[selected];
		users = users;
	}
</script>

<label>
	Filter prefix:
	<input type="text" bind:value={filter} />
</label>
<select bind:value={selected} size={5}>
	{#each filteredUsers as user, i (user)}
		<option value={i}>{user.surname}, {user.name}</option>
	{/each}
</select>
<label>
	Name:
	<input type="text" bind:value={name} />
</label>
<label>
	Surname:
	<input type="text" bind:value={surname} />
</label>
<button on:click={create}>Create</button>
<button on:click={update}>Update</button>
<button on:click={remove}>Delete</button>
