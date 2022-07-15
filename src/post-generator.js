/**
 * 게시물.md -> 게시물.html 생성기
 */

import * as fs from "fs";
import fm from "front-matter";
import marked from "./marked.js";
import config from "./config.js";

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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css">

    <!-- CSS -->
    <link rel="stylesheet" href="../../../css/styles.css">

    <!-- Highlight.js CSS-->
    <link rel="stylesheet" href="/node_modules/highlight.js/styles/atom-one-dark-reasonable.css">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-dark-reasonable.css">

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
                        <a href="../../../posts.html" class="nav-link"><i class="bi bi-stickies-fill"></i> Posts</a>
                    </li>
                    <li class="nav-item mb-1 mb-sm-auto">
                        <a href="../../../about.html" class="nav-link"><i class="bi bi-file-person-fill"></i> About Me</a>
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
            <div class="row row-profile">
                <div class="col-12 text-center">
                    <img src="../../../img/profile.jpg" alt="" class="img-thumbnail rounded-circle profile">
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
                            <a href="../../../about.html" class="text-decoration-none link-dark"><i class="bi bi-file-person-fill"></i>
                                About</a>
                        </li>
                    </ul>
                </div>
                <hr>
                <!-- //profile -->
                <nav>
                <ol class="col-12 breadcrumb ps-1 mb-2 pt-3">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item"><a href="../../../posts.html">${data.attributes.subject}</a></li>
                    <li class="breadcrumb-item active">${data.attributes.title}</li>
                </ol>
                </nav>
                <!-- //breadcrumb -->
                <div class="col pb-3">
                    <h1>${data.attributes.title}</h1>
                    <p class="ps-1">${new Date(parseInt(data.attributes.date)).toDateString()}</p>
                </div>
                <hr>
                <!-- //head, date -->
            </div>
                
            <div class="row row-content">
                ${data.body}
            </div>
            <!-- //content -->

            <!-- //utterances -->
            <div class="row">
                <div class="col-12">
                    <script src="https://utteranc.es/client.js"
                    repo="JongDeug/JongDeug.github.io"
                    issue-term="pathname"
                    theme="gruvbox-dark"
                    crossorigin="anonymous"
                    async>
                    </script> 
                </div> 
            </div>
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
                        <li class="list-inline-item"><a href="../../../posts.html">Posts</a></li>
                        <li class="list-inline-item"><a href="../../../about.html">About Me</a></li>
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
    <!-- link set -->
    <script src="../../../src/front/link.js"></script>
</body>`;
}

export const changeMdToObj = postPath => {
    const data = fs.readFileSync(`${config.dev.postdir}/${postPath}.md`, 'utf-8');
    const content = fm(data);
    content.body = marked(content.body);
    content.path = postPath;
    return content;
}

export const createPosts = posts => {
    if (!fs.existsSync(config.dev.outputdir)) fs.mkdirSync(config.dev.outputdir);

    posts.forEach(post => {
        // post가 존재하지 않는다면
        if (!fs.existsSync(`${config.dev.outputdir}/${post.attributes.subject}/${post.path}`)) {
            if (!fs.existsSync(`${config.dev.outputdir}/${post.attributes.subject}`)) {
                fs.mkdirSync(`${config.dev.outputdir}/${post.attributes.subject}`);
                fs.mkdirSync(`${config.dev.outputdir}/${post.attributes.subject}/${post.path}`);
            } else {
                fs.mkdirSync(`${config.dev.outputdir}/${post.attributes.subject}/${post.path}`);
            }
        }

        fs.writeFile(
            `${config.dev.outputdir}/${post.attributes.subject}/${post.path}/index.html`,
            posthtml(post),
            (err) => {
                if (err) throw err;
                console.log(`${post.path}/index.html was created successfully`);
            }
        );
    });
}
