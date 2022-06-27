/**
 * 나열된 게시글들을 pagination으로 재정렬
 */

const posts = document.querySelectorAll('.row-content');

const itemsPerPage = 4;
const totalPages = Math.ceil(posts.length / itemsPerPage);
let currentPage = 1;

function paintItems(_currentPage) {
    const space = document.querySelector('.main .container .posts');

    // Caution: _currentPage와 currentPage는 다른 변수.
    if (_currentPage < 1) currentPage = 1;
    if (_currentPage > totalPages) currentPage = totalPages;

    space.innerHTML = '';

    for (let i = (currentPage - 1) * itemsPerPage; i < currentPage * itemsPerPage && i < posts.length; i++) {
        space.innerHTML += `<div class="row row-content" onclick="location.href='${posts[i].childNodes[1].childNodes[0].attributes[0].nodeValue}'">
        <div class="col-12 overflow-hidden">
        ${posts[i].innerHTML}
        </div></div>`;
    }
}

function paintPageNum(currentPage) {
    const ul = document.querySelector('.pagination');
    ul.innerHTML = '';
    ul.innerHTML += `<li class="page-item">
                        <a class="page-link" onclick="javascript:goToPre()" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>`;

    for (let i = 1; i <= totalPages; i++) {
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