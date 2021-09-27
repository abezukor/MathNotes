<script>
	import { flip } from 'svelte/animate';
	import {EditorBlock, MathBlock, MarkdownBlock} from './blockTypes';
	import EditorField from './EditorField.svelte';
	import MarkdownDisplay from './MarkdownDisplay.svelte';
	import {dndzone} from 'svelte-dnd-action';

	const flipDurationMs = 300;

	let items=[];
	
	let nextID = 0;
	function addMarkdownCell(){
		console.log(items);
		items = [...items,
			new MarkdownBlock(nextID, items.length)
		];
		nextID++;
	}
	function addMathCell(){
		items = [...items,
			new MathBlock(nextID, items.length)
		];
		nextID++;
	}
	
	let mdCombined = '';

	$: {
		mdCombined = '';
		let allBlock = items.every(function (block){
			return typeof block.getMarkdown === 'function';
		});
		if(allBlock){
			for(const block of items){
				mdCombined += block.getMarkdown() + "\n";
			}
		}
		console.log(mdCombined);
	}

	function destroyBlock(id){
		let index = items.findIndex(block => block.id == id);
		items.splice(index,1);
		items = items
	}

	function handleSort(e) {
		items = e.detail.items;
		let i=0;
		for(const block of items){
			block.position = i++;
		}
	}
</script>
<div class = "rows fillSpace">
	<div class="columns">
		<button on:click={addMarkdownCell}>
			Add Markdown Cell
		</button>
		<button on:click={addMathCell}>
			Add Math Cell
		</button>
	</div>
	
	<div class="columns fillSpace">
		<div id="BlocksList" class="displayColumn">
			<h1>Editable Blocks: </h1>
			<section use:dndzone={{items}} on:consider={handleSort} on:finalize={handleSort}>
				{#each items as block(block.id) }
					<div animate:flip="{{duration: flipDurationMs}}">
						<EditorField bind:block={block} destroy={destroyBlock} />
					</div>
				{/each}
			</section>
		</div>
		<div id="PreviewList" class="displayColumn">
			<h1>Rendered Output</h1>
			<MarkdownDisplay bind:markdown={mdCombined} />
		</div>
	</div>
</div>

<style>
	#BlocksList {
		resize: horizontal;
		width: 50%;
		min-width: 20%;
		max-width: 80%;
		overflow: auto;
		border-right: 1px solid;
	}
	#PreviewList {
		border-left: 1px solid;
	}
	.columns {
		display: flex;
		flex-direction: row;
	}
	.fillSpace {
		width: 100%;
		height: 100%;
	}

	.rows{
		display: flex;
		flex-direction: column;
		height: 96%;
	}
</style>
