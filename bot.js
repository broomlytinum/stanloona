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

  if (msg.content === "loona.all") {

  	console.log(msg.channel);
  	console.log(msg.channel.id);
  	var channel = client.channels.get(msg.channel.id);
  	console.log(channel);
  	console.log(channel.guild);
  	console.log(channel.guild.id);
  }

  if (msg.content === "loona.me") {

  	https.get({
  		host: `stan-loona.herokuapp.com`,
		path: `/api/discord/aster?user_id=${String(msg.author.id)}`
	}, function (res) {
		res.on("data", function(chunk) {
			var data = JSON.parse(chunk.toString());
			if (data.amount_aster) {
	    		msg.reply(`You have ${data.amount_aster} aster. Thank you for streaming!`);
	    	} else {
	    		msg.reply(`You have 0 aster. Please visit https://stan-loona.herokuapp.com/ and watch the video completely to earn some!`);
	    	}
	  	});
	});
  }
});

client.login(process.env.BOT_TOKEN);
