'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const accountRouter = require(path.join(__dirname, './routers/accountRouter.js'));
const studentRouter = require(path.join(__dirname, './routers/studentRouter.js'));


const app = express();
app.use(express.static(path.join(__dirname, './statics')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } }));

// 拦截所有请求,做权限校验
app.all('/*', (request, response, next) => {
    if (request.url.startsWith('/account') || request.session.username) {
        next();
    } else {
        response.send('<script>alert("请先登录!");location.href="/account/login"</script>');
    }
});
app.use('/account', accountRouter);
app.use('/student', studentRouter);
// 开启服务
app.listen(3000, '127.0.0.1', (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('start success');
});