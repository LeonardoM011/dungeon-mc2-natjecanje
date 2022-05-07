import { loadFileString } from "./fileLoader";

/** Parser for xml for easier fetching of contents */
export class XMLParser {

    /**
     * Init parser
     * @param path path to xml file
     */
    constructor(path : string) {
        let txt = loadFileString(path);       

        // Normal browser (might not owrk on IE)
        if (window.DOMParser) {
            let parser = new DOMParser();
            this.xmlDoc = parser.parseFromString(txt, "text/xml");
        }
    }

    /**
     * Get contents from given tag
     * @param tag specified XML tag
     * @returns string of all tag contents
     */
    public tagContents(tag : string, num? : number) : string {
        // If num is specified return that tag in a row
        if (typeof num !== 'undefined')
            return this.xmlDoc.getElementsByTagName(tag)[num].childNodes[0].nodeValue;

        // Else return first tag
        return this.xmlDoc.getElementsByTagName(tag)[0].childNodes[0].nodeValue;
    }

    public allTagContents(tag : string) : string[] {
        let cont = this.xmlDoc.getElementsByTagName(tag);
        let str : string[] = [];
        for (let i = 0; i < cont.length; i++) {
            str.push(cont[i].childNodes[0].nodeValue);
        }
        return str;
    }

    /**
     * Get contents from given argument inside tag
     * @param tag specified XML tag
     * @param arg specified XML argument inside tag
     * @returns argument in string format
     */
    public tagArgument(tag : string, arg : string) : string {
        return this.xmlDoc.getElementsByTagName(tag)[0].getAttribute(arg);
    }

    private xmlDoc : XMLDocument;
}