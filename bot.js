const express = require("express");
const path = require("path");
const app = express();

const stream = require("./client/build/script/stream.js");

app.use("/api/discord", require("./api/discord"));

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	const path = require("path");
	app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, "client", "build", "home.html"));
	});

	app.get('/', (req, res) => {
	res.send("id: " + req.query.id);
	});

	var url_handler = function(req, res){
		var url = res;
	}

	app.get("/", url_handler);

	var token = url.searchParams.get("token");

	if (!token) {

		var user_handler = function(req, res){
			var user = res;
		}

		app.get("/api/discord/user", user_handler);

	  	if (!user.id) {

	  		alert(user.id);
	  		stream.load_player();
		}

	}
}

app.listen(process.env.PORT || 8080);

// client.login(process.env.BOT_TOKEN);
