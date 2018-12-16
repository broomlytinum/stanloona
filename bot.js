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

  	var channel = client.channels.get(msg.channel.id);
  	var server = channel.guild;

  	var members = [];
  	server.members.forEach(member => {
  		if (!member.user.bot) {
  			members.push(member);
  		}
  	});

  	function do_request(i) {
  		https.get({
	  		host: `stan-loona.herokuapp.com`,
			path: `/api/discord/aster?user_id=${String(member_id)}`
		}, function (res) {
			res.on("data", function(chunk) {
				var data = JSON.parse(chunk.toString());
				if (data.amount_aster) {
		    		asters.push({user_name: members[i].user.username, amount: data.amount_aster});
		    	} else {
		    		asters.push({user_name: members[i].user.username, amount: 0});
		    	}

		    	if (asters.length == members.length) {
		    		var display = `The aster counts of this server's members:\n\n`;
				  	for (var j = 0; j < asters.length; j++) {
				  		display += `- ${asters[j].user_name}:\t${asters[j].amount}\n`;
				  	}

				  	channel.send(display);
		    	}
		  	});
		});
  	}

  	var asters = [];
  	for (var i = 0; i < members.length; i++) {

  		var member_id = members[i].user.id;
  		var member_name = members[i].user.username;

  		console.log(member_name);

  		do_request(i);
  	}
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
