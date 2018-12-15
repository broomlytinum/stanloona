const Discord = require("discord.js");
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
client.login(process.env.BOT_TOKEN);
