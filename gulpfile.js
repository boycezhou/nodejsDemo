'use strict'

var gulp = require('gulp');

gulp.task('default', ['es6toes5anduglify', 'mincss', 'htmlmin', 'copyThird'], () => {
    console.log("default执行完毕!");
})

const babel = require('gulp-babel'); //es6转es5需要的包
const uglify = require('gulp-uglify'); //js压缩需要的包

gulp.task('es6toes5anduglify', () => {
    gulp.src(["./src/controllers/*.js", "./src/routers/*.js", "./src/tools/*.js", "./src/app.js"], { base: "src" }) // base就是js 源码存放的路径
        .pipe(babel({ "presets": ["es2015"] })) //转成es5语法
        .pipe(uglify()) //压缩js
        .pipe(gulp.dest("dist")); //转换成 ES5 存放的路径,最终存放的路径
});

const mincss = require('gulp-cssmin'); //压缩css的包

gulp.task('mincss', () => {
    gulp.src(['./src/statics/css/*.css'], { base: 'src' })
        .pipe(mincss())
        .pipe(gulp.dest("dist"));
});

const htmlmin = require('gulp-htmlmin'); //压缩html的

gulp.task('htmlmin', () => {
    gulp.src(['./src/views/*.html'], { base: 'src' })
        .pipe(htmlmin({ removeComments: true, collapseWhitespace: true })) //表示将空白行及换行都压缩掉
        .pipe(gulp.dest('dist'));
})

gulp.task('copyThird', () => {
    gulp.src(['./src/statics/bootstrap/css/bootstrap.min.css', './src/statics/js/*'], { base: 'src' })
        .pipe(gulp.dest('dist'));
})