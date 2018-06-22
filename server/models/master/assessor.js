var db = require('../../connection/dbconnection');
db.connect(db.master,(done)=>{});

exports.getAllAssessor = function (done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('select ass_id,karyawan_id,ass_kapasitas,ass_himpsi,ass_srip,ass_domisili,ass_rekening,ass_phone,ass_email,ass_mentor,ass_orientasi,ass_workshopass,ass_aspek,ass_gl,ass_glmmin,ass_l,ass_lmmin,ass_lm,ass_lmplus,ass_lmplusplus,ass_eps,ass_eis,ass_konselor,ass_pic,ass_la_role,ass_translator,user_update,date_update from m_assessor', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllAssessorById = function (id, done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("select ass_id,karyawan_id,ass_kapasitas,ass_himpsi,ass_srip,ass_domisili,ass_rekening,ass_phone,ass_email,ass_mentor,ass_orientasi,ass_workshopass,ass_aspek,ass_gl,ass_glmmin,ass_l,ass_lmmin,ass_lm,ass_lmplus,ass_lmplusplus,ass_eps,ass_eis,ass_konselor,ass_pic,ass_la_role,ass_translator,user_update,date_update from m_assessor where karyawan_id = ?",  id, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertAssessor = function (Assessor, done) {
    var values = [Assessor.karyawan_id,Assessor.ass_kapasitas,Assessor.ass_himpsi,Assessor.ass_srip,Assessor.ass_domisili,Assessor.ass_rekening,Assessor.ass_phone,Assessor.ass_email,Assessor.ass_mentor,Assessor.ass_orientasi,Assessor.ass_workshopass,Assessor.ass_aspek,Assessor.ass_gl,Assessor.ass_glmmin,Assessor.ass_l,Assessor.ass_lmmin,Assessor.ass_lm,Assessor.ass_lmplus,Assessor.ass_lmplusplus,Assessor.ass_eps,Assessor.ass_eis,Assessor.ass_konselor,Assessor.ass_pic,Assessor.ass_la_role,Assessor.ass_translator,Assessor.user_update,Assessor.date_update]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('Insert into m_assessor (karyawan_id,ass_kapasitas,ass_himpsi,ass_srip,ass_domisili,ass_rekening,ass_phone,ass_email,ass_mentor,ass_orientasi,ass_workshopass,ass_aspek,ass_gl,ass_glmmin,ass_l,ass_lmmin,ass_lm,ass_lmplus,ass_lmplusplus,ass_eps,ass_eis,ass_konselor,ass_pic,ass_la_role,ass_translator,user_update,date_update) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.updateAssessor = function (id, Assessor, done) {
    var values = [Assessor.karyawan_id,Assessor.ass_kapasitas,Assessor.ass_himpsi,Assessor.ass_srip,Assessor.ass_domisili,Assessor.ass_rekening,Assessor.ass_phone,Assessor.ass_email,Assessor.ass_mentor,Assessor.ass_orientasi,Assessor.ass_workshopass,Assessor.ass_aspek,Assessor.ass_gl,Assessor.ass_glmmin,Assessor.ass_l,Assessor.ass_lmmin,Assessor.ass_lm,Assessor.ass_lmplus,Assessor.ass_lmplusplus,Assessor.ass_eps,Assessor.ass_eis,Assessor.ass_konselor,Assessor.ass_pic,Assessor.ass_la_role,Assessor.ass_translator,Assessor.user_update,Assessor.date_update,id]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('update m_assessor set karyawan_id=?,ass_kapasitas=?,ass_himpsi=?,ass_srip=?,ass_domisili=?,ass_rekening=?,ass_phone=?,ass_email=?,ass_mentor=?,ass_orientasi=?,ass_workshopass=?,ass_aspek=?,ass_gl=?,ass_glmmin=?,ass_l=?,ass_lmmin=?,ass_lm=?,ass_lmplus=?,ass_lmplusplus=?,ass_eps=?,ass_eis=?,ass_konselor=?,ass_pic=?,ass_la_role=?,ass_translator=?,user_update=?,date_update=? where ass_id=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}