/**
 * markdown link들 target="_blank" 추가
 */

const links = document.querySelectorAll('.row-content a');

links.forEach(link => {
    if(link.hostname != window.location.hostname){
        link.target = '_blank';
    }
});