var useraccount = require('../models/um/useraccount');
var express = require('express');
var router = express.Router();

//region useraccount
router.get('/useraccount/:id?', function (req, res, next) {
    if (req.params.id) {
        useraccount.getAllUserAccountByUsername(req.params.id, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
    else {
        useraccount.getAllUserAccount(function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/useraccount/', function (req, res, next) {
    useraccount.addUserAccount(req.body, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(req.body); }
    });
});

router.delete('/useraccount/:id', function (req, res, next) {
    useraccount.deleteUserAccount(req.params.id, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(count); }
    });
});

router.put('/useraccount/:id', function (req, res, next) {
    useraccount.updateUserAccount(req.params.id, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

//region login
router.post('/useraccount/login', function (req, res, next) {
    setTimeout(() => {
        if (req.body) {
            useraccount.loginUserAccount(req.body.username, req.body.password, function (err, rows, fields) {
                if (err) { res.json(err); }
                else {
                    if (rows[0][0]) {
                        if (req.body.rememberme) {
                            var sess = req.session;
                            if (sess.experdaccount === undefined) {
                                sess.experdaccount = req.body.username + ":" + req.body.password;
                                console.log('session created', sess);
                            }
                        }
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify(rows[0]));
                    }
                    else {
                        res.status(401);
                        res.send('Sorry, access not passed');
                    }
                }

            });
        }
    }, 1);
});

router.post('/useraccount/loginbysession', function (req, res, next) {
    setTimeout(() => {
        var sess = req.session;
        if (sess.experdaccount === undefined) {
            res.status(401);
            res.send('Sorry, access not passed');
        }
        else {
            let credential = sess.experdaccount.toString().split(":");
            useraccount.loginUserAccount(credential[0], credential[1], function (err, rows, fields) {
                if (err) { res.json(err); }
                else {
                    if (rows[0][0]) {

                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify(rows[0]));
                    }
                    else {
                        res.status(401);
                        res.send('Sorry, access not passed');
                    }
                }

            });
        }
    }, 1);
});

router.post('/useraccount/logout', function (req, res, next) {
    setTimeout(() => {
        var sess = req.session;
        if (sess.experdaccount === undefined) {
            res.status(500);
            res.send('Log out error');
        }
        else {
            req.session.destroy(function(err) {
                if(err)
                {
                    res.status(500);
                    res.send('Log out error');
                }
                res.status(200);
                res.send('1');
            });
        }
    }, 1);
});

module.exports = router;