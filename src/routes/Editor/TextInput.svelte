<script lang="ts">

    import type { MarkdownBlock } from "./blockTypes";

    export let block: MarkdownBlock;
</script>

<textarea bind:value={block.markdown}></textarea>

<style>
    textarea {
        resize: vertical;
        width: 100%
    }
</style>