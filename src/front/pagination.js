/**
 * 나열된 게시글들을 pagination으로 재정렬
 */

const posts = document.querySelectorAll('.row-content');

const itemsPerPage = 4;
const totalPages = Math.ceil(posts.length / itemsPerPage);
let currentPage;

// 새로고침해도 currentPage가 고정되게끔 설정
if (sessionStorage.getItem('currentPage') === null) {
    sessionStorage.setItem('currentPage', "1");
    currentPage = 1;
} else {
    currentPage = parseInt(sessionStorage.getItem('currentPage'));
}


function paintItems(_currentPage) {
    const space = document.querySelector('.main .container .posts');

    // Caution: _currentPage와 currentPage는 다른 변수.
    if (_currentPage < 1) currentPage = 1;
    if (_currentPage > totalPages) currentPage = totalPages;

    space.innerHTML = '';

    for (let i = (currentPage - 1) * itemsPerPage; i < currentPage * itemsPerPage && i < posts.length; i++) {
        space.innerHTML += `<div class="row row-content homepage-posts" onclick="location.href='${posts[i].childNodes[1].childNodes[0].attributes[0].nodeValue}'">
        <div class="col-12 overflow-hidden">
        ${posts[i].innerHTML}
        </div></div>`;
    }

    // 변경된 currentPage 저장
    sessionStorage.setItem('currentPage', currentPage.toString());
}

function paintPageNum(_currentPage) {
    const ul = document.querySelector('.pagination');
    let pageNum = _currentPage;
    ul.innerHTML = '';
    ul.innerHTML += `<li class="page-item">
                        <a class="page-link" onclick="javascript:goToPre()" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>`;

    if (pageNum % 3 === 0) pageNum -= 2;
    else if (pageNum % 3 === 1) pageNum -= 0;
    else if (pageNum % 3 === 2) pageNum -= 1;

    for (let i = pageNum; i <= totalPages && i <= (pageNum + 2); i++) {
        if (currentPage === i) {
            ul.innerHTML += `<li class="page-item active"><a class="page-link" onclick="javascript:goToPage(${i})">${i}</a></li>`;
        } else {
            ul.innerHTML += `<li class="page-item"><a class="page-link" onclick="javascript:goToPage(${i})">${i}</a></li>`;
        }
    }

    ul.innerHTML += `<li class="page-item">
                        <a class="page-link" onclick="javascript:goToNext()" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>`;
}

function goToNext() {
    paintItems(++currentPage);
    paintPageNum(currentPage);
}

function goToPre() {
    paintItems(--currentPage);
    paintPageNum(currentPage);
}

function goToPage(pageNum) {
    currentPage = pageNum;
    paintItems(pageNum);
    paintPageNum(pageNum);
}

//set default
paintItems(currentPage);
paintPageNum(currentPage);