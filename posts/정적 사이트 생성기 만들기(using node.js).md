---
title: 정적 사이트 생성기 만들기(using node.js)
subject: 블로그 만들기
date: 1657874404975
description: 정적 사이트 생성기를 만드는데 필요한 핵심 기능을 설명합니다.
---
## 정적 사이트 생성기란?
정적 사이트 생성기(SSG, Static Site Generator).  정적 사이트 생성기란 말 그대로 정적 사이트를 생성해 주는 프로그램을 말합니다. 웹 페이지는 크게 정적 사이트, 동적 사이트로 나뉩니다. 사용자들이 입력한 값 등 요청에 의하여 생성되는 사이트를 동적 사이트라 하며,  서버에 미리 저장된 파일들을 그대로 전달하는 사이트를 정적 사이트라 합니다. 그래서 작성자가 글을 작성하고 업데이트하는 것 외에 별달리 기능이 없는 블로그 같은 곳에 정적 사이트를 많이 사용합니다.

Jekyll, Hugo, Hexo 등 여러 가지 정적 사이트 생성기가 있습니다. 이것들을 사용하면 굉장히 빠르고 쉽게 사이트를 만들 수 있습니다. 하지만 저는 블로그 자체를 직접 만들어보고 싶어서 node.js로 만들 수 있는 방법을 찾게 되었습니다.    

## 핵심
md 파일을 html 파일로 변환하는 것이 핵심입니다.    
1차적으로 모듈들을 사용하여 데이터를 가공하고, 가공한 데이터를 가지고 템플릿에 적용하여 html 파일을 생성합니다.    

## 모듈 설치
- front-matter  : YAML 추출과 md 파일 내용 등을 객체로 추출하기 위해 사용.
- marked : md 파일 내용을 html 코드로 변환하기 위해 사용.
- highlight.js : 코드를 이쁘게 정돈해 주기 위한 라이브러리.

```
> npm init    
> npm i front-matter marked highlight.js
```     

## 문서 구조 

    디렉토리
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── posts
    │   └── 포스트.md
    └── src
        ├── index.js
        ├── marked.js
        └── post-generator.js

이 구조대로 폴더와 js 파일을 만드시면 됩니다.    
포스트.md 양식 파일은 [이곳](https://github.com/JongDeug/JongDeug.github.io/tree/master/%EA%B8%B0%ED%83%80)에 들어가면 있습니다.

## 설정
##### *package.json*
```javascript
"scripts": {
    "build": "node ./src/index.js"
},
"type": "module" 
```
scripts에 build 부분을 추가하고, import 문법을 사용하기 위해 type을 추가시킵니다.    

## 코드 

**//marked.js file**
```javascript
import { marked } from "marked";
import hljs from "highlight.js"; 

marked.setOptions({
	renderer: new marked.Renderer(),
	highlight: function (code, lang) {
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

export default marked;
```
marked 옵션에 highlight 설정을 추가시켜 줍시다.    
<br><br>

**//index.js(main)**
```javascript
import * as fs from "fs";
import * as postMethods from "./post-generator.js";

const posts = fs
  .readdirSync('./posts')
  .map(post => post.slice(0, -3)) // 확장자 제거(md)
  .map(post => postMethods.changeMdToObj(post));

postMethods.createPosts(posts);
```

동기적으로 실행해야 하기 때문에 readdirSync() 함수를 사용합니다. 
1. posts 폴더의 md 파일을 읽고 
2. 확장자를 제거한 후 
3. changeMdToObj() 함수를 통해 객체 형태로 posts 변수에 담습니다. 
4. 마지막으로 객체 형태인 posts 변수를 createPosts() 함수를 통해 html 파일로 만듭니다.    
<br><br>

**//post-generator.js file**
1. changeMdToObj() 

```javascript
export const changeMdToObj = postPath => {
    const data = fs.readFileSync(`./posts/${postPath}.md`, 'utf-8');
    const content = fm(data); // YAML 추출
    content.body = marked(content.body); // md 파일을 html 형태로 변환
    content.path = postPath;
    return content;
}
```
fm() 함수로 md 파일의 YAML 부분을 추출하고 body 부분을 marked() 함수를 통해 html 형태로 바꿔주는 코드입니다. fm() 함수의 반환값이 궁금하시다면 https://www.npmjs.com/package/front-matter 을 참고하시면 되겠습니다. 

2. createPosts()
```javascript
export const createPosts = posts => {
    if(!fs.existsSync('./public')) fs.mkdirSync('./public'); // public 폴더가 없다면 생성

    posts.forEach(post => {
        if(!fs.existsSync(`./public/${post.path}`)) fs.mkdirSync(`./public/${post.path}`);

        fs.writeFile(`./public/${post.path}/index.html`,
        posthtml(post),
        (err) => {
            if(err) throw err;
            console.log(`${post.path}/index.html was created successfully`);
        });
    });
}
```
public 폴더가 존재하지 않는다면 생성을 해주고, posthtml() 템플릿을 통해 index.html 파일을 public 폴더 안에 생성해 줍니다. 

3. 전체 코드
```javascript
import * as fs from "fs";
import fm from "front-matter";
import marked from "./marked.js";

const posthtml = data => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>${data.attributes.title}</h1>
    <br>
    <p>${new Date(parseInt(data.attributes.date)).toDateString()}</p>

    <div class="content">
        ${data.body}
    </div>
</body>
</html>`;
}

export const changeMdToObj = postPath => {
    const data = fs.readFileSync(`./posts/${postPath}.md`, 'utf-8');
    const content = fm(data); // YAML 추출
    content.body = marked(content.body); // md 파일을 html 형태로 변환
    content.path = postPath;
    return content;
}

export const createPosts = posts => {
    if(!fs.existsSync('./public')) fs.mkdirSync('./public'); // public 폴더가 없다면 생성

    posts.forEach(post => {
        if(!fs.existsSync(`./public/${post.path}`)) fs.mkdirSync(`./public/${post.path}`);

        fs.writeFile(`./public/${post.path}/index.html`,
        posthtml(post),
        (err) => {
            if(err) throw err;
            console.log(`${post.path}/index.html was created successfully`);
        });
    });
}
```    

## 실행 
```
npm run build
```

## 내 블로그 깃헙
현재 코드보다 조금 더 완성된 정적 사이트를 보고 싶으시다면 제 [깃헙](https://github.com/JongDeug/JongDeug.github.io)을 참고하시면 될 것 같습니다. 완벽하지 않지만 개선하고 있습니다!
  

## 참고 자료 
1. https://betterprogramming.pub/how-to-build-a-simple-static-site-generator-using-node-js-6425b71272e0    
2. https://bohyeon-n.github.io/deploy/nodejs/blogindex.html

## 마치며
잘못된 점이나 개선할 점이 있다면 꼭 알려주시길 바랍니다! 부족한 글 읽어주셔서 감사합니다.