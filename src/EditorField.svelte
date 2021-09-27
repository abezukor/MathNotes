<script lang="ts">

    import {EditorBlock, MarkdownBlock, MathBlock} from './blockTypes';
    import MathQuillCell from './MathQuillCell.svelte';
	import TextInput from './TextInput.svelte';

    export let block: EditorBlock;

    export let destroy: (id: number) => void;

</script>
{#if block instanceof EditorBlock}
    <div>
        {#if block instanceof MarkdownBlock}
            <TextInput bind:block={block} />
        {:else if block instanceof MathBlock}
            <MathQuillCell bind:block={block}/>
        {:else}
            <p>Error Block Type Not found</p>
        {/if}
        <button on:click={destroy(block.id)}>X</button>
    </div>
{:else}
    <p>Moving Block</p>
{/if}
<style>
    div {
        margin-bottom: 2px;
        padding: 2px;
        border: 2px dashed gray;
        position: relative;
        height: min-content;
    }
    button {
        position: absolute;
        top: 0;
        right: 0;
        margin: 2px;
        padding: 0px;
    }
</style>
