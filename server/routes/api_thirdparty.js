var express = require('express');
var async = require('async');
var router = express.Router();
var useraf = require('../models/master/user_af');

var request = require('request');
var CryptoJS = require("crypto-js");

var secretKey = 'nfpaQ0uwFDxY6bSR+PWpZNygSahlA5eV8PG5h4+bJtY=';
var publicKey = '1efPhrM6HFtQNpGo/Hi01KO07CSwkLnqrbqhzTFMkXQ=';

function signature(method, uri) {
    return method + ":" + uri + ":1";
}

function getAuthString(url, method) {
    var indexApi = url.indexOf("api");
    var uri = url.substring(indexApi - 1, url.length);
    var stringSign = signature(method, uri);
    var ciphertext = CryptoJS.HmacSHA1(stringSign, secretKey);
    var output = ciphertext.toString(CryptoJS.enc.Hex);
    var wordArray = CryptoJS.enc.Utf8.parse(output);
    var base64 = CryptoJS.enc.Base64.stringify(wordArray);
    var authString = 'AF ' + publicKey + ':' + base64;
    return authString;
}

function portingUserPage(method, page) {
    var url = 'https://app.assessfirst.com/api/user';
    var authString = getAuthString(url, method);
    var options = {
        url: url,
        headers: {
            'Accept': 'application/json',
            'Authorization': authString,
            'X-Af-Timestamp': '1'
        },
        qs: {
            'page': page
        }
    };
    var data;
    async.series([
        function (callback) {
            request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    data = JSON.parse(body);
                    callback(null, data);
                }
                else {
                    callback(error, data);
                }
            });
        }
    ], function (err, results) {
        if (err) { console.log(err); res.send(500, "Server Error"); return; }
        console.log("data on page " + page);
        if (results[0])
            Object.entries(results[0]._embedded.items).forEach(
                ([key, value]) => {
                    useraf.insertUserAf(value, function (err, count) {
                        if (err) { console.log("error on batch page " + page); }
                        else { }
                    });
                }
            );
    });
}

function portingSynthesis(method, userid_af) {
    var url = 'https://app.assessfirst.com/api/userprofile/synthesis/' + userid_af;

    var authString = getAuthString(url, method);
    var options = {
        url: url,
        headers: {
            'Accept': 'application/json',
            'Authorization': authString,
            'X-Af-Timestamp': '1'
        }
    };
    var data;
    async.series([
        function (callback) {
            request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    data = JSON.parse(body);
                    callback(null, data);
                }
                else {
                    callback(error, data);
                }
            });
        }
    ], function (err, results) {
        if (err) { console.log(err); return; }
        if (results[0]) {
            var objQuestionnaires = results[0]._embedded.questionnaires;
            objQuestionnaires.forEach(qs => {
                var values = ["", qs.label, results[0].id, "", ""];
                useraf.insertTestType(values, function (done, resultaf) {
                    insertTestType(qs.label, qs.data, results[0].id);
                });
            })
        }
    });
}

function insertTestType(parenttitle, obj, userid) {
    var recurense;
    try {
        recurense = Object.values(obj);
    }
    catch (err) {
        console.log(obj);
        console.log("error 1 " + recurense);
    }

    if (typeof recurense !== 'undefined' && recurense.length > 0) {
        recurense = Object.values(obj);
        recurense.forEach(qs => {
            try {
                var objEach = Object.values(qs);
                var desc = objEach[0].description ? objEach[0].description[0] : "";
                var values = [parenttitle, objEach[0].title, userid, objEach[0].value, desc];
                if (objEach[0].title) {
                    useraf.insertTestType(values, function (done, results) {
                        insertTestType(objEach[0].title, objEach[0].data, userid);
                    });
                }
            }
            catch (err) {
                console.log("error 2 ");
                console.log(objEach[0]);
                console.log(objEach[0].description);
            }
        });
    }

    if (typeof recurense !== 'undefined') {
        try {
            if (recurense[0].hasOwnProperty("title")) {
                var desc = recurense[0].description ? recurense[0].description[0] : "";
                var values = [parenttitle, recurense[0].title, userid, recurense[0].value, desc];
                if (recurense[0].title) {
                    useraf.insertTestType(values, function (done, results) {
                        insertTestType(recurense[0].title, recurense[0].data, userid);
                    });
                }
            }
        } catch (err) { }
    }
    // else if (recurense.title) {

    //     var values = ["", obj.title, userid, obj.value];
    //     useraf.insertTestType(values, function (done, results) {
    //         insertTestType(obj.data, userid);
    //     });
    // }
    // if (obj.length) {
    //     obj.forEach(qs => {
    //         console.log("test "+qs.title);
    //         var values = ["", qs.title, userid, qs.value];
    //         useraf.insertTestType(values, function (done, results) {
    //             insertTestType(qs.data, userid);
    //         });
    //     });
    // }
}

router.get('/assessfirst', function (req, res, next) {
    var url = 'https://app.assessfirst.com/api/' + req.query.object;
    var method = req.method;
    var authString = getAuthString(url, method);
    var options;
    if (!req.query.qs) {
        options = {
            url: url,
            headers: {
                'Accept': 'application/json',
                'Authorization': authString,
                'X-Af-Timestamp': '1'
            }
        };
    }
    else {
        var params = req.query.qs.toString().split("$");
        var qs = {};
        qs[params[0]] = params[1];
        options = {
            url: url,
            headers: {
                'Accept': 'application/json',
                'Authorization': authString,
                'X-Af-Timestamp': '1'
            },
            qs: qs
        };
    }
    var data;
    async.series([
        function (callback) {
            request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    data = JSON.parse(body);
                    callback(null, data);
                }
                else {
                    callback(error, data);
                }
            });
        }
    ], function (err, results) {
        if (err) { console.log(err); res.send(500, "Server Error"); return; }
        res.send(results[0]);
    });
});

router.get('/assessfirst/useraf', function (req, res, next) {
    useraf.getAllUserAf(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.get('/assessfirst/portinguser', function (req, res, next) {
    var url = 'https://app.assessfirst.com/api/user';
    var method = req.method;
    var authString = getAuthString(url, method);
    var options = {
        url: url,
        headers: {
            'Accept': 'application/json',
            'Authorization': authString,
            'X-Af-Timestamp': '1'
        }
    };
    var data;
    var page_count = 0;
    var page = 0;

    async.series([
        function (callback) {
            request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    data = JSON.parse(body);
                    callback(null, data);
                }
                else {
                    callback(error, data);
                }
            });
        }
    ], function (err, results) {
        if (err) { console.log(err); res.send(500, "Server Error"); return; }

        page_count = results[0].page_count;
        //for next page iteration
        var count = 0;
        async.whilst(
            function () { return count < page_count; },
            function (callback) {
                setTimeout(() => {
                    count++;
                    portingUserPage('GET', count);
                    callback(null, count);
                }, 5000);
            },
            function (err, resultz) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end("done");
            }
        );

    });
});

router.get('/assessfirst/portingsynthesis', function (req, res, next) {
    var url = 'https://app.assessfirst.com/api/userprofile/synthesis/';
    req.setTimeout(0);
    var authString = getAuthString(url, 'GET');
    var options = {
        url: url,
        headers: {
            'Accept': 'application/json',
            'Authorization': authString,
            'X-Af-Timestamp': '1'
        }
    };
    var arrayUseraf;
    async.series([
        function (callback) {
            useraf.getAllUserAf(function (err, rows) {
                if (err) { res.json(err); }
                else { callback(err, rows) }
            });
        },
    ], function (err, results) {
        if (err) { console.log(err); res.send(500, "Server Error"); return; }
        var count = 0;
        var synthesis;
        async.whilst(
            function () { return count < results[0].length; },
            function (callback) {
                setTimeout(() => {
                    console.log("processing " + results[0][count].email);
                    synthesis = portingSynthesis('GET', results[0][count].id_af);
                    count++;
                    callback(null, synthesis);
                }, 2000);
            },
            function (err, resultz) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end("done");
            }
        );
    });
});


router.get('/assessfirst/synthesis', function (req, res, next) {
    var url = 'https://app.assessfirst.com/api/userprofile/synthesis/' + req.query.userid;
    var method = req.method;
    var authString = getAuthString(url, method);
    var options;
    options = {
        url: url,
        headers: {
            'Accept': 'application/json',
            'Authorization': authString,
            'X-Af-Timestamp': '1'
        }
    };
    var data;
    async.series([
        function (callback) {
            request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    data = JSON.parse(body);
                    callback(null, data);
                }
                else {
                    callback(error, data);
                }
            });
        }
    ], function (err, results) {
        if (err) { console.log(err); res.send(500, "Server Error"); return; }
        res.send(results[0]);
    });
});


module.exports = router;

