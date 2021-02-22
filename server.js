"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "ap-northeast-2" });
// Create EC2 service object
var ec2 = new AWS.EC2({ apiVersion: "2016-11-15" });
var params = {
    DryRun: false
};
var describeEc2Instances = function (params) {
    return new Promise(function (resolve, reject) {
        ec2.describeInstances(params, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};
app.get("/instance_status", function (req, res) {
    describeEc2Instances(params)
        .then(function (result) {
        res.json(result);
    })["catch"](function (err) {
        res.json(err);
    });
});
app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});
