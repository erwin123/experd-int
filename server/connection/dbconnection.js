var mysql = require('mysql')
  , async = require('async')

var um = 'usermanagement'
  , trx = 'trx'
  , master = 'bukuorder'
  , af = 'experd_af'


var state = {
  pool: null,
  mode: null,
}

exports.connect = function (mode, done) {
  state.pool = mysql.createPoolCluster();
  state.pool.add('um', {
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: um
  });
  state.pool.add('trx', {
    host: '192.168.10.13',
    user: 'root',
    password: 'experdpwd',
    database: trx
  });
  state.pool.add('master', {
    host: '192.168.10.13',
    user: 'root',
    password: 'experdpwd',
    database: master
  });
  state.pool.add('af', {
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: af
  });
  state.mode = mode;
  done();
}

exports.um = 'um'
exports.trx = 'trx'
exports.master = 'master'
exports.af = 'af'

exports.get = function (type, done) {
  var pool = state.pool

  if (!pool) return done(new Error('Missing database connection.'));
  switch (type) {
    case exports.um:
      state.pool.getConnection('um', function (err, connection) {
        if (err) return done(err)
        done(null, connection)
      })
      break;
    case exports.trx:
      state.pool.getConnection('trx', function (err, connection) {
        if (err) return done(err)
        done(null, connection)
      })
      break;
    case exports.master:
      state.pool.getConnection('master', function (err, connection) {
        if (err) return done(err)
        done(null, connection)
      })
      break;
    case exports.af:
      state.pool.getConnection('af', function (err, connection) {
        if (err) return done(err)
        done(null, connection)
      })
      break;
    default:
      state.pool.getConnection('um', function (err, connection) {
        if (err) return done(err)
        done(null, connection)
      })
  }
}


exports.whereCriteriaGenerator = function (object) {
  var where = " where ";
  for (var propertyName in object) {
    where += propertyName + " = '" + object[propertyName] + "' and ";
  }
  where = where.substring(0, where.length - 4);
  return where;
}