const express = require("express");
const path = require("path");
const app = express();

var https = require("https");

const Discord = require("discord.js");
const client = new Discord.Client();

const bodyParser = require("body-parser");

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	app.use(bodyParser.urlencoded({extended: true}))
	app.use(bodyParser.json());

	app.use("/api/discord", require("./api/discord"));

	const path = require("path");
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "home.html"));
	});
}

app.listen(process.env.PORT || 8080);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (msg.content === "loona.aster") {

  	https.get({
  		host: `stan-loona.herokuapp.com`,
		path: `/api/discord/aster?user_id=${String(msg.author.id)}`
	}, function (res) {
		msg.reply(`You have ${res.amount_aster} aster. Thank you for streaming!`);
	},);

  }
});

client.login(process.env.BOT_TOKEN);
