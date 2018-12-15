const express = require("express");
const path = require("path");
const app = express();

app.listen(process.env.PORT || 8080);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "home.html"));
  });
}

app.use("/api/discord", require("./api/discord.js"));

// client.login(process.env.BOT_TOKEN);
