'use strict';

const path = require('path');
const xtpl = require('xtpl');
const databaseManger = require(path.join(__dirname, '../tools/databaseManger.js'));

// 获取学生数据,并渲染页面,将页面返回给客户端
exports.getStudentListPage = (request, response) => {
    let keyword = request.query.keyword || "";
    databaseManger.find('studentInfo', { name: { $regex: keyword } }, (err, doc) => {
        xtpl.renderFile(path.join(__dirname, '../views/list.html'), { studentList: doc, loginedname: request.session.username, keyword }, (err, content) => {
            response.send(content);
        });
    });
};
// 添加学生页面
exports.getAddStudentPage = (request, response) => {
    xtpl.renderFile(path.join(__dirname, '../views/add.html'), { loginedname: request.session.username }, (err, content) => {
        response.send(content);
    });
};

// 添加学生数据
exports.AddStudent = (request, response) => {
    databaseManger.insertOne('studentInfo', request.body, (err, doc) => {
        if (err) {
            alert('添加失败');
            return;
        }
        response.send('<script>location.href="/student/list"</script>');
    });
};

// 修改学生页面
exports.getEditStudentPage = (request, response) => {
    let studentId = databaseManger.ObjectId(request.params.studentId);
    databaseManger.findOne('studentInfo', { _id: studentId }, (err, doc) => {
        xtpl.renderFile(path.join(__dirname, '../views/edit.html'), { student: doc, loginedname: request.session.username }, (err, content) => {
            response.send(content);
        });
    });
};

// 修改学生数据
exports.editStudent = (request, response) => {
    let studentId = databaseManger.ObjectId(request.params.studentId);
    databaseManger.updateOne('studentInfo', { _id: studentId }, request.body, (err, doc) => {
        if (err) {
            alert('修改失败');
            return;
        }
        response.send('<script>location.href="/student/list"</script>');
    });

};

// 删除学生数据
exports.delStudent = (request, response) => {
    let studentId = databaseManger.ObjectId(request.params.studentId);
    databaseManger.del('studentInfo', { _id: studentId }, (err, doc) => {
        if (err) {
            alert('删除失败');
            return;
        }
        response.send('<script>location.href="/student/list"</script>');
    });

};