var db = require('../../connection/dbconnection');
db.connect(db.master,(done)=>{});

exports.getAllBanpt = function (done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('select banpt_id,banpt_code,rowstatus,wilayah,tingkat,PT,studi,no_sk,thn_sk,akreditasi,nilai,expireddate,createdby,createdtime,lastmodifiedby,lastmodifiedtime from m_banpt', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllBanptById = function (id, done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("select banpt_id,rowstatus,wilayah,tingkat,PT,studi,no_sk,thn_sk,akreditasi,nilai,expireddate,createdby,createdtime,lastmodifiedby,lastmodifiedtime,banpt_code from m_banpt where banpt_id = ? or banpt_code = ?",  [id,id], function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllBanptByCriteria = function (Banpt, done) {
    var wh = db.whereCriteriaGenerator(Banpt);
     
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("select banpt_id,rowstatus,wilayah,tingkat,PT,studi,no_sk,thn_sk,akreditasi,nilai,expireddate,createdby,createdtime,lastmodifiedby,lastmodifiedtime,banpt_code from m_banpt"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertBanpt = function (Banpt, done) {
    var values = [ Banpt.banpt_code,Banpt.rowstatus,Banpt.wilayah,Banpt.tingkat,Banpt.PT,Banpt.studi,Banpt.no_sk,Banpt.thn_sk,Banpt.akreditasi,Banpt.nilai,Banpt.expireddate,Banpt.createdby,Banpt.createdtime]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('Insert into m_banpt (banpt_code,rowstatus,wilayah,tingkat,PT,studi,no_sk,thn_sk,akreditasi,nilai,expireddate,createdby,createdtime) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.updateBanpt = function (id, Banpt, done) {
    var values = [ Banpt.rowstatus,Banpt.wilayah,Banpt.tingkat,Banpt.PT,Banpt.studi,Banpt.no_sk,Banpt.thn_sk,Banpt.akreditasi,Banpt.nilai,Banpt.expireddate,Banpt.lastmodifiedtime,Banpt.lastmodifiedby, id]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('update m_banpt set rowstatus=?,wilayah=?,tingkat=?,PT=?,studi=?,no_sk=?,thn_sk=?,akreditasi=?,nilai=?,expireddate=?,lastmodifiedtime=?,lastmodifiedby=? where banpt_code=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}