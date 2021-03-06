/**
 * npm marked 옵션 설정 
 */

import { marked } from "marked";
import hljs from "highlight.js";

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        // console.log(language);
        return hljs.highlight(code, {language}).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});

export default marked;