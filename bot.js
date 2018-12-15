const express = require("express");
const path = require("path");
const app = express();

const stream = require("client/build/script/stream.js");

app.use("/api/discord", require("./api/discord"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "home.html"));
  });
}

var url = window.location.href;
var token = url.searchParams.get("token");

if (!token) {

	app.get("/api/discord/user", user_handler);

	var user_handler = function(req, res){
		var user = res;
	}

  	if (!user.id) {

  		alert(user.id);
  		stream.load_player();
	}

}

app.listen(process.env.PORT || 8080);

// client.login(process.env.BOT_TOKEN);
