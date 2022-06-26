const fs = require('fs');
const config = require('./config');

function createAccordionItems(posts) {
    const subjects = fs.readdirSync(`${config.dev.outputdir}`);
    let html = ``;

    subjects.map((subject,index) => {
        html += `
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapse${index}">
                    ${subject} (${posts.filter(post => post.attributes.subject === subject).length})
                    </button>
                </h2>
                <div id="collapse${index}" class="accrodion-collapse collapse" data-bs-parent="#postList">
                    ${posts.filter(post => post.attributes.subject === subject)
                    .map(post => `<div class="accordion-body">
                                    <a href="./${config.dev.outputdir}/${post.attributes.subject}/${post.path}">${post.attributes.title}</a>
                                </div>`).join("")}
                </div>
            </div>
        `;
    });
    return html;
}

const postspage = posts => {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${config.blogDescription}">
    <title>${config.blogName}</title>

    <!-- Bootstrap  CSS-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css">

    <!-- CSS -->
    <link rel="stylesheet" href="css/styles.css">
</head>

<body>
    <nav class="navbar navbar-dark bg-black navbar-expand-sm fixed-top">
        <div class="container">
            <a href="./index.html" class="navbar-brand">JongDeug</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-end" id="navContent">
                <ul class="navbar-nav">
                    <li class="nav-item mt-1 mb-1 mt-sm-auto mb-sm-auto">
                        <a href="./index.html" class="nav-link"><i class="bi bi-house-fill"></i> Home</a>
                    </li>
                    <li class="nav-item mb-1 mb-sm-auto">
                        <a href="./posts.html" class="nav-link active"><i class="bi bi-stickies-fill"></i> Posts</a>
                    </li>
                    <li class="nav-item mb-1 mb-sm-auto">
                        <a href="./about.html" class="nav-link"><i class="bi bi-file-person-fill"></i> About Me</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- //nav -->

    <header class="jumbotron padding">
        <div class="container">
            <div class="row">
                <div class="col d-none d-lg-block">
                    <span class="fst-italic fs-1 fw-bold">Welcome to my blog</span>
                </div>
            </div>
        </div>
    </header>
    <!-- //header, jumbotron -->

    <main class="main">
        <div class="container">
            <div class="row row-header">
                <ol class="col-12 breadcrumb ps-2">
                    <li class="breadcrumb-item"><a href="./index.html">Home</a></li>
                    <li class="breadcrumb-item active">Posts</li>
                </ol>
                <div class="col">
                    <h1 class="mb-3">Posts</h1>
                    <hr>
                </div>
            </div>
            <!-- //breadcrumb -->


            <div class="row row-content">
                <div class="accordion" id="postList">
                    ${createAccordionItems(posts)}
                </div>
                
            </div>
            <!-- //postList -->
        </div>
    </main>
    <!-- //main -->

    <footer class="footer">
        <div class="container">
            <div class="row text-center">
                <div class="col">
                    <ul class="list-inline">
                        <li class="list-inline-item">Links : </li>
                        <li class="list-inline-item"><a href="./index.html">Home</a></li>
                        <li class="list-inline-item"><a href="./posts.html">Posts</a></li>
                        <li class="list-inline-item"><a href="./about.html">About Me</a></li>
                    </ul>
                </div>
            </div>
            <div class="row text-center">
                <div class="col">
                    <span>© Copyright ${new Date().getFullYear()} ${config.authorName}</span>
                </div>
            </div>
        </div>
    </footer>
    <!-- //footer -->

    <!-- Bootstrap Javascript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous">
        </script>
</body>
</html>`;
}

const addPostspage = posts => {
    fs.writeFile('./posts.html', postspage(posts), (err) => {
        if (err) throw err;
        console.log('posts.html was created successfully');
    });
}

module.exports = addPostspage;