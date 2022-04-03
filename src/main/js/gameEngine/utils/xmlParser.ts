import { loadFileString } from "./fileLoader";

export class XMLParser {

    constructor(path : string) {
        let txt = loadFileString(path);       

        // Normal browser
        if (window.DOMParser) {
            let parser = new DOMParser();
            this.xmlDoc = parser.parseFromString(txt, "text/xml");
        }
    }

    public tagContents(tag : string) : string {
        return this.xmlDoc.getElementsByTagName(tag)[0].childNodes[0].nodeValue;
    }

    public tagArgument(tag : string, arg : string) : string {
        return this.xmlDoc.getElementsByTagName(tag)[0].getAttribute(arg);
    }

    private xmlDoc : XMLDocument;
}