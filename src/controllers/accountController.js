'use strict';

const path = require('path');
const captchapng = require('captchapng');
const databaseManger = require(path.join(__dirname, '../tools/databaseManger.js'));

exports.getLoginPage = (request, response) => {
    response.sendFile(path.join(__dirname, '../views/login.html'));
};

// 获取验证码
exports.getVcodeImg = (request, response) => {
    let vcode = parseInt(Math.random() * 9000 + 1000);
    request.session.vcode = vcode;
    let p = new captchapng(80, 30, vcode); // width,height,numeric captcha 
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha) 
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 

    let img = p.getBase64();
    let imgbase64 = new Buffer(img, 'base64');
    response.writeHead(200, {
        'Content-Type': 'image/png'
    });
    response.end(imgbase64);
};

// 登录验证
exports.login = (request, response) => {
    let result = {
        status: 0,
        message: '登录成功'
    };
    let params = request.body;
    let username = params.username;
    let password = params.password;
    let vcode = params.vcode;
    request.session.username = username;
    if (vcode != request.session.vcode) {
        result.status = 1;
        result.message = '验证码错误';
        response.json(result);
        return;
    }
    databaseManger.findOne('accountInfo', { username, password }, (err, doc) => {
        if (!doc) {
            result.status = 2;
            result.message = '用户名或密码错误';
        }
        response.json(result);
    });
};
// 获取注册页面
exports.getRegisterPage = (request, response) => {
    response.sendFile(path.join(__dirname, '../views/register.html'));
};

exports.register = (request, response) => {
    let result = {
        status: 0,
        message: '注册成功'
    };
    databaseManger.insertOne('accountInfo', request.body, (err, doc) => {
        if (err) {
            result.status = 1;
            result.message = '注册失败';
        }
        response.json(result);
    });
};

exports.logout = (request, response) => {
    request.session.username = null;
    response.send('<script>location.href="/account/login"</script>');
}