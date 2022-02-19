"use strict";

// Variables
var apiKey = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
var baseUrl = "https://XXX.XXX";

// Libraries
const request = require("request").defaults({ json: true, headers: { "X-API-Key": apiKey } });

/* 
	data - Either (account username, account userid, random string)
	timestamp - Unix timestamp
*/

function signRequest(data, timestamp) {
    request({ url: baseUrl + "/sign", qs: { data: data, timestamp: timestamp } }, function(error, response, body) {
        if (error)
            return console.log(error);

        if (response.statusCode == 200)
            console.log("Successfully signed request -->", body);
        else
            console.log(`Failed to sign request ${response.statusCode}`);
    });
}

/* 
    Returns

    Headers - Object
    Signature - String
*/

signRequest("killed", Date.now());