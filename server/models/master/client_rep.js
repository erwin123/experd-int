var db = require('../../connection/dbconnection');
db.connect(db.master,(done)=>{});

exports.getAllClientRep = function (done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('select rep_id,klien_id,rep_name,rep_position,rep_email,rep_hp,rep_phone,rep_status,user_update,date_update        from m_klien_rep', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllClientRepById = function (id, done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("select rep_id,klien_id,rep_name,rep_position,rep_email,rep_hp,rep_phone,rep_status,user_update,date_update from m_klien_rep where klien_id = ? or rep_name = ?",  [id,id], function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertClientRep = function (ClientRep, done) {
    var values = [ ClientRep.klien_id,ClientRep.rep_name,ClientRep.rep_position,ClientRep.rep_email,ClientRep.rep_hp,ClientRep.rep_phone,ClientRep.rep_status,ClientRep.user_update,ClientRep.date_update ]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('Insert into m_klien_rep (klien_id,rep_name,rep_position,rep_email,rep_hp,rep_phone,rep_status,user_update,date_update) values(?,?,?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.updateClientRep = function (id, ClientRep, done) {
    var values = [ ClientRep.rep_name,ClientRep.rep_position,ClientRep.rep_email,ClientRep.rep_hp,ClientRep.rep_phone,ClientRep.rep_status,ClientRep.user_update,ClientRep.date_update,id ]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('update m_klien_rep set klien_id=?,rep_name=?,rep_position=?,rep_email=?,rep_hp=?,rep_phone=?,rep_status=?,user_update=?,date_update=? where rep_id=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}