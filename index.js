const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/prod")(app);

// PORT
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listing on port ${port}`));
