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

	if (req.body.update) {
		sql_client.query(`UPDATE users SET amount_aster = ${req.body.amount} WHERE user_id = ${req.body.user_id};`, (err, q_res) => {});
	} else {
		sql_client.query(`INSERT INTO users (user_id, amount_aster) VALUES (${req.body.user_id}, ${req.body.amount});`, (err, q_res) => {});
	}

	res.json({success: true})
}));

router.get("/aster", catchAsync(async (req, res) => {
	//console.log(req.query);
	// `SELECT * FROM users WHERE (user_id->${req.body.user_id}) IS NOT NULL;`

	console.log("start");

  	sql_client.query(`SELECT * FROM users;`, (err, q_res) => {
  		//console.log(res);
  		if (q_res) {
  			var found = false;
			for (let row of q_res.rows) {
				console.log(row.user_id);
				console.log(req.query.user_id);
				if (row.user_id == req.query.user_id) {
					console.log(row.amount_aster);
					found = true;
					res.json({amount_aster: row.amount_aster, success: true});
					break;
				}
		    	//console.log(JSON.stringify(row));
		  	}
		  	if (!found) {
		  		res.json({success: true});
		  	}
		}
	});

	console.log("end");

	// res.json(JSON.stringify({amount_aster: value, success: true}))
}));

module.exports = router;