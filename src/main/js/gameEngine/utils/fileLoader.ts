/**
 * Load server side file into string in javascript
 * @param path specified file path
 * @returns whole path in string format
 */
export function loadFileString(path : string) : string {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", path, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        result = xmlhttp.responseText;
    }
    return result;
}