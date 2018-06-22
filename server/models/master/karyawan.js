var db = require('../../connection/dbconnection');
db.connect(db.master,(done)=>{});

exports.getAllKaryawan = function (done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('select karyawan_id, karyawan_initial, karyawan_usrname, karyawan_pwd,Karyawan_name, karyawan_position, karyawan_pob,Karyawan_dob,Karyawan_pic,Karyawan_sex,Karyawan_marital,Karyawan_children,Karyawan_religion,Karyawan_address1, karyawan_address2, karyawan_personal_email, karyawan_business_email, karyawan_personal_phone, karyawan_business_phone, karyawan_personal_hp,Karyawan_business_hp,Karyawan_notes1,Karyawan_notes2,Karyawan_joindate,Karyawan_appointmentdate,Karyawan_resigndate,Karyawan_grade,	divisi_id,Karyawan_color,Karyawan_status, karyawan_spousename, karyawan_interest, karyawan_socialactivity, karyawan_organization, karyawan_affiliation, karyawan_specialization,Karyawan_finance,Karyawan_active,Karyawan_lastlogin,Karyawan_lastip, user_insert, date_insert, user_update, date_update from m_karyawan', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllKaryawanById = function (id, done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("select karyawan_id, karyawan_initial, karyawan_usrname, karyawan_pwd,Karyawan_name, karyawan_position, karyawan_pob,Karyawan_dob,Karyawan_pic,Karyawan_sex,Karyawan_marital,Karyawan_children,Karyawan_religion,Karyawan_address1, karyawan_address2, karyawan_personal_email, karyawan_business_email, karyawan_personal_phone, karyawan_business_phone, karyawan_personal_hp,Karyawan_business_hp,Karyawan_notes1,Karyawan_notes2,Karyawan_joindate,Karyawan_appointmentdate,Karyawan_resigndate,Karyawan_grade,	divisi_id,Karyawan_color,Karyawan_status, karyawan_spousename, karyawan_interest, karyawan_socialactivity, karyawan_organization, karyawan_affiliation, karyawan_specialization,Karyawan_finance,Karyawan_active,Karyawan_lastlogin,Karyawan_lastip, user_insert, date_insert, user_update, date_update from m_karyawan where karyawan_id = ? or karyawan_initial = ? or karyawan_usrname = ?",  [id,id,id], function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllLobKaryawanCriteria = function (Karyawan, done) {
    var wh = db.whereCriteriaGenerator(Karyawan);
     
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("select karyawan_id, karyawan_initial, karyawan_usrname, karyawan_pwd,Karyawan_name, karyawan_position, karyawan_pob,Karyawan_dob,Karyawan_pic,Karyawan_sex,Karyawan_marital,Karyawan_children,Karyawan_religion,Karyawan_address1, karyawan_address2, karyawan_personal_email, karyawan_business_email, karyawan_personal_phone, karyawan_business_phone, karyawan_personal_hp,Karyawan_business_hp,Karyawan_notes1,Karyawan_notes2,Karyawan_joindate,Karyawan_appointmentdate,Karyawan_resigndate,Karyawan_grade,	divisi_id,Karyawan_color,Karyawan_status, karyawan_spousename, karyawan_interest, karyawan_socialactivity, karyawan_organization, karyawan_affiliation, karyawan_specialization,Karyawan_finance,Karyawan_active,Karyawan_lastlogin,Karyawan_lastip, user_insert, date_insert, user_update, date_update from m_karyawan"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertKaryawan = function (Karyawan, done) {
    var values = [ Karyawan.karyawan_initial,Karyawan.karyawan_usrname,Karyawan.karyawan_pwd,Karyawan.karyawan_name,Karyawan.karyawan_position,Karyawan.karyawan_pob,Karyawan.karyawan_dob,Karyawan.karyawan_pic,Karyawan.karyawan_sex,Karyawan.karyawan_marital,Karyawan.karyawan_children,Karyawan.karyawan_religion,Karyawan.karyawan_address1,Karyawan.karyawan_address2,Karyawan.karyawan_personal_email,Karyawan.karyawan_business_email,Karyawan.karyawan_personal_phone,Karyawan.karyawan_business_phone,Karyawan.karyawan_personal_hp,Karyawan.karyawan_business_hp,Karyawan.karyawan_notes1,Karyawan.karyawan_notes2,Karyawan.karyawan_joindate,Karyawan.karyawan_appointmentdate,Karyawan.karyawan_resigndate,Karyawan.karyawan_grade,Karyawan.divisi_id,Karyawan.karyawan_color,Karyawan.karyawan_status,Karyawan.karyawan_spousename,Karyawan.karyawan_interest,Karyawan.karyawan_socialactivity,Karyawan.karyawan_organization,Karyawan.karyawan_affiliation,Karyawan.karyawan_specialization,Karyawan.karyawan_finance,Karyawan.karyawan_active,Karyawan.karyawan_lastlogin,Karyawan.karyawan_lastip,Karyawan.user_insert,Karyawan.date_insert,Karyawan.user_update,Karyawan.date_update]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('Insert into m_karyawan (karyawan_initial, karyawan_usrname, karyawan_pwd,Karyawan_name, karyawan_position, karyawan_pob,Karyawan_dob,Karyawan_pic,Karyawan_sex,Karyawan_marital,Karyawan_children,Karyawan_religion,Karyawan_address1, karyawan_address2, karyawan_personal_email, karyawan_business_email, karyawan_personal_phone, karyawan_business_phone, karyawan_personal_hp,Karyawan_business_hp,Karyawan_notes1,Karyawan_notes2,Karyawan_joindate,Karyawan_appointmentdate,Karyawan_resigndate,Karyawan_grade,	divisi_id,Karyawan_color,Karyawan_status, karyawan_spousename, karyawan_interest, karyawan_socialactivity, karyawan_organization, karyawan_affiliation, karyawan_specialization,Karyawan_finance,Karyawan_active,Karyawan_lastlogin,Karyawan_lastip, user_insert, date_insert, user_update, date_update) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.updateKaryawan = function (id, Karyawan, done) {
    var values = [ Karyawan.karyawan_initial,Karyawan.karyawan_usrname,Karyawan.karyawan_pwd,Karyawan.karyawan_name,Karyawan.karyawan_position,Karyawan.karyawan_pob,Karyawan.karyawan_dob,Karyawan.karyawan_pic,Karyawan.karyawan_sex,Karyawan.karyawan_marital,Karyawan.karyawan_children,Karyawan.karyawan_religion,Karyawan.karyawan_address1,Karyawan.karyawan_address2,Karyawan.karyawan_personal_email,Karyawan.karyawan_business_email,Karyawan.karyawan_personal_phone,Karyawan.karyawan_business_phone,Karyawan.karyawan_personal_hp,Karyawan.karyawan_business_hp,Karyawan.karyawan_notes1,Karyawan.karyawan_notes2,Karyawan.karyawan_joindate,Karyawan.karyawan_appointmentdate,Karyawan.karyawan_resigndate,Karyawan.karyawan_grade,Karyawan.divisi_id,Karyawan.karyawan_color,Karyawan.karyawan_status,Karyawan.karyawan_spousename,Karyawan.karyawan_interest,Karyawan.karyawan_socialactivity,Karyawan.karyawan_organization,Karyawan.karyawan_affiliation,Karyawan.karyawan_specialization,Karyawan.karyawan_finance,Karyawan.karyawan_active,Karyawan.karyawan_lastlogin,Karyawan.karyawan_lastip,Karyawan.user_insert,Karyawan.date_insert,Karyawan.user_update,Karyawan.date_update ,id]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('update m_karyawan set karyawan_initial=?,karyawan_usrname=?,karyawan_pwd=?,karyawan_name=?,karyawan_position=?,karyawan_pob=?,karyawan_dob=?,karyawan_pic=?,karyawan_sex=?,karyawan_marital=?,karyawan_children=?,karyawan_religion=?,karyawan_address1=?,karyawan_address2=?,karyawan_personal_email=?,karyawan_business_email=?,karyawan_personal_phone=?,karyawan_business_phone=?,karyawan_personal_hp=?,karyawan_business_hp=?,karyawan_notes1=?,karyawan_notes2=?,karyawan_joindate=?,karyawan_appointmentdate=?,karyawan_resigndate=?,karyawan_grade=?, divisi_id=?,karyawan_color=?,karyawan_status=?,karyawan_spousename=?,karyawan_interest=?,karyawan_socialactivity=?,karyawan_organization=?,karyawan_affiliation=?,karyawan_specialization=?,karyawan_finance=?,karyawan_active=?,karyawan_lastlogin=?,karyawan_lastip=?,	user_insert=?,	date_insert=?,	user_update=?,	date_update=? where karyawan_id=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}