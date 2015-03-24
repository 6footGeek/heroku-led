var express = require('express');
var router = express.Router();

//return json from the ledlis
router.get('/list', function(req, res) {
	var db = req.db;
	db.collection('led').find().toArray(function (err, items) {
		res.json(items);
	});
});

//add led to db
router.post('/add', function(req, res) {
	var db = req.db;
	db.collection('led').insert(req.body, function(err, result){
		res.send((err === null) ? { msg:''} : {msg: err});
	});
});


/*
 * DELETE.
 */
router.delete('/delete/:id', function(req, res) {
    var db = req.db;
    var userToDelete = req.params.id;
    db.collection('led').removeById(userToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});


module.exports = router;