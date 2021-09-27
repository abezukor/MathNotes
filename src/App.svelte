<script>
	import { flip } from 'svelte/animate';
	import {getClassFromObject, MathBlock, MarkdownBlock, NotesState} from './blockTypes';
	import EditorField from './EditorField.svelte';
	import MarkdownDisplay from './MarkdownDisplay.svelte';
	import {dndzone} from 'svelte-dnd-action';

	const flipDurationMs = 300;

	let state = new NotesState([],0,"Untitled");
	
	function addMarkdownCell(){
		state.blocks = [...state.blocks,
			new MarkdownBlock(state.nextID)
		];
		state.nextID++;
	}
	function addMathCell(){
		state.blocks = [...state.blocks,
			new MathBlock(state.nextID)
		];
		state.nextID++;
	}
	state.name = "Untitled";

	function loadFromJson(jsonString){
		let jsonData = JSON.parse(jsonString);
		state.name = jsonData["name"];
		state.nextID = jsonData["nextID"];
		state.blocks = jsonData["blocks"].map(function (block){
			return getClassFromObject(block);
		});
	}
	let files;
	function loadNoteFile(){
		let reader = new FileReader();
		reader.onload = function(event) {
			loadFromJson(event.target.result);
		}
		reader.readAsText(files[0])
	}
	
	let mdCombined = '';

	let items;
	$: {
		items = state.blocks;
		let allBlock = state.blocks.every(function (block){
			return typeof block.getMarkdown === 'function';
		});
		if(allBlock){
			mdCombined = '';
			for(const block of state.blocks){
				mdCombined += block.getMarkdown() + "\n";
			}
		}
	}

	function destroyBlock(id){
		let index = state.blocks.findIndex(block => block.id == id);
		state.blocks.splice(index,1);
		state.blocks = state.blocks;
	}

	function handleDndConsider(e) {
		state.blocks = e.detail.items;
	}
	function handleDndFinalize(e) {
		state.blocks = e.detail.items;
		state.blocks = state.blocks.map(function (block){
			return getClassFromObject(block);
		});
		console.log(state.blocks);
	}
</script>
<div class = "rows fillSpace">
	<div class="columns">
		<input bind:value={state.name}>
		<button on:click={addMarkdownCell}>
			Add Markdown Cell
		</button>
		<button on:click={addMathCell}>
			Add Math Cell
		</button>
		<a class ="linkBtn" href={'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(state))}
			download={state.name + ".json"}>
			Save Note File
		</a>
		<input type='file' bind:files on:change={loadNoteFile}/>
	</div>
	
	<div class="columns fillSpace">
		<div id="BlocksList" class="displayColumn">
			<h1>Editable Blocks: </h1>
			<section use:dndzone={{items, flipDurationMs}} on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
				{#each items as block(block.id) }
					<div animate:flip="{{duration: flipDurationMs}}">
						<EditorField bind:block={block} destroy={destroyBlock} />
					</div>
				{/each}
			</section>
		</div>
		<div id="PreviewList" class="displayColumn">
			<a class ="linkBtn" href={'data:text/plain;charset=utf-8,' + encodeURIComponent(mdCombined)}
			download={name + ".md"}>
				Save Markdown File
			</a>
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
		border-right: 1px solid;
	}
	#PreviewList {
		border-left: 1px solid;
		overflow-y: scroll;
		width: 50%;
	}
	.columns {
		display: flex;
		flex-direction: row;
	}
	.displayColumn {
		overflow: auto;
	}
	.fillSpace {
		width: 100%;
		height: 100%;
	}

	.rows{
		display: flex;
		flex-direction: column;
		height: 95%;
	}
	a.linkBtn {
		-webkit-appearance: button;
		-moz-appearance: button;
		appearance: button;
	}
</style>
