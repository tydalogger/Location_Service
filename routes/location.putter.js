/**
 * Created by lenovo on 06-06-2016.
 */
var jsonfile = require('jsonfile');

var location_model = require("../model/location.model");

var cityJSON = {};
var conuntryJSON = [];

cityJSON = jsonfile.readFileSync("../public/data/freeformatter-out.json");


conuntryJSON = jsonfile.readFileSync("../public/data/countries.json");

format(cityJSON, conuntryJSON);

function format(city, country) {
    var finalArr = [];
    var i = 1;


    var temp = Object.keys(city);

    for (x in temp) {
        function findCherries(fruit) {
            return fruit.name === temp[x];
        }

        if (country.find(findCherries) == undefined) {
            continue;
        }
        var countryId = country.find(findCherries)["alpha3Code"];
        var countryName = temp[x];

        for (y in cityJSON[temp[x]]) {
            var displayName = cityJSON[temp[x]][y];
            var locationId = displayName.slice(0, 3).toUpperCase();

            var finalJson = {
                locationId: locationId,
                displayName: displayName,
                countryId: countryId,
                locationService: countryName
            };
            finalArr.push(finalJson);
        }
    }
    console.log(finalArr)

    putDB(finalArr);

}

function putDB(arr) {
    location_model.putLocation(arr).then(function () {
        console.log("Done");
    })
}