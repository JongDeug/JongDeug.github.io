const fs = require('fs');
const fm = require('front-matter');
const marked = require('./marked');
const config = require('./config');


// md 파일을 html 형식으로 변경
const createPost = postName => {
    const data = fs.readFileSync(`${config.dev.postdir}/${postName}.md`, 'utf-8');
    const content = fm(data);
    // console.log(content);
    content.body = marked.marked(content.body);
    // console.log(content.body);
    content.path = postName;
    // console.log(content);
    return content;
}

const posthtml = data => {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${config.blogDescription}">
    <title>${config.blogName}</title>

    <!-- Bootstrap  CSS-->
    <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/node_modules/bootstrap-icons/font/bootstrap-icons.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css">

    <!-- CSS -->
    <link rel="stylesheet" href="/css/styles.css">

    <!-- Highlight.js CSS-->
    <link rel="stylesheet" href="/node_modules/highlight.js/styles/atom-one-dark-reasonable.css">
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
                        <a href="./index.html" class="nav-link active"><i class="bi bi-house-fill"></i> Home</a>
                    </li>
                    <li class="nav-item mb-1 mb-sm-auto">
                        <a href="./posts.html" class="nav-link"><i class="bi bi-stickies-fill"></i> Posts</a>
                    </li>
                    <li class="nav-item mb-1 mb-sm-auto">
                        <a href="./about.html" class="nav-link"><i class="bi bi-file-person-fill"></i> About Me</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- //nav -->

    <header class="jumbotron">
        <div class="container">
            <div class="row">
                <div class="col d-none d-lg-block">
                    <h1 class="fst-italic">Welcome to my blog</h1>
                </div>
            </div>
        </div>
    </header>
    <!-- //header, jumbotron -->

    <main class="main">
        <div class="container">
            <div class="row row-profile border-bottom pb-2">
                <div class="col-12 text-center">
                    <img src="/img/profile.jpg" alt="" class="img-thumbnail rounded-circle profile">
                    <h2 class="mb-3">JongDeug</h2>
                    <p>까먹으면 다시 여기로!!!!</p>

                    <ul class="list-inline">
                        <li class="list-inline-item">
                            <a href="${config.authorGithub}" target="_blank" class="text-decoration-none link-dark"><i class="bi bi-github"></i> Github</a>
                        </li>
                        <li class="list-inline-item">
                            &middot;
                        </li>
                        <li class="list-inline-item">
                            <a href="./about.html" class="text-decoration-none link-dark"><i class="bi bi-file-person-fill"></i>
                                About</a>
                        </li>
                    </ul>
                </div>
                <ol class="col breadcrumb ms-2 mb-2">
                    <li class="breadcrumb-item"><a href="/index.html">Home</a></li>
                    <li class="breadcrumb-item active">${data.attributes.title}</li>
                </ol>
            </div>
            <!-- //profile -->
                
            <div class="row row-content mt-3">
                <h1>${data.attributes.title}</h1>
                <p>${new Date(parseInt(data.attributes.date)).toDateString()}</p>
                <hr>
                ${data.body}
            </div>
            <!-- //content -->
        </div>
    </main>
    <!-- //main -->

    <footer class="footer">
        <div class="container">
            <div class="row text-center">
                <div class="col">
                    <ul class="list-inline">
                        <li class="list-inline-item fw-bold">Links : </li>
                        <li class="list-inline-item"><a href="./index.html">Home</a></li>
                        <li class="list-inline-item"><a href="./posts.html">Posts</a></li>
                        <li class="list-inline-item"><a href="./about.html">About Me</a></li>
                    </ul>
                </div>
            </div>
            <div class="row text-center">
                <div class="col">
                    © Copyright ${new Date().getFullYear()} ${config.authorName} 
                </div>
            </div>
        </div>
    </footer>
    <!-- //footer -->

    <!-- Bootstrap Javascript -->
    <script src="/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
</body>`;
}

const createPosts = posts => {
    posts.forEach(post => {
        if (!fs.existsSync(`${config.dev.outputdir}/${post.path}`)) {
            fs.mkdirSync(`${config.dev.outputdir}/${post.path}`);
        }

        fs.writeFile(
            `${config.dev.outputdir}/${post.path}/index.html`,
            posthtml(post),
            (err) => {
                if (err) throw err; // 에러 처리
                console.log(`${post.path}/index.html was created successfully`);
            }
        )
    })
}

module.exports = {
    createPost: createPost,
    createPosts: createPosts
}