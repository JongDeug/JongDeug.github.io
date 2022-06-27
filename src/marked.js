/**
 * npm marked 옵션 설정 
 */

const marked = require('marked');

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
        const hljs = require('highlight.js');
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
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

module.exports = marked;