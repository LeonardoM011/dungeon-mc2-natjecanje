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

    public onCompile() {
        alert(this.editor.getValue());
    }

    private editor : CodeMirror.Editor;
};