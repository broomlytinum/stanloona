const Discord = require("discord.js");
const client = new Discord.Client();

const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const btoa = require("btoa");
const { catchAsync } = require("../client/build/script/utils.js");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const redirect = encodeURIComponent("https://stan-loona.herokuapp.com/api/discord/callback");

const { Client } = require("pg");

const sql_client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

sql_client.connect();

router.get("/login", (req, res) => {
  res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`);
});

router.get("/callback", catchAsync(async (req, res) => {
  if (!req.query.code) throw new Error("NoCodeProvided");
  const code = req.query.code;
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${creds}`,
      },
    });
  const json = await response.json();

  const user_response = await fetch(`https://discordapp.com/api/users/@me`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${json.access_token}`,
      },
    });
  const user = await user_response.json();

  res.redirect(`/?user_id=${user.id}`);
}));

router.post("/aster", catchAsync(async (req, res) => {
	console.log(req.body);
  	sql_client.query(`INSERT INTO aster_bank (user_id, amount) VALUES (${req.body.user_id}, ${req.body.amount}) ON CONFLICT (user_id) DO UPDATE SET amount = excluded.amount;`, (err, res) => {
		if (err) throw err;
	});
}));

router.get("/aster", catchAsync(async (req, res) => {
  sql_client.query(`SELECT * FROM aster_bank ORDER BY user_id;`, (err, res) => {
	  for (let row of res.rows) {
	    console.log(JSON.stringify(row));
	  }
	});
}));

module.exports = router;