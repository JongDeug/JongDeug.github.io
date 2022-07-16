/**
 * index.html 파일 생성기
 */

import * as fs from "fs";
import config from "./config.js";

const indexhtml = posts => {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${config.blogDescription}">
    <title>${config.blogName}</title>

    <!-- Bootstrap  CSS-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css">

    <!-- highlight CSS-->
    <link rel="stylesheet" href="./node_modules/highlight.js/styles/atom-one-dark.css"></link> 
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/styles.css">

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-8TXJRS1NF2"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-8TXJRS1NF2');
    </script>
</head>

<body>
    <nav class="navbar navbar-dark bg-black navbar-expand-sm fixed-top">
        <div class="container">
            <a href="/" class="navbar-brand">JongDeug</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-end" id="navContent">
                <ul class="navbar-nav">
                    <li class="nav-item mt-1 mb-1 mt-sm-auto mb-sm-auto">
                        <a href="/" class="nav-link active"><i class="bi bi-house-fill"></i> Home</a>
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
                    <span class="fst-italic fs-1 fw-bold">Welcome to my blog</span>
                </div>
            </div>
        </div>
    </header>
    <!-- //header, jumbotron -->

    <main class="main">
        <div class="container">
            <div class="row row-profile pb-5 border-bottom">
                <div class="col text-center">
                    <img src="img/profile.jpg" alt="" class="img-thumbnail rounded-circle profile">
                    <h2 class="mb-3">${config.authorName.nickname}</h2>
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
            </div>
            <!-- //profile -->

            <div class="posts">
                ${posts
                    .map(post => `<div class="row row-content homepage-posts">
                        <h3><a href="./public/${post.attributes.subject}/${post.path}/" class="text-decoration-none link-danger fst-italic">${post.attributes.title}</a></h3>
                        <small>${new Date(parseInt(post.attributes.date)).toDateString()}</small>
                        <p class="mt-4">${post.attributes.description}</p>
                        </div> 
                    `).join('') // 배열이라 joing 해주지 않으면 ','가 표시됨.       + path 끝에 '/'을 붙여주지 않으면 url을 못찾는 에러가 남.
                } 
            </div>
            <!-- //content -->

            <nav class="row mt-3">
                <ul class="pagination justify-content-center">
                </ul>
            </nav>
            <!-- //pagination-->
        </div>
    </main>
    <!-- //main -->

    <footer class="footer">
        <div class="container">
            <div class="row text-center">
                <div class="col">
                    <ul class="list-inline">
                        <li class="list-inline-item">Links : </li>
                        <li class="list-inline-item"><a href="/">Home</a></li>
                        <li class="list-inline-item"><a href="./posts.html">Posts</a></li>
                        <li class="list-inline-item"><a href="./about.html">About Me</a></li>
                    </ul>
                </div>
            </div>
            <div class="row text-center">
                <div class="col">
                    © Copyright ${new Date().getFullYear()} ${config.authorName.name} 
                </div>
            </div>
        </div>
    </footer>
    <!-- //footer -->

    <!-- Bootstrap Javascript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
    
    <!-- Front Javascript -->
    <script src="./src/front/pagination.js"></script>
</body>

</html>`;
}

const addHomepage = posts => {
    fs.writeFile('./index.html', indexhtml(posts), (err) => {
        if (err) throw err;
        console.log('index.html(homepage) was created successfully');
    });
}

export default addHomepage;

