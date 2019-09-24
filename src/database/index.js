exports.Database = require('./Database');
const MysqlDatabase = require('./MysqlDatabase');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

exports.MysqlDatabase = MysqlDatabase;

/**
 * 检测数据库是否存在，不存在则使用脚本创建新库表
 */
const sqlData = fs.readFileSync(path.join(__dirname, './database.sql'),{encoding:'utf8',flag:'r'});

const connection = mysql.createConnection({
  host     : process.env['MARIA_TEST_HOST'],
  user     : 'root',
  password : '1qa2ws3ed',
  charset:'utf8',
  multipleStatements: true
});
connection.query(sqlData,function(){
  connection.close()
})


const maria = new MysqlDatabase({
    connectionLimit : 10,
    host     : process.env['MARIA_TEST_HOST'],
    user     : process.env['MARIA_TEST_USER'],
    password : process.env['MARIA_TEST_PASS'],
    database : process.env['MARIA_TEST_BASE'],
    debug: true,
    charset:'utf8',
  });

//TODO: change in production - actually return database instance for appropriate environment
exports.DEF_MYSQL = maria;
