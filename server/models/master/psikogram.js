var db = require('../../connection/dbconnection');
db.connect(db.master,(done)=>{});

exports.getAllPsikogram = function (done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('select psikogram_id, psikogram_name, psikogram_file from m_psikogram', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllPsikogramById = function (id, done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("select psikogram_id, psikogram_name, psikogram_file from m_psikogram where psikogram_id = ? or psikogram_name = ?",  [id,id], function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertPsikogram = function (Psikogram, done) {
    var values = [Psikogram.psikogram_name, Psikogram.psikogram_file]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('Insert into m_psikogram (psikogram_name, psikogram_file) values(?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.updatePsikogram = function (id, Psikogram, done) {
    var values = [Psikogram.psikogram_name, Psikogram.psikogram_file, id]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('update m_psikogram set psikogram_name=?,psikogram_file=? where psikogram_id=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}