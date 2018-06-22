var db = require('../../connection/dbconnection');
db.connect(db.master,(done)=>{});

exports.getAllPaket = function (done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('select paket_id,kode_paket,klien_id,paket_code,paket_name,nama_paket,nama_order,paket_level,paket_bobot,tools,laporan,language,paket_price,honor_ass,honor_lap,honor_so,valid_until,keterangan,user_update,date_update from m_paket', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllPaketById = function (id, done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("select paket_id,kode_paket,klien_id,paket_code,paket_name,nama_paket,nama_order,paket_level,paket_bobot,tools,laporan,language,paket_price,honor_ass,honor_lap,honor_so,valid_until,keterangan,user_update,date_update from m_paket where paket_id = ? or kode_paket = ?",  [id,id], function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertPaket = function (Paket, done) {
    var values = [Paket.kode_paket,Paket.klien_id,Paket.paket_code,Paket.paket_name,Paket.nama_paket,Paket.nama_order,Paket.paket_level,Paket.paket_bobot,Paket.tools,Paket.laporan,Paket.language,Paket.paket_price,Paket.honor_ass,Paket.honor_lap,Paket.honor_so,Paket.valid_until,Paket.keterangan,Paket.user_update,Paket.date_update]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('Insert into m_paket (kode_paket,klien_id,paket_code,paket_name,nama_paket,nama_order,paket_level,paket_bobot,tools,laporan,language,paket_price,honor_ass,honor_lap,honor_so,valid_until,keterangan,user_update,date_update) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.updatePaket = function (id, Paket, done) {
    var values = [Paket.kode_paket,Paket.klien_id,Paket.paket_code,Paket.paket_name,Paket.nama_paket,Paket.nama_order,Paket.paket_level,Paket.paket_bobot,Paket.tools,Paket.laporan,Paket.language,Paket.paket_price,Paket.honor_ass,Paket.honor_lap,Paket.honor_so,Paket.valid_until,Paket.keterangan,Paket.user_update,Paket.date_update, id]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('update m_paket set kode_paket=?,klien_id=?,paket_code=?,paket_name=?,nama_paket=?,nama_order=?,paket_level=?,paket_bobot=?,tools=?,laporan=?,language=?,paket_price=?,honor_ass=?,honor_lap=?,honor_so=?,valid_until=?,keterangan=?,user_update=?,date_update=? where paket_id=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}