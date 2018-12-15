const Discord = require("discord.js");
var DiscordStrategy = require("passport-discord").Strategy;
const client = new Discord.Client();

const express = require("express");
const path = require("path");
const app = express();

client.on("ready", () => {
    console.log("[*] Connected");
});

client.on("message", message => {
    if (message.content === "ping") {
       message.reply("pong");
    }
});

app.listen(process.env.PORT || 8080);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "home.html"));
  });
}

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, cb) {
    if (err)
        return done(err);
 
    User.findOrCreate({ discordId: profile.id }, function(err, user) {
    	alert(user.id);
        return cb(err, user);
    });
}));

// client.login(process.env.BOT_TOKEN);
