var db = require('../../connection/dbconnection');
db.connect(db.master,(done)=>{});

exports.getAllArea = function (done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('select area_id,area_code,rowstatus,province,city_kab,city_kabname,kecamatan,kelurahan,postalcode,createdby,createdtime,lastmodifiedby,lastmodifiedtime from m_area', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllProvince = function (done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('select distinct province from m_area', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllKabupaten = function (idprovince, done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('select distinct city_kab,city_kabname from m_area where province = ?', idprovince, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllKecamatan = function (Area, done) {
    var values = [Area.idprovince, Area.citykabname]
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('select distinct kecamatan from m_area where province = ? and city_kabname = ?', values, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllKelurahan = function (Area, done) {
    var values = [Area.idprovince, Area.citykabname, Area.kecamatan]
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('select distinct kelurahan, postalcode from m_area where province = ? and city_kabname = ? and kecamatan = ?', values, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllAreaById = function (id, done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("select area_id,area_code,rowstatus,province,city_kab,city_kabname,kecamatan,kelurahan,postalcode,createdby,createdtime,lastmodifiedby,lastmodifiedtime from m_area where area_id = ? or area_code = ?",  [id,id], function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllAreaByCriteria = function (Area, done) {
    var wh = db.whereCriteriaGenerator(Area);
     
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("select area_id,area_code,rowstatus,province,city_kab,city_kabname,kecamatan,kelurahan,postalcode,createdby,createdtime,lastmodifiedby,lastmodifiedtime from m_area"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertArea = function (Area, done) {
    var values = [Area.area_code,Area.rowstatus,Area.province,Area.city_kab,Area.city_kabname,Area.kecamatan,Area.kelurahan,Area.postalcode,Area.createdby,Area.createdtime]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('Insert into m_area (area_code,rowstatus,province,city_kab,city_kabname,kecamatan,kelurahan,postalcode,createdby,createdtime) values(?,?,?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.updateArea = function (id, Area, done) {
    var values = [Area.rowstatus,Area.province,Area.city_kab,Area.city_kabname,Area.kecamatan,Area.kelurahan,Area.postalcode,Area.lastmodifiedby,Area.lastmodifiedtime,id]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('update m_area set rowstatus=?,province=?,city_kab=?,city_kabname=?,kecamatan=?,kelurahan=?,postalcode=?,lastmodifiedby=?,lastmodifiedtime=? where area_code=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}