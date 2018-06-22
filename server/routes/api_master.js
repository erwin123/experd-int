var client = require('../models/master/client');
var bankaccount = require('../models/master/bankaccount');
var karyawan = require('../models/master/karyawan');
var karyawanAkses = require('../models/master/karyawan_akses');
var division = require('../models/master/divisi');
var assessor = require('../models/master/assessor');
var clientRep = require('../models/master/client_rep');
var location = require('../models/master/lokasi');
var lob = require('../models/master/lob');
var role = require('../models/master/role');
var paket = require('../models/master/paket');
var psikogram = require('../models/master/psikogram');
var area = require('../models/master/area');
var banpt = require('../models/master/banpt');
var express = require('express');
var router = express.Router();

//region client
router.get('/client', function (req, res, next) {
    
    if (req.query.id) {
        client.getAllClientById(req.query.id, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
    else {
        client.getAllClient(function (err, rows) {
            if (err) { res.json(err); }
            else {res.json(rows); 
            }
        });
    }
});

router.post('/client/', function (req, res, next) {
    client.insertClient(req.body, function (err, document_no) {
        if (err) { res.json(err); }
        else { res.json(document_no); }
    });
});

router.put('/client/:id', function (req, res, next) {
    client.updateClient(req.params.id, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/client/:klien_code', function (req, res, next) {
    client.deleteClient(req.params.klien_code, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});


//region bankaccount
router.get('/bankaccount', function (req, res, next) {
    if (req.query.id) {
        bankaccount.getAllBankAccountById(req.query.id, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
    else {
        bankaccount.getAllBankAccount(function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/bankaccount/', function (req, res, next) {
    bankaccount.insertBankAccount(req.body, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(req.body); }
    });
});

router.put('/bankaccount/:id', function (req, res, next) {
    bankaccount.updateBankAccount(req.params.id, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});


//region division
router.get('/division', function (req, res, next) {
    if (req.query.id) {
        division.getAllDivisionById(req.query.id, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
    else {
        division.getAllDivision(function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/division/', function (req, res, next) {
    division.insertDivision(req.body, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(req.body); }
    });
});

router.put('/division/:id', function (req, res, next) {
    division.updateDivision(req.params.id, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

//region karyawan
router.get('/karyawan', function (req, res, next) {
    if (req.query.id) {
        karyawan.getAllKaryawanById(req.query.id, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
    else {
        karyawan.getAllKaryawan(function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/karyawan/getbycriteria/', function (req, res, next) {
    if (req.body) {
        karyawan.getAllKaryawanByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/karyawan/', function (req, res, next) {
    karyawan.insertKaryawan(req.body, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(req.body); }
    });
});

router.put('/karyawan/:id', function (req, res, next) {
    karyawan.updateKaryawan(req.params.id, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});


//region assessor
router.get('/assessor', function (req, res, next) {
    if (req.query.id) {
        assessor.getAllAssessorById(req.query.id, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
    else {
        assessor.getAllAssessor(function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/assessor/', function (req, res, next) {
    assessor.insertAssessor(req.body, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(req.body); }
    });
});

router.put('/assessor/:id', function (req, res, next) {
    assessor.updateAssessor(req.params.id, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

//region karyawanAkses
router.get('/karyawanAkses', function (req, res, next) {
    if (req.query.id) {
        karyawanAkses.getAllKaryawanAksesById(req.query.id, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
    else {
        karyawanAkses.getAllKaryawanAkses(function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/karyawanAkses/', function (req, res, next) {
    karyawanAkses.insertKaryawanAkses(req.body, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(req.body); }
    });
});

router.put('/karyawanAkses/:id', function (req, res, next) {
    karyawanAkses.updateKaryawanAkses(req.params.id, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});


//region clientRep
router.get('/clientRep', function (req, res, next) {
    if (req.query.id) {
        clientRep.getAllClientRepById(req.query.id, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
    else {
        clientRep.getAllClientRep(function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/clientRep/', function (req, res, next) {
    clientRep.insertClientRep(req.body, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(req.body); }
    });
});

router.put('/clientRep/:id', function (req, res, next) {
    clientRep.updateClientRep(req.params.id, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});


//region lob
router.get('/lob', function (req, res, next) {
    if (req.query.id) {
        lob.getAllLobById(req.query.id, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
    else {
        lob.getAllLob(function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/lob/getbycriteria/', function (req, res, next) {
    if (req.body) {
        lob.getAllLobByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/lob/', function (req, res, next) {
    lob.insertlob(req.body, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(req.body); }
    });
});

router.put('/lob/:id', function (req, res, next) {
    lob.updatelob(req.params.id, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});


//region location
router.get('/location', function (req, res, next) {
    if (req.query.id) {
        location.getAllLocationById(req.query.id, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
    else {
        location.getAllLocation(function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/location/', function (req, res, next) {
    location.insertlocation(req.body, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(req.body); }
    });
});

router.put('/location/:id', function (req, res, next) {
    location.updatelocation(req.params.id, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});


//region paket
router.get('/paket', function (req, res, next) {
    if (req.query.id) {
        paket.getAllPaketById(req.query.id, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
    else {
        paket.getAllPaket(function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/paket/', function (req, res, next) {
    paket.insertPaket(req.body, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(req.body); }
    });
});

router.put('/paket/:id', function (req, res, next) {
    paket.updatePaket(req.params.id, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});


//region psikogram
router.get('/psikogram', function (req, res, next) {
    if (req.query.id) {
        psikogram.getAllPsikogramById(req.query.id, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
    else {
        psikogram.getAllPsikogram(function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/psikogram/', function (req, res, next) {
    psikogram.insertPsikogram(req.body, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(req.body); }
    });
});

router.put('/psikogram/:id', function (req, res, next) {
    psikogram.updatePsikogram(req.params.id, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});


//region role
router.get('/role', function (req, res, next) {
    if (req.query.id) {
        role.getAllRoleById(req.query.id, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
    else {
        role.getAllRole(function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/role/', function (req, res, next) {
    role.insertRole(req.body, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(req.body); }
    });
});

router.put('/role/:id', function (req, res, next) {
    role.updateRole(req.params.id, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});


//region area
router.get('/area', function (req, res, next) {
    if (req.query.id) {
        area.getAllAreaById(req.query.id, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
    else {
        area.getAllArea(function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.get('/area/province/', function (req, res, next) {
    area.getAllProvince(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.get('/area/kabupaten/:idprovince', function (req, res, next) {
    if (req.params.idprovince) {
        area.getAllKabupaten(req.params.idprovince, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.get('/area/kecamatan/:idprovince/:citykabname', function (req, res, next) {
    if (req.params.idprovince) {
        area.getAllKecamatan(req.params, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.get('/area/kelurahan/:idprovince/:citykabname/:kecamatan', function (req, res, next) {
    if (req.params.idprovince) {
        area.getAllKelurahan(req.params, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/area/getbycriteria/', function (req, res, next) {
    if (req.body) {
        area.getAllAreaByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/area/', function (req, res, next) {
    area.insertArea(req.body, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(req.body); }
    });
});

router.put('/area/:id', function (req, res, next) {
    area.updateArea(req.params.id, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

//region banpt
router.get('/banpt', function (req, res, next) {
    if (req.query.id) {
        banpt.getAllBanptById(req.query.id, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
    else {
        banpt.getAllBanpt(function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/banpt/getbycriteria/', function (req, res, next) {
    if (req.body) {
        banpt.getAllBanptByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/banpt/', function (req, res, next) {
    banpt.insertBanpt(req.body, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(req.body); }
    });
});

router.put('/banpt/:id', function (req, res, next) {
    banpt.updateBanpt(req.params.id, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});
module.exports = router;