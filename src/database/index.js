exports.Database = require('./Database');
const MysqlDatabase = require('./MysqlDatabase');
exports.MysqlDatabase = MysqlDatabase;

const maria = new MysqlDatabase({
    connectionLimit : 10,
    host     : process.env['MARIA_TEST_HOST'],
    user     : process.env['MARIA_TEST_USER'],
    password : process.env['MARIA_TEST_PASS'],
    database : process.env['MARIA_TEST_BASE'],
    debug: false,
    charset:'utf8',
  });

//TODO: change in production - actually return database instance for appropriate environment
exports.DEF_MYSQL = maria;
