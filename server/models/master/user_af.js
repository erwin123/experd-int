var db = require('../../connection/dbconnection');
db.connect(db.af,(done)=>{});

exports.getAllUserAf = function (done) {
    db.get(db.af, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('select id, id_af, email, fname, lname from candidate', function (err, rows) {
            connection.destroy();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllUserAfById = function (id, done) {
    db.get(db.af, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("select role_id, role_name from m_role where role_id = ? or role_name = ?",  [id,id], function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertUserAf = function (UserAf, done) {
    var values = [UserAf.id, UserAf.email, UserAf.firstName, UserAf.lastName]
    db.get(db.af, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('insert into candidate (id_af,email, fname, lname) values(?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.updateUserAf = function (id, Role, done) {
    var values = [Role.role_name, id]

    db.get(db.af, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('update m_role set role_name=? where role_id=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.insertTestType = function (TestType, done) {
    db.get(db.af, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_InsertTestType(?, ?, ?, ?, ?)', TestType, function (err, result) {
            connection.destroy();
            if (err) return done(err)
            done(null, result)
        })
    })
}