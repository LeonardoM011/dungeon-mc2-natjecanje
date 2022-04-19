import * as CodeMirror from 'codemirror';

export class CodeBox {
    constructor() {
        const myTextarea = <HTMLElement> document.getElementById("console");
        this.editor = CodeMirror(myTextarea, {
            lineNumbers: true,
            mode: 'javascript',
            theme: 'monokai'
        });

        // required for css
        this.editor.setSize("100%", "100%");

        document.getElementById("compileButton").addEventListener("click", () => { this.onCompile(); });
    }

    public getContents() : string {
        return this.editor.getValue();
    }

    public addCompileCallback(fn : Function) {
        this.callback = fn;
    }

    public markLine(line : number) {
        this.editor.addLineClass(line, "wrap", "mark");
    }

    public unmarkLine(line : number) {
        this.editor.removeLineClass(line, "wrap", "mark");
    }

    /** TODO: REMOVE THIS FUNCTION */
    get CodeMirror() {
        return this.editor;
    }

    private onCompile() {
        this.callback();
    }

    private callback : Function;
    private editor : CodeMirror.Editor;
};