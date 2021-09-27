<script lang="ts">
    import MarkdownIt from 'markdown-it';
    import katex from 'katex';
    import TexMath from 'markdown-it-texmath';
    
    let md = new MarkdownIt().use(TexMath, { engine: katex,
        delimiters: 'dollars',
        katexOptions: { 
            macros: {"\\RR": "\\mathbb{R}"}, 
            output:"mathml"
        } } );
    console.log(md);
    
    export let markdown: string = '';

    let htmlToRender: string = "";

    $: {
        htmlToRender = md.render(markdown);
    }
</script>

<div>
    {@html htmlToRender}
</div>