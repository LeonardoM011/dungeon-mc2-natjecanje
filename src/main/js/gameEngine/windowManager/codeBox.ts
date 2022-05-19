import * as CodeMirror from 'codemirror';

export class CodeBox {
    constructor(consoleId : string) {
        const myTextarea = <HTMLElement> document.getElementById(consoleId);
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
        this.editor.addLineClass(line, "wrap", "markline");
    }

    public markErrorLine(line : number) {
        this.editor.addLineClass(line, "wrap", "markerror");
    }

    public unmarkLine(line : number) {
        this.editor.removeLineClass(line, "wrap"/*, "markline"*/);
        //this.editor.removeLineClass(line, "wrap", "markerror");
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