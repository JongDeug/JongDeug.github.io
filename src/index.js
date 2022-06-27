/**
 * main 파일
 */

const fs = require('fs');
const config = require('./config');
const postMethods = require('./post-generator');
const addHomepage = require('./homepage');
const addPostspage= require('./postspage');

// 게시물.md 파일들을 객체로 변환(Synchronous) 
const posts = fs
    .readdirSync(config.dev.postdir)
    .map(post => post.slice(0, -3)) // 확장자 제거(.md)
    .map(post => postMethods.changeMdToObj(post));

// 변환된 posts 객체를 통해 html 파일 생성
postMethods.createPosts(posts);
addHomepage(posts);
addPostspage(posts);


