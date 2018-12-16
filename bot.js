const express = require("express");
const path = require("path");
const app = express();

app.use("/api/discord", require("./api/discord"));
app.use("/api/sql", require("./api/sql"));

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	const path = require("path");
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "home.html"));
	});
}

app.listen(process.env.PORT || 8080);

// client.login(process.env.BOT_TOKEN);
