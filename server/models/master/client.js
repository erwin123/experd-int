var db = require('../../connection/dbconnection');
db.connect(db.master, (done) => { });

exports.getAllClient = function (done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('select klien_id, klien_code, klien_name, klien_legal_name, klien_faktur_name,	lob_id,	klien_div,	klien_address,	klien_faktur_address, klien_npwp, klien_phone, klien_fax, klien_website, klien_po, specrequest, keterangan, user_update, date_update, lob_name,	sister_status, klien_kode_faktur, klien_upload_npwp, klien_tgl_terdaftar_npwp,	klien_cabang_npwp,	klien_keterangan_npwp from m_klien', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllClientById = function (id, done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('select klien_id, klien_code, klien_name, klien_legal_name, klien_faktur_name,	lob_id,	klien_div,	klien_address,	klien_faktur_address, klien_npwp, klien_phone, klien_fax, klien_website, klien_po, specrequest, keterangan, user_update, date_update, lob_name,	sister_status, klien_kode_faktur, klien_upload_npwp, klien_tgl_terdaftar_npwp,	klien_cabang_npwp,	klien_keterangan_npwp from m_klien where klien_code = ? or klien_id = ?', [id, id], function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertClient = function (client, done) {
    var lastnumber = "0";
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("call sp_GetLastNumber()", function (err, rows) {
            if (err) return done(err)
            var obj = rows[0];
            lastnumber =  obj[0].result;
            var values = [client.klien_id, lastnumber, client.klien_name, client.klien_legal_name, client.klien_faktur_name, client.lob_id, client.klien_div, client.klien_address, client.klien_faktur_address, client.klien_npwp, client.klien_phone, client.klien_fax, client.klien_website, client.klien_po, client.specrequest, client.keterangan, client.user_update, client.date_update, client.lob_name, client.sister_status, client.klien_kode_faktur, client.klien_upload_npwp, client.klien_tgl_terdaftar_npwp, client.klien_cabang_npwp, client.klien_keterangan_npwp]
            connection.query("insert into m_klien values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, lastnumber)
        });
        });
        
        
    })
}

exports.updateClient = function (id, client, done) {
    var values = [client.klien_code, client.klien_name, client.klien_legal_name, client.klien_faktur_name, client.lob_id, client.klien_div, client.klien_address, client.klien_faktur_address, client.klien_npwp, client.klien_phone, client.klien_fax, client.klien_website, client.klien_po, client.specrequest, client.keterangan, client.user_update, client.date_update, client.lob_name, client.sister_status, client.klien_kode_faktur, client.klien_upload_npwp, client.klien_tgl_terdaftar_npwp, client.klien_cabang_npwp, client.klien_keterangan_npwp, client.klien_id]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('update m_klien set klien_code=?, klien_name=?, klien_legal_name=?, klien_faktur_name=?, lob_id=?,	klien_div=?,	klien_address=?,	klien_faktur_address=?,	klien_npwp=?, klien_phone=?, klien_fax=?, klien_website=?, klien_po=?,	specrequest=?,	keterangan=?,	user_update=?,	date_update=?,	lob_name=?,	sister_status=?,	klien_kode_faktur=?, klien_upload_npwp=?, klien_tgl_terdaftar_npwp=?, klien_cabang_npwp=?, klien_keterangan_npwp=? where klien_id=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, client.klien_code)
        })
    })
}

exports.deleteClient = function (klien_code, done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("delete from m_klien where klien_code=?", klien_code, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, klien_code)
        })
    })
}