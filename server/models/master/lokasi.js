var db = require('../../connection/dbconnection');
db.connect(db.master,(done)=>{});

exports.getAllLocation = function (done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('select lokasi_id,nama_lokasi,kap_sisa,status,keterangan,user_update,date_update from m_lokasi', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllLocationById = function (id, done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("select lokasi_id,nama_lokasi,kap_sisa,status,keterangan,user_update,date_update from m_lokasi where lokasi_id = ? or nama_lokasi = ?",  [id,id], function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertLocation = function (Location, done) {
    var values = [Location.nama_lokasi,	Location.kap_sisa, Location.status,	Location.keterangan, Location.user_update, Location.date_update ]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('Insert into m_lokasi (nama_lokasi,kap_sisa,status,keterangan,user_update,date_update) values(?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.updateLocation = function (id, Location, done) {
    var values = [Location.nama_lokasi,	Location.kap_sisa, Location.status,	Location.keterangan, Location.user_update, Location.date_update,id]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('update m_lokasi set nama_lokasi=?,kap_sisa=?,status=?,keterangan=?,user_update=?,date_update=? where lokasi_id=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}