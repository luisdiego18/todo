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

require("./startup/routes")(app);
require("./startup/db")();

// PORT
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listing on port ${port}`));
