const express = require("express");
const path = require("path");
const app = express();

const stream = require("./client/build/script/stream.js");

app.get('/', (req, res) => {
	res.send("id: " + req.query.id);
});

var url_handler = function(req, res){

	var url = res;
	var token = url.searchParams.get("token");

	if (!token) {

		var user_handler = function(req, res){
			var user = res;

			if (!user.id) {

		  		alert(user.id);
		  		stream.load_player();
		  	}
		}

		app.get("/api/discord/user", user_handler);
	}
}

app.get("/", url_handler);