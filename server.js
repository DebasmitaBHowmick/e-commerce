const express = require('express');
const jsonServer = require("json-server");
const cors = require("cors");
const auth = require("json-server-auth");

const server = express();
const router = jsonServer.router("./data/db.json");
const middlewares = jsonServer.defaults();

// Enable CORS properly
server.use(cors());
server.use(middlewares);

// Set up auth rules BEFORE router
const rules = auth.rewriter({
  products: 444,
  featured_products: 444,
  orders: 600,
  users: 600,
});

server.use(rules);
server.use(auth);

// Use only one router mount (no duplication)
server.use("/api", router);

// Start server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`✅ Backend running successfully on port ${PORT}`);
});
