export abstract class EditorBlock{
    public readonly id: number;
    public position:number;

    constructor(id: number, position: number){
        this.id = id;
        this.position = position;
    }

    abstract getMarkdown(): string;
}
export class MathBlock extends EditorBlock{
    public tex: string;
    constructor(id: number, position: number, initialValue: string = ""){
        super(id, position);
        this.tex = initialValue;
    }

    getMarkdown(){
        return "$$" + this.tex + "$$";
    }
}
export class MarkdownBlock extends EditorBlock{
    public markdown: string;
    constructor(id: number, position: number, initialValue: string = ""){
        super(id, position);
        this.markdown = initialValue;
    }

    getMarkdown(){
        return this.markdown;
    }
}