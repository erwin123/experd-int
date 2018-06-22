var db = require('../../connection/dbconnection');
db.connect(db.master,(done)=>{});

exports.getAllKaryawanAkses = function (done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('select akses_id,karyawan_id,employee_view,employee_add,employee_edit,employee_delete,associate_view,associate_add,associate_edit,associate_delete,client_view,client_add,client_edit,client_delete,cp_view,cp_add,cp_edit,cp_delete,user_update,date_update from m_karyawan_akses', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllKaryawanAksesById = function (id, done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("select akses_id,karyawan_id,employee_view,employee_add,employee_edit,employee_delete,associate_view,associate_add,associate_edit,associate_delete,client_view,client_add,client_edit,client_delete,cp_view,cp_add,cp_edit,cp_delete,user_update,date_update from m_karyawan_akses where karyawan_id = ?",  id, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertKaryawanAkses = function (KaryawanAkses, done) {
    var values = [KaryawanAkses.akses_id,KaryawanAkses.karyawan_id,KaryawanAkses.employee_view,KaryawanAkses.employee_add,KaryawanAkses.employee_edit,KaryawanAkses.employee_delete,KaryawanAkses.associate_view,KaryawanAkses.associate_add,KaryawanAkses.associate_edit,KaryawanAkses.associate_delete,KaryawanAkses.client_view,KaryawanAkses.client_add,KaryawanAkses.client_edit,KaryawanAkses.client_delete,KaryawanAkses.cp_view,KaryawanAkses.cp_add,KaryawanAkses.cp_edit,KaryawanAkses.cp_delete,KaryawanAkses.user_update,KaryawanAkses.date_update]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('Insert into m_karyawan_akses (karyawan_id,employee_view,employee_add,employee_edit,employee_delete,associate_view,associate_add,associate_edit,associate_delete,client_view,client_add,client_edit,client_delete,cp_view,cp_add,cp_edit,cp_delete,user_update,date_update) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.updateKaryawanAkses = function (id, KaryawanAkses, done) {
    var values = [KaryawanAkses.karyawan_id,KaryawanAkses.employee_view,KaryawanAkses.employee_add,KaryawanAkses.employee_edit,KaryawanAkses.employee_delete,KaryawanAkses.associate_view,KaryawanAkses.associate_add,KaryawanAkses.associate_edit,KaryawanAkses.associate_delete,KaryawanAkses.client_view,KaryawanAkses.client_add,KaryawanAkses.client_edit,KaryawanAkses.client_delete,KaryawanAkses.cp_view,KaryawanAkses.cp_add,KaryawanAkses.cp_edit,KaryawanAkses.cp_delete,KaryawanAkses.user_update,KaryawanAkses.date_update,id]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('update m_karyawan_akses set karyawan_id=?,employee_view=?,employee_add=?,employee_edit=?,employee_delete=?,associate_view=?,associate_add=?,associate_edit=?,associate_delete=?,client_view=?,client_add=?,client_edit=?,client_delete=?,cp_view=?,cp_add=?,cp_edit=?,cp_delete=?,user_update=?,date_update=? where akses_id=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}