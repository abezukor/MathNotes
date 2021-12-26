<script lang="ts">
	import '../app.css';
</script>

<main>
	<slot />
</main>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>