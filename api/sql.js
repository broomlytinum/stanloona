const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const btoa = require("btoa");
const { catchAsync } = require("../client/build/script/utils.js");
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

router.post("/aster", catchAsync(async (req, res) => {
  if (!req.query.code) throw new Error("NoCodeProvided");

  client.query(`INSERT INTO aster_bank (user_id, amount) VALUES (${req.body.user_id}, ${req.body.amount}) ON CONFLICT (user_id) DO UPDATE SET amount = excluded.amount;`, (err, res) => {
	  if (err) throw err;
	});
}));

router.get("/aster", catchAsync(async (req, res) => {
  if (!req.query.code) throw new Error("NoCodeProvided");

  client.query(`SELECT * FROM aster_bank ORDER BY user_id;`, (err, res) => {
	  for (let row of res.rows) {
	    console.log(JSON.stringify(row));
	  }
	});
}));