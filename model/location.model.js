/**
 * Created by lenovo on 01-06-2016.
 */
var mongoose = require('mongoose');
var config = require('../config.json');
var Q = require('q');

mongoose.connect(config.dbUrl);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("---------------- Mongo connected ------------------------");
});

var model = mongoose.model('locations', {
    locationId: String,
    displayName: String,
    countryId: String,
    countryName: String
});


var services = {};

services.getLocation = getLocation;
services.putLocation = putLocation;


module.exports = services;

function putLocation(data) {
    var deferred = Q.defer();

    for (x in data) {
        var record = new model(data[x]);
        record.save(function (err) {
            if (err) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
        });
    }


    return deferred.promise;
}

function getLocation(data) {
    var deferred = Q.defer();

    model.find({location: data}, function (err, data) {

    });

    return deferred.promise;
}

