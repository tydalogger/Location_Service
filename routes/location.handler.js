/**
 * Created by lenovo on 01-06-2016.
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config.json');

var locationModel = require('../model/location.model');

router.get('/:id', function (req, res, next) {
    locationModel.getLocation(req.params.id).then(function (data) {
        res.send(data);
    });
});

module.exports = router;