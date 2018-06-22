var db = require('../../connection/dbconnection');
db.connect(db.master,(done)=>{});

exports.getAllLob = function (done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('select lob_id, lob_name from m_lob', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllLobById = function (id, done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("select lob_id, lob_name from m_lob where lob_id = ? or lob_name = ?",  [id,id], function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllLobByCriteria = function (Lob, done) {
    var wh = db.whereCriteriaGenerator(Lob);
     
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("select lob_id, lob_name from m_lob"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertLob = function (Lob, done) {
    var values = Lob.lob_name

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('Insert into m_lob (lob_name) values(?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}



exports.updateLob = function (id, Lob, done) {
    var values = [Lob.lob_name, id]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('update m_lob set lob_name=? where lob_id=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}