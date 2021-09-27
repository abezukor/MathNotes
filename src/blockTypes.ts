export enum BlockTypes{
    Markdown,
    Math
}

export abstract class EditorBlock{
    public readonly id: number;
    public readonly type: BlockTypes; //useful because DND removes types

    constructor(id: number, type: BlockTypes){
        this.id = id;
        this.type = type
    }

    abstract getMarkdown(): string;
}
export class MathBlock extends EditorBlock{
    public tex: string;
    constructor(id: number, initialValue: string = ""){
        super(id, BlockTypes.Math);
        this.tex = initialValue;
    }

    getMarkdown(){
        return "$$" + this.tex + "$$";
    }
}
export class MarkdownBlock extends EditorBlock{
    public markdown: string;
    constructor(id: number, initialValue: string = ""){
        super(id, BlockTypes.Markdown);
        this.markdown = initialValue;
    }

    getMarkdown(){
        return this.markdown;
    }
}

export class NotesState{
    public blocks: EditorBlock[];
    public nextID: number;
    public name: string;
    constructor(blocks:  EditorBlock[], nextID: number, name: string){
        this.blocks = blocks;
        this.nextID = nextID;
        this.name = name;
    }
}

export function getClassFromObject(obj: any): EditorBlock{
    if(obj instanceof EditorBlock){
        return obj;
    }
    switch(obj.type){
        case BlockTypes.Markdown:
            return new MarkdownBlock(obj.id, obj.markdown);
            break;
        case BlockTypes.Math:
            return new MathBlock(obj.id, obj.tex);
            break;
        default:
            break;
    }
    return null;
}