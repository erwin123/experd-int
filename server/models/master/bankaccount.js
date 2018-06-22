var db = require('../../connection/dbconnection');
db.connect(db.master,(done)=>{});

exports.getAllBankAccount = function (done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('select bank_id,bank_name,swift_code from m_bank_account', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllBankAccountById = function (id, done) {
    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('select bank_id,bank_name,swift_code from m_bank_account where bank_id = ?', id, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertBankAccount = function (BankAccount, done) {
    var values = [ BankAccount.bank_name, BankAccount.swift_code]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('Insert into m_bank_account (bank_name, swift_code) values(?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}

exports.updateBankAccount = function (id, useraccount, done) {
    var values = [BankAccount.klien_code, BankAccount.klien_name, id]

    db.get(db.master, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('update m_bank_account set bank_name=?, swift_code=? where bank_id=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result.insertId)
        })
    })
}