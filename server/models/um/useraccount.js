var db = require('../../connection/dbconnection');
db.connect(db.um,(done)=>{});

exports.getAllUserAccount = function (done) {
    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('Select ID, RowStatus,Username,PasswordHash,LastLoginDate,LastLogoutDate,IsActive,LastChangePasswordDate,CreatedTime,CreatedBy,ModifyTime,ModifyBy,TimeStatus,UniqueNumber,PasswordSalt from useraccount', function (err, rows) {
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllUserAccountByUsername = function (id, done) {
    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('Select ID, RowStatus,Username,PasswordHash,LastLoginDate,LastLogoutDate,IsActive,LastChangePasswordDate,CreatedTime,CreatedBy,ModifyTime,ModifyBy,TimeStatus,UniqueNumber,PasswordSalt from useraccount where Username = ? or id = ?', [id,id], function (err, rows) {
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertUserAccount = function (useraccount, done) {
    var values = [useraccount.Username, useraccount.UniqueNumber, useraccount.TimeStatus, useraccount.RowStatus, useraccount.PasswordSalt,
    useraccount.PasswordHash, useraccount.ModifyTime, useraccount.ModifyBy, useraccount.LastLogoutDate, useraccount.LastLoginDate,
    useraccount.LastChangePasswordDate, useraccount.IsActive, useraccount.ID, new Date().toISOString(), useraccount.CreatedBy]

    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('Insert into useraccount values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', values, function (err, result) {
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

function converterDate(input)
{
    return  new Date(input).toISOString().
    replace(/T/, ' ').      // replace T with a space
    replace(/\..+/, '');
}

exports.updateUserAccount = function (id, useraccount, done) {
    var dateNow = converterDate(new Date());

    var lastLogoutDateNew = converterDate(useraccount.LastLogoutDate);
    var lastLoginDateNew = converterDate(useraccount.LastLoginDate);
    var lastChangePasswordDateNew =  converterDate(useraccount.LastChangePasswordDate)

    var values = [useraccount.Username, useraccount.UniqueNumber, useraccount.RowStatus, useraccount.PasswordSalt,
        useraccount.PasswordHash, dateNow, useraccount.ModifyBy, lastLogoutDateNew, lastLoginDateNew,
        lastChangePasswordDateNew, useraccount.IsActive, id]

    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('update useraccount set Username=?,UniqueNumber=?,RowStatus=?,PasswordSalt=?,PasswordHash=?,ModifyTime=?,ModifyBy=?,LastLogoutDate=?,LastLoginDate=?,LastChangePasswordDate=?,IsActive=? where ID=?', values, function (err, result) {
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.loginUserAccount = function (username, password, done) {
    var values = [username, password];
    db.get(db.um, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_Login(?, ?)',values, function (err, rows) {
            if (err) return done(err)
            done(null, rows)
        })
    })
}