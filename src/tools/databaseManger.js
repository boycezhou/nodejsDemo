'use strict';
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

function getDB(collectionName, callback) {
    let url = 'mongodb://localhost:27017/studentMangerSystem';
    // 连接数据库
    MongoClient.connect(url, (err, db) => {
        let collection = db.collection(collectionName);
        callback(db, collection);
    });
}

exports.ObjectId = ObjectId;

// 查找一个
exports.findOne = (collectionName, option, callback) => {
    getDB(collectionName, (db, collection) => {
        collection.findOne(option, (err, doc) => {
            callback(err, doc);
            db.close();
        });
    });
};

// 查找多个
exports.find = (collectionName, option, callback) => {
    getDB(collectionName, (db, collection) => {
        collection.find(option).toArray((err, doc) => {
            callback(err, doc);
            db.close();
        });
    });
};

// 插入一条
exports.insertOne = (collectionName, option, callback) => {
    getDB(collectionName, (db, collection) => {
        collection.insertOne(option, (err, doc) => {
            callback(err, doc);
            db.close();
        });
    });
};

// 修改一条
exports.updateOne = (collectionName, condition, option, callback) => {
    getDB(collectionName, (db, collection) => {
        collection.updateOne(condition, { $set: option }, (err, doc) => {
            callback(err, doc);
            db.close();
        });
    });
};

// 删除一条
exports.del = (collectionName, option, callback) => {
    getDB(collectionName, (db, collection) => {
        collection.deleteOne(option, (err, doc) => {
            callback(err, doc);
            db.close();
        });
    });
};