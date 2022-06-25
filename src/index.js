const fs = require('fs');
const config = require('./config');
const postMethods = require('./posts');
const addHomepage = require('./homepage');

// posts 파일 안의 md 파일들을 html 양식으로 변경. (동기적)
const posts = fs
    .readdirSync(config.dev.postdir)
    .map(post => post.slice(0, -3))
    .map(post => postMethods.createPost(post));

// console.log(posts);


if(!fs.existsSync(config.dev.outputdir)){
    fs.mkdirSync(config.dev.outputdir);
}


// posts를 동기적으로 완료 했기 때문에 이후에는 비동기적으로 완성 시켜도 무방함.
postMethods.createPosts(posts);
addHomepage(posts);

module.exports = posts.length; 

