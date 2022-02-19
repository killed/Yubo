"use strict";

// Libraries
const request = require("request").defaults({ json: true });
const { createReadStream } = require("fs");

// Variables
var apiKey = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
var baseUrl = "https://xxx.xxx";

/* 
    data - Either (account username, account userid, random string)
    timestamp - Unix timestamp
*/

var timestamp = Date.now();
var uid = "yupyupyupbrrr"; // This can be whatever

function signRequest(data, timestamp, callback) {
    request({ url: baseUrl + "/sign", headers: { "X-API-Key": apiKey }, qs: { data: data, timestamp: timestamp } }, function(error, response, body) {
        if (error)
            return callback(false);

        if (response.statusCode == 200)
            callback(body);
        else
            callback(false);
    });
}

signRequest(uid, timestamp, function(signedData) {
    if (!signedData)
        return console.log("Failed to sign request");

    signedData["Headers"]["Content-Type"] = "multipart/form-data";

    request.post({
        url: "https://media.yellw.co/media",
        headers: signedData["Headers"],
        formData: {
            "file": createReadStream("./data/1.png"),
            "source": "profile",
            "uid": uid,
            "nonce": timestamp,
            "signature": signedData["Signature"].trim()
        }
    }, function(error, response, body) {
        if (error)
            return console.log(error);

        console.log(body);
    });
});