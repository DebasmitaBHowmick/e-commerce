const express = require('express');
const jsonServer = require("json-server");
const cors = require("cors");
const auth = require("json-server-auth");

const server = express();

// Enable CORS
server.use(cors());
server.use(express.json());

// JSON Server router
const router = jsonServer.router("./data/db.json");

// ⚠️ Bind the db to the app for json-server-auth
server.db = router.db;

// Auth rules
const rules = auth.rewriter({
  products: 444,
  featured_products: 444,
  orders: 660,
  users: 600
});

// Apply auth & rules
server.use(rules);
server.use(auth);

// Default middlewares
server.use(jsonServer.defaults());

// Mount router
server.use("/api", router);

// Start server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Backend running successfully on port ${PORT}`);
});
