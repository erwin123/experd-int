var db = require('../../connection/dbconnection');
db.connect(db.master,(done)=>{});

exports.getAllDivision = function (done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('select divisi_id,divisi_name,divisi_service from m_divisi', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllDivisionById = function (id, done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("select divisi_id,divisi_name,divisi_service from m_divisi where divisi_id = ? or divisi_name = ?",  [id,id], function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertDivision = function (Division, done) {
    var values = [ Division.divisi_name, Division.divisi_service]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('Insert into m_divisi (divisi_name, divisi_service) values(?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.updateDivision = function (id, Division, done) {
    var values = [Division.divisi_name, Division.divisi_service, id]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('update m_divisi set divisi_name=?,divisi_service=? where divisi_id=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}