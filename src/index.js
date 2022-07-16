/**
 * main 파일
 */

import * as fs from "fs";
import config from "./config.js";
import * as postMethods from "./post-generator.js"; //그냥 쓰려면 import {changeMdToObj, createPosts}
import addHomepage from "./homepage.js";
import addPostspage from "./postspage.js";

// 게시물.md 파일들을 객체로 변환(Synchronous) 
const posts = fs
    .readdirSync(config.dev.postdir)
    .map(post => post.slice(0, -3)) // 확장자 제거(.md)
    .map(post => postMethods.changeMdToObj(post))
    .sort((a,b) => {return b.attributes.date - a.attributes.date}); // 내림차순 정렬

// 변환된 posts 객체를 통해 html 파일 생성
postMethods.createPosts(posts);
addHomepage(posts);
addPostspage(posts);


