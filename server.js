const loadEnv = require("./env");
const env = loadEnv();
const express = require("express");
const app = express();
const cors = require("cors");
const uiRoutes = require("./routes/index.js");
const path = require("path");
const cookieParser = require("cookie-parser");
const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer(app); // Create an HTTP server
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});
// Configure CORS for your Socket.io server
io;
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//cookieParser middleware
app.use(cookieParser());

// enable cors
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
  }),
);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

app.use("/api/v3", require("./routes/api.js"));
app.use("", uiRoutes);
require("./controllers/socket.controller.js")(io);
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.json({ status: "error occured" });
});

server.listen(env.SERVER_PORT, () =>
  console.log(`server running on port ${env.SERVER_PORT}`),
);
