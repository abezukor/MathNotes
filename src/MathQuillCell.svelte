<script>
    import MathQuill from "mathquill-jquery"
    import { onMount } from 'svelte';
    import "../node_modules/mathquill/build/mathquill.css"
    import {EditorBlock, MarkdownBlock, MathBlock} from './blockTypes';

    export let block;
    let boxID = "MathSpan" + block.id;

    let MQ = MathQuill.getInterface(2);
    let answerMathField;
    onMount(() => {
        
        var answerSpan = document.getElementById(boxID);
        answerMathField = MQ.MathField(answerSpan, {
            handlers: {
            edit: function() {
                block.tex = answerMathField.latex()
            }
            }
        });

        answerMathField.latex(block.tex);
    });

    /*
    $: {
        block.position;
        console.log("Block Position updated");
        if(answerMathField!=null){
            answerMathField.latex(block.tex);
        }
    }
    */

</script>
<p><span id={boxID}>x=</span></p>

<style>
    span {
        resize: none;
        width: 100%;
        height: 100%;
    }
</style>