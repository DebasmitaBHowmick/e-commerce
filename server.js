const express = require('express');
const jsonServer = require("json-server");
const cors = require("cors");
const auth = require("json-server-auth");

const server = express();

// // Enable CORS
// server.use(cors());
// server.use(express.json());

// JSON Server router
const router = jsonServer.router("./data/db.json");
// Allow CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

//  Bind the db to the app for json-server-auth
server.db = router.db;

// Auth rules
const rules = auth.rewriter({
  products: 444,
  featured_products: 444,
  orders: 660,
  users: 600
});

server.use(jsonServer.defaults());
server.use(rules);
server.use(auth);
server.use("/", router);
server.use(express.json());

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Backend running on port http://localhost:${PORT}`);
});